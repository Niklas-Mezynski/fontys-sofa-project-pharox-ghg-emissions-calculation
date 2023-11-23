import { HttpStatusCode } from "axios";
import {
  ConsumedFuelTransportDetails,
  FreightEmissionCalculationInput,
  TransportActivityReport,
} from "../../models/emission_calculations/emission_calculation_model";
import { fuelEmissionFactorSchema } from "../../models/emission_factors/fuel_emission_factors";
import {
  ACTIVITY_BASE_UNIT,
  CO2E_WEIGHT_UNIT,
  baseEmissionReportFactory,
} from "../../utils/calculation_report";
import { EmissionFactorUtils } from "../../utils/emission_factor_utils";
import { CustomError } from "../../utils/errors";
import { validateInput } from "../../utils/functions";
import { FuelEmissionFactorService } from "../emission_factors/fuel_emission_factor_service";
import { classifyUnitType } from "../units/unit_classification_service";
import { UnitConversionService } from "../units/unit_conversion_service";

/**
 * Calculates the emission in case the fuel consumption is provided. Requires primary data and knowledge of the fuel consumption.
 * @returns The report part for the transport activity.
 */
export async function handleCalculationWithGivenFuelConsumption(
  transportPart: FreightEmissionCalculationInput["transportParts"][number],
  transportDetails: ConsumedFuelTransportDetails
): Promise<TransportActivityReport> {
  const emissionFactor =
    await FuelEmissionFactorService.getFuelEmissionFactorByFuelCodeAndRegion(
      transportDetails.fuelCode,
      transportPart.region
    );

  const validatedEmissionFactor = validateInput(
    emissionFactor,
    fuelEmissionFactorSchema,
    "Received unexpected Fuel Emission Factor format from the database."
  );

  // --- Unit conversion ---
  const providedUnitType = classifyUnitType(transportDetails.consumedFuel.unit);

  const mappedEmissionFactor = EmissionFactorUtils.mapEmissionFactorWithUnits(
    validatedEmissionFactor
  );

  // Get the factor with the same unit type as the provided unit type
  const factorToUse = mappedEmissionFactor.factors.find(
    (factor) => classifyUnitType(factor.unit.perUnit) === providedUnitType
  );

  if (!factorToUse) {
    throw new CustomError({
      status: HttpStatusCode.BadRequest,
      message: `No emission factor found for unit type ${providedUnitType}`,
    });
  }

  // Convert the consumed fuel to the unit type of the emission factor
  const convertedConsumedFuel = UnitConversionService.convertUnits(
    transportDetails.consumedFuel.unit,
    factorToUse.unit.perUnit,
    transportDetails.consumedFuel.value
  );

  if (factorToUse.unit.producedUnit !== CO2E_WEIGHT_UNIT) {
    factorToUse.ttw = UnitConversionService.convertUnits(
      factorToUse.unit.producedUnit,
      CO2E_WEIGHT_UNIT,
      factorToUse.ttw ?? 0
    ).value;
    factorToUse.wtt = UnitConversionService.convertUnits(
      factorToUse.unit.producedUnit,
      CO2E_WEIGHT_UNIT,
      factorToUse.wtt ?? 0
    ).value;
    factorToUse.wtw = UnitConversionService.convertUnits(
      factorToUse.unit.producedUnit,
      CO2E_WEIGHT_UNIT,
      factorToUse.wtw ?? 0
    ).value;
    factorToUse.unit.producedUnit = CO2E_WEIGHT_UNIT;
  }

  // --- Emission calculation ---
  // Calculate the emission
  const producedEmissions = {
    tankToWheel: factorToUse.ttw
      ? convertedConsumedFuel.value * factorToUse.ttw
      : 0,
    wellToTank: factorToUse.wtt
      ? convertedConsumedFuel.value * factorToUse.wtt
      : 0,
    wellToWheel: factorToUse.wtw
      ? convertedConsumedFuel.value * factorToUse.wtw
      : 0,
  };

  // --- Emission intensity calculation ---
  // Calculate the tonne-kilometres (tkm) of the transport activity
  const km = UnitConversionService.convertUnits(
    transportPart.distance.unit,
    ACTIVITY_BASE_UNIT.DISTANCE,
    transportPart.distance.value
  ).value;
  const tonnes = UnitConversionService.convertUnits(
    transportPart.weight.unit,
    ACTIVITY_BASE_UNIT.WEIGHT,
    transportPart.weight.value
  ).value;

  const tkm = tonnes * km;
  const emissionIntensity = producedEmissions.wellToWheel / tkm;

  return {
    input: transportPart,
    emissionFactor: mappedEmissionFactor,
    mode: "UNKNOWN - Primary data provided",
    emissions: baseEmissionReportFactory({
      co2e:
        producedEmissions.wellToWheel ??
        // TODO: Is it the correct fallback to add the wellToTank and tankToWheel emissions in case the wellToWheel is not provided?
        producedEmissions.wellToTank + producedEmissions.tankToWheel,
      intensity: emissionIntensity,
      activity: tkm,
      distance: km,
      wtt: {
        co2e: producedEmissions.wellToTank,
        intensity: producedEmissions.wellToTank / tkm,
      },
      ttw: {
        co2e: producedEmissions.tankToWheel,
        intensity: producedEmissions.tankToWheel / tkm,
      },
    }),
  };
}

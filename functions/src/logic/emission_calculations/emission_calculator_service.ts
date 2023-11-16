import {
  CalculationReport,
  FreightEmissionCalculationInput,
  freightEmissionCalculationInputSchema,
} from "../../models/emission_calculations/emission_calculation_model";
import { classifyUnitType } from "../units/unit_classification_service";
import { CustomError } from "../../utils/errors";
import { EmissionFactorService } from "../emission_factors/emission_factor_service";
import { FuelEmissionFactorService } from "../emission_factors/fuel_emission_factor_service";
import { HttpStatusCode } from "axios";
import { validateInput } from "../../utils/functions";
import { UnitConversionService } from "../units/unit_conversion_service";

/**
 * Calculates the emission based on the provided fuel and emission factor.
 * @param inputData the input object.
 * @return The response object.
 */
async function performEmissionCalculation(
  inputData: FreightEmissionCalculationInput | unknown
) {
  // Validate calculation input
  const calculationInput = validateInput(
    inputData,
    freightEmissionCalculationInputSchema
  );

  const calculationReport: CalculationReport = {
    transportActivities: [],
    metadata: calculationInput.metadata ?? undefined,
  };

  await Promise.all(
    calculationInput.transportParts.map(async (transportPart, index) => {
      try {
        // Get the emission factor
        const {
          producedEmissions,
          factorUsed,
          mappedEmissionFactor,
          emissionIntensity,
        } = await calculateTransportActivity(transportPart);

        // Add the emission to the report
        calculationReport.transportActivities[index] = {
          producedEmissions,
          emissionIntensity,
          unit: `${factorUsed.producedUnit} / ${factorUsed.perUnit}`,
          usedEmissionFactor: {
            ...mappedEmissionFactor,
            factors: factorUsed,
          },
        };
      } catch (error) {
        throw new CustomError({
          status: HttpStatusCode.BadRequest,
          message: `Error while calculating emission for transport part ${index}`,
          details: error,
        });
      }
    })
  );
  calculationReport.totalEmissions = -1; // TODO: Calculate total emissions
  return calculationReport;
}

async function calculateTransportActivity(
  transportPart: FreightEmissionCalculationInput["transportParts"][number]
) {
  const emissionFactor = await getEmissionFactor(transportPart);

  // --- Unit conversion ---
  const providedUnitType = classifyUnitType(
    transportPart.transportDetails.consumedFuel.unit
  );

  const mappedEmissionFactor =
    EmissionFactorService.mapEmissionFactorWithUnits(emissionFactor);

  // Get the factor with the same unit type as the provided unit type
  const factorToUse = mappedEmissionFactor.factors.find(
    (factor) => classifyUnitType(factor.perUnit) === providedUnitType
  );

  if (!factorToUse) {
    throw new CustomError({
      status: HttpStatusCode.BadRequest,
      message: `No emission factor found for unit type ${providedUnitType}`,
    });
  }

  // Convert the consumed fuel to the unit type of the emission factor
  const convertedConsumedFuel = UnitConversionService.convertUnits(
    transportPart.transportDetails.consumedFuel.unit,
    factorToUse.perUnit,
    transportPart.transportDetails.consumedFuel.value
  );

  // --- Emission calculation ---
  // Calculate the emission
  const producedEmissions = {
    tankToWheel: factorToUse.factor.ttw
      ? convertedConsumedFuel.value * factorToUse.factor.ttw
      : null,
    wellToTank: factorToUse.factor.wtt
      ? convertedConsumedFuel.value * factorToUse.factor.wtt
      : null,
    wellToWheel: factorToUse.factor.wtw
      ? convertedConsumedFuel.value * factorToUse.factor.wtw
      : null,
  };

  // --- Emission intensity calculation ---
  // Calculate the tonne-kilometres (tkm) of the transport activity
  const km = UnitConversionService.convertUnits(
    transportPart.distance.unit,
    "km",
    transportPart.distance.value
  ).value;
  const tonnes = UnitConversionService.convertUnits(
    transportPart.weight.unit,
    "tonnes",
    transportPart.weight.value
  ).value;

  const tkm = tonnes * km;
  const emissionIntensity = (producedEmissions.wellToWheel ?? 0) / tkm;

  return {
    producedEmissions,
    factorUsed: factorToUse,
    mappedEmissionFactor,
    emissionIntensity: {
      tkm,
      value: emissionIntensity,
      unit: "kgCO2e/tkm",
    },
  };
}

/**
 * Gets the emission factor based on the provided emission details.
 * This function has to take care of the different types of user input it may receive
 * @async
 * @param unitType The type of unit. E.g. VolumeUnit, MassUnit, LengthUnit
 * @param emissionDetails The emission details. E.g. activityId, activityType, vehicleType, fuelType.
 * @returns The emission factor if available.
 */
async function getEmissionFactor(
  transportPart: FreightEmissionCalculationInput["transportParts"][number]
) {
  return FuelEmissionFactorService.getFuelEmissionFactorByFuelCodeAndRegion(
    transportPart.transportDetails.fuelCode,
    transportPart.region
  );
}

export const EmissionCalculatorService = {
  performEmissionCalculation,
};

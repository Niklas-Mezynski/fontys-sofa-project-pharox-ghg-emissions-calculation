import {
  CalculationReport,
  ConsumedFuelTransportDetails,
  FreightEmissionCalculationInput,
  freightEmissionCalculationInputSchema,
} from "../../models/emission_calculations/emission_calculation_model";
import { classifyUnitType } from "../units/unit_classification_service";
import { CustomError } from "../../utils/errors";
import { exhaustiveMatchingGuard, validateInput } from "../../utils/functions";
import { EmissionFactorService } from "../emission_factors/emission_factor_service";
import { FuelEmissionFactorService } from "../emission_factors/fuel_emission_factor_service";
import { HttpStatusCode } from "axios";
import { UnitConversionService } from "../units/unit_conversion_service";
import { fuelEmissionFactorSchema } from "../../models/emission_factors/fuel_emission_factors";

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
  if ("modeOfTransport" in transportPart.transportDetails) {
    switch (transportPart.transportDetails.modeOfTransport) {
      case "ROAD":
        throw new CustomError({
          status: HttpStatusCode.BadRequest,
          message: "Road transport is not yet supported",
        });
      default:
        throw exhaustiveMatchingGuard(
          transportPart.transportDetails.modeOfTransport
        );
    }
  } else {
    return await handleCalculationWithGivenFuelConsumption(
      transportPart,
      transportPart.transportDetails
    );
  }
}

/**
 * Calculates the emission in case the fuel consumption is provided. Requires primary data and knowledge of the fuel consumption.
 * @returns The report part for the transport activity.
 */
async function handleCalculationWithGivenFuelConsumption(
  transportPart: FreightEmissionCalculationInput["transportParts"][number],
  transportDetails: ConsumedFuelTransportDetails
) {
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

  const mappedEmissionFactor =
    EmissionFactorService.mapEmissionFactorWithUnits(validatedEmissionFactor);

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
    transportDetails.consumedFuel.unit,
    factorToUse.perUnit,
    transportDetails.consumedFuel.value
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

export const EmissionCalculatorService = {
  performEmissionCalculation,
};

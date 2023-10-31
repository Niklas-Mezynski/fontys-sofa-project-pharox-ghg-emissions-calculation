import { HttpStatusCode } from "axios";
import {
  CalculationReport,
  FreightEmissionCalculationInput,
  freightEmissionCalculationInputSchema,
} from "../../models/emission_calculations/emission_calculation_model";
import { CustomError } from "../../utils/errors";
import { validateInput } from "../../utils/functions";
import { EmissionFactorService } from "../emission_factors/emission_factor_service";
import { classifyUnitType } from "../units/unit_classification_service";
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
        const { producedEmissions, factorToUse, mappedEmissionFactor } =
          await calculateTransportActivity(transportPart);

        // Add the emission to the report
        calculationReport.transportActivities[index] = {
          producedEmissions,
          unit: `${factorToUse.producedUnit} / ${factorToUse.perUnit}`,
          usedEmissionFactor: {
            ...mappedEmissionFactor,
            factors: factorToUse,
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
  const emissionFactor = await getEmissionFactor(
    transportPart.transportDetails
  );

  // --- Unit conversion ---
  const providedUnitType = classifyUnitType(
    transportPart.transportDetails.consumedFuel.unit
  );

  const mappedEmissionFactor = {
    ...emissionFactor,
    factors: emissionFactor.factors.map((factor) => ({
      ...factor,
      producedUnit: factor.unit.split("_PER_")[0].toLowerCase(),
      perUnit: factor.unit.split("_PER_")[1].toLowerCase(), // TODO: Check that this toLowerCase() does not produce any errors
    })),
  };

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
    tankToWheel: factorToUse.factor.TTW
      ? convertedConsumedFuel.value * factorToUse.factor.TTW
      : null,
    wellToTank: factorToUse.factor.WTT
      ? convertedConsumedFuel.value * factorToUse.factor.WTT
      : null,
    wellToWheel: factorToUse.factor.WTW
      ? convertedConsumedFuel.value * factorToUse.factor.WTW
      : null,
  };
  return { producedEmissions, factorToUse, mappedEmissionFactor };
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
  calculationData: FreightEmissionCalculationInput["transportParts"][number]["transportDetails"]
) {
  return EmissionFactorService.getFuelEmissionFactorByFuel(
    calculationData.fuelCode
  );
}

export const EmissionCalculatorService = {
  performEmissionCalculation,
};

import { HttpStatusCode } from "axios";
import { SimpleEmissionCalculationInput } from "../../models/emission_calculations/simple_emission_calculation_model";
import { EmissionFactor } from "../../models/emission_factors/climatiq_emission_factors";
import {
  EmissionCalculatorInput,
  emissionCalculatorInput,
} from "../../models/emission_factors/emission_factors";
import { CustomError } from "../../utils/errors";
import { validateInput } from "../../utils/functions";
import { logger } from "../../utils/logger";
import { Unit, classifyUnit } from "../../utils/units/unit_classifier";
import { EmissionFactorService } from "../emission_factors/emission_factor_service";

/**
 * Calculates the emission based on the provided fuel and emission factor.
 * @param {unknown} inputData the input object.
 * @return {object} the response object.
 */
async function performEmissionCalculation(
  inputData: EmissionCalculatorInput | unknown
) {
  // Check if emission factor and calculation input given
  // Validate calculation input
  // Validation of emission factor input to look for it in DB and check type of emission factor (custom or not)
  const { emissionDetails, calculationDetails } = validateInput(
    inputData,
    emissionCalculatorInput
  );

  // Unit classification
  // TODO: Change this to Patrick's unit classification
  const unitClass = classifyUnit(calculationDetails.unit);

  if (!unitClass) {
    throw new CustomError({
      status: HttpStatusCode.BadRequest,
      message: `Unit ${calculationDetails.unit} is not supported. Could not determine unit class.`,
    });
  }

  // Get emission factor
  const emissionFactor = await getEmissionFactor(unitClass, emissionDetails);

  if (!emissionFactor) {
    throw new CustomError({
      status: HttpStatusCode.BadRequest,
      message: "Could not find emission factor for given input.",
      emissionFactorInput: emissionDetails,
    });
  }

  // Check calculation input units - Not good -> do conversion
  // TODO: Mocked right now, change this to Patrick's unit conversion
  const conversionResult = calculationDetails;

  // Calculate emission
  return {
    result: conversionResult.resourceAmount * emissionFactor.factor,
    calculationData: {
      usedResourceAmount: conversionResult.resourceAmount,
      usedUnit: conversionResult.unit,
      emissionFactor: emissionFactor.factor,
    },
  };
}

/**
 * Gets the emission factor based on the provided emission details.
 * This function has to take care of the different types of user input it may receive
 * TODO: Add more ways to get emission factors
 * @param unitClass The type of unit. E.g. VolumeUnit, MassUnit, LengthUnit
 * @param emissionDetails The emission details. E.g. activityId, activityType, vehicleType, fuelType.
 * @returns The emission factor if available.
 */
async function getEmissionFactor(
  unitClass: Unit,
  emissionDetails: EmissionCalculatorInput["emissionDetails"]
): Promise<EmissionFactor | null> {
  if ("activityId" in emissionDetails) {
    // getEmissionFactorByID
    return EmissionFactorService.getByActivityId(emissionDetails.activityId);
  } else {
    // getEmissionFactorByOtherFields
  }

  return null;
}

/**
 * Calculates the emission based on the provided fuel and emission factor.
 * @param {SimpleEmissionCalculationInput} input the input object.
 * @return {object} the response object.
 */
function simpleEmissionCalculation(input: SimpleEmissionCalculationInput) {
  const emission = input.usedFuel * input.emissionFactor;

  logger.info(
    "Calculated Emission: " +
      emission +
      "\n Provided Fuel: " +
      input.usedFuel +
      "\n Provided Emissions Factor: " +
      input.emissionFactor
  );

  return {
    status: 200,
    result: emission,
    calculationData: {
      usedFuel: input.usedFuel,
      emissionFactor: input.emissionFactor,
    },
  };
}

export const SimpleCalculationService = {
  simpleEmissionCalculation,
  getEmissionFactor,
  performEmissionCalculation,
};

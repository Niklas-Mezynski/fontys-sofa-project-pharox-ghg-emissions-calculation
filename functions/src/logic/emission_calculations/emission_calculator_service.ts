import { SimpleEmissionCalculationInput } from "../../models/emission_calculations/simple_emission_calculation_model";
import { EmissionFactor } from "../../models/emission_factors/climatiq_emission_factors";
import {
  EmissionCalculatorInput,
  emissionCalculatorInput,
} from "../../models/emission_factors/emission_factors";
import { validateInput } from "../../utils/functions";
import { logger } from "../../utils/logger";
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

  logger.info(
    "Received the following data for emission calculation",
    emissionDetails,
    calculationDetails
  );

  let emissionFactor: EmissionFactor | null = null;
  // Different types of fetching emission factor
  if ("activityId" in emissionDetails) {
    // getEmissionFactorByID
    emissionFactor = await EmissionFactorService.getByActivityId(
      emissionDetails.activityId
    );
  } else {
    // getEmissionFactorByOtherFields
  }

  // Check calculation input units - Not good -> do conversion

  // Calculate emission
  return {
    todo: "todo",
    emissionFactor,
  };
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
  performEmissionCalculation,
};

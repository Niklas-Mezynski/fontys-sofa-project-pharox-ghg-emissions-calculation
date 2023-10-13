import { SimpleEmissionCalculationInput } from "../../models/emission_calculations/simple_emission_calculation_model";
import { logger } from "../../utils/logger";

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

export const SimpleCalculationService = { simpleEmissionCalculation };

import { SimpleCalculationService } from "../../logic/emission_calculations/emission_calculator_service";
import { simpleEmissionCalculationInput } from "../../models/emission_calculations/simple_emission_calculation_model";
import { onErrorHandledRequest } from "../../utils/errors";
import { validateInput } from "../../utils/functions";

export const emissionCalculator = onErrorHandledRequest(
  async (request, response) => {
    const result = await SimpleCalculationService.performEmissionCalculation(
      request.body
    );

    // Return emission value
    response.status(200).send(result);
  }
);

export const emissionCalculationSimple = onErrorHandledRequest(
  (request, response) => {
    const calculationInput = validateInput(
      request.body,
      simpleEmissionCalculationInput
    );

    const responseObject =
      SimpleCalculationService.simpleEmissionCalculation(calculationInput);

    // Return emission value
    response.status(200).send(responseObject);
  }
);

import { EmissionCalculatorService } from "../../logic/emission_calculations/emission_calculator_service";
import { onErrorHandledRequest } from "../../utils/request_handler";

/**
 * Cloud function to perform an emission calculation
 */
export const emissionCalculator = onErrorHandledRequest(
  async (request, response) => {
    const result = await EmissionCalculatorService.performEmissionCalculation(
      request.body
    );

    // Return emission value
    response.status(200).send(result);
  }
);

import { SimpleCalculationService } from "../../logic/emission_calculations/simple_calculation_service";
import { onErrorHandledRequest } from "../../utils/errors";

export const emissionCalculationSimple = onErrorHandledRequest(
  (request, response) => {
    const responseObject = SimpleCalculationService.simpleEmissionCalculation(
      request.body
    );
    response.status(200).send(responseObject);
  }
);

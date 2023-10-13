import { SimpleCalculationService } from "../../logic/emission_calculations/simple_calculation_service";
import { simpleEmissionCalculationInput } from "../../models/emission_calculations/simple_emission_calculation_model";
import { onErrorHandledRequest } from "../../utils/errors";
import { validateInput } from "../../utils/functions";


export const emissionCalculationSimple = onErrorHandledRequest(
  (request, response) => {
    const calculationInput = validateInput(
      request.body,
      simpleEmissionCalculationInput
    );

    const responseObject =
      SimpleCalculationService.simpleEmissionCalculation(calculationInput);

    response.status(200).send(responseObject);
  }
);

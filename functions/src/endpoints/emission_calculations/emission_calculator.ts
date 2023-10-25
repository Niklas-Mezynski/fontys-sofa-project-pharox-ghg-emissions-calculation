import { SimpleCalculationService } from "../../logic/emission_calculations/emission_calculator_service";
import { simpleEmissionCalculationInput } from "../../models/emission_calculations/simple_emission_calculation_model";
import { emissionFactorInput } from "../../models/emission_factors/emission_factors";
import { onErrorHandledRequest } from "../../utils/errors";
import { validateInput } from "../../utils/functions";


export const emissionCalculator = onErrorHandledRequest(
  (request, response) => {
    // Check if emission factor and calculation input given

    // Validate calculation input

    // Validation of emission factor input to look for it in DB and
    // check type of emission factor (custom or not)
    const calculationInput = validateInput(
      request.body,
      emissionFactorInput
    );

    // Different types of fetching emission factor
    if ("activityId" in calculationInput) {
      // getEmissionFactorByID
    } else {
      // getEmissionFactorByFields
    }

    // Check calculation input units - Not good -> do conversion

    // Calculate emission
    const responseObject =
      SimpleCalculationService.simpleEmissionCalculation(calculationInput);

    // Return emission value
    response.status(200).send(responseObject);
  }
);

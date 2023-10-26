import { HttpStatusCode } from "axios";
import { onRequest } from "firebase-functions/v2/https";
import { z } from "zod";
import { EmissionFactorService } from "../../logic/emission_factors/emission_factor_service";
import { SimpleCalculationService } from "../../logic/emission_calculations/emission_calculator_service";
import { parseZodError, validateInput } from "../../utils/functions";
import { classifyUnit } from "../../utils/units/unit_classifier";

const queryInputSchema = z.object({
  unit: z.string(),
  amount: z.coerce.string(),
});

/**
 * This Endpoint aims to classify the given unit attempts to find a Emission Factor
 */
export const UnitClassification = onRequest(async (request, response) => {
  const requestBody = validateInput(request.body, queryInputSchema);

  const unitType = classifyUnit(requestBody.unit);

  const test = await EmissionFactorService.getByUnitType("WeightOverDistance");

  response.status(200).send(test);
});

import { HttpStatusCode } from "axios";
import { onRequest } from "firebase-functions/v2/https";
import { z } from "zod";
import { EmissionFactorService } from "../../logic/emission_factors/emission_factor_service";
import { SimpleCalculationService } from "../../logic/emission_calculations/emission_calculator_service";
import { parseZodError, validateInput } from "../../utils/functions";
import { classifyUnitType } from "../../logic/units/unit_classification_service";

const queryInputSchema = z.object({
  unit: z.string(),
  amount: z.coerce.string(),
});

/**
 * This endpoints attempts to classify whether a unit is a:
 * - Weight
 * - Distance
 * - Volume
 */
export const UnitClassification = onRequest(async (request, response) => {
  const requestBody = validateInput(request.body, queryInputSchema);

  const unitType = classifyUnitType(requestBody.unit);

  response.json({ unit: unitType }).sendStatus(200);
});

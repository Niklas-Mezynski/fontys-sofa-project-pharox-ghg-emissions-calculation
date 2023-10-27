import { onRequest } from "firebase-functions/v2/https";
import { z } from "zod";
import { validateInput } from "../../utils/functions";
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

  response.json({ unit: unitType }).status(200).send();
});

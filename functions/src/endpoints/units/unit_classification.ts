import { classifyUnitType } from "../../logic/units/unit_classification_service";
import { onErrorHandledRequest } from "../../utils/errors";
import { validateInput } from "../../utils/functions";
import { z } from "zod";

const queryInputSchema = z.object({
  unit: z.string(),
});

/**
 * This endpoints attempts to classify whether a unit is a:
 * - Weight
 * - Distance
 * - Volume
 */
export const unitClassification = onErrorHandledRequest(
  async (request, response) => {
    const requestBody = validateInput(request.body, queryInputSchema);

    const unitType = classifyUnitType(requestBody.unit);

    response.json({ unit: unitType }).status(200).send();
  }
);

import { classifyUnitType } from "../../logic/units/unit_classification_service";
import { onErrorHandledRequest } from "../../utils/request_handler";
import { validateInput } from "../../utils/functions";
import { unitClassificationInputSchema } from "../../models/units/units";

/**
 * This endpoints attempts to classify whether a unit is a:
 * - Weight
 * - Distance
 * - Volume
 */
export const unitClassification = onErrorHandledRequest(
  async (request, response) => {
    const requestBody = validateInput(
      request.body,
      unitClassificationInputSchema
    );

    const unitType = classifyUnitType(requestBody.unit);

    response.json({ unit: unitType }).status(200).send();
  }
);

import { classifyUnitType } from "../../logic/units/unit_classification_service";
import { onErrorHandledRequest } from "../../utils/request_handler";
import { HttpStatusCode } from "axios";
import { UnitConversionService } from "../../logic/units/unit_conversion_service";
import { validateInput } from "../../utils/functions";
import { CustomError } from "../../utils/errors";
import { unitConverterInputSchema } from "../../models/units/units";

/**
    This endpoint converts a given unit to the desired one
 */
export const unitConverter = onErrorHandledRequest(
  async (request, response) => {
    const requestBody = validateInput(request.body, unitConverterInputSchema);

    // Verify that: originalUnitType and targetUnitType are of the same classification (e.g. both are distances)
    const originalUnitClassification = classifyUnitType(
      requestBody.originalUnitType
    );
    const targetUnitClassification = classifyUnitType(
      requestBody.targetUnitType
    );

    if (originalUnitClassification !== targetUnitClassification) {
      throw new CustomError({
        status: HttpStatusCode.BadRequest,
        message: `Conversion from ${requestBody.originalUnitType} to ${requestBody.targetUnitType} not possible. Not same unit classification.`,
      });
    }

    // Convert
    const convertedUnit = UnitConversionService.convertUnits(
      requestBody.originalUnitType,
      requestBody.targetUnitType,
      requestBody.value
    );

    response.json(convertedUnit).status(200).send();
  }
);

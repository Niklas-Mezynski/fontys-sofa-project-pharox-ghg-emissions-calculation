import { classifyUnitType } from "../../logic/units/unit_classification_service";
import { CustomError, onErrorHandledRequest } from "../../utils/errors";
import { HttpStatusCode } from "axios";
import { UnitConversionService } from "../../logic/units/unit_conversion_service";
import { validateInput } from "../../utils/functions";
import { z } from "zod";
import { authenticate } from "../../utils/authentication";

const queryInputSchema = z.object({
  originalUnitType: z.string(), // e.g. m
  targetUnitType: z.string(), // e.g. km
  value: z.number(), // e.g. 1000
});

/**
    This endpoint converts a given unit to the desired one
 */
export const unitConverter = onErrorHandledRequest(
  async (request, response) => {
    authenticate(request.headers.authorization);
    
    const requestBody = validateInput(request.body, queryInputSchema);

    // Verify that: originalUnitType and targetUnitType are of the same classification (e.g. both are distances)
    const originalUnitClassification = classifyUnitType(requestBody.originalUnitType);
    const targetUnitClassification = classifyUnitType(requestBody.targetUnitType);

    if (originalUnitClassification !== targetUnitClassification) {
      throw new CustomError({
        status: HttpStatusCode.BadRequest,
        message: `Conversion from ${requestBody.originalUnitType} to ${requestBody.targetUnitType} not possible. Not same unit classification.`,
      });
    }

    // // Verify that the targetUnitType and originalUnitType is a supported Unit. Otherwise they cannot be converted.
    // const targetUnitSupported = UnitConversionService.verifyIfUnitIsSupported(requestBody.targetUnitType);
    // const originalTargetSupported = UnitConversionService.verifyIfUnitIsSupported(requestBody.originalUnitType);

    // if (targetUnitSupported === false || originalTargetSupported === false) {
    //   throw new CustomError({
    //     status: HttpStatusCode.BadRequest,
    //     message: "Either the Target Unit or the Original Unit is not supported.",
    //   });
    // }

    // Convert
    const convertedUnit = UnitConversionService.convertUnits(
      requestBody.originalUnitType,
      requestBody.targetUnitType,
      requestBody.value
    );

    response
      .json({ convertedUnit: convertedUnit, unit: requestBody.targetUnitType })
      .status(200)
      .send();
  }
);

import { onRequest } from "firebase-functions/v2/https";
import { z } from "zod";
import { validateInput } from "../../utils/functions";
import { classifyUnitType } from "../../logic/units/unit_classification_service";
import { UnitConversionService } from "../../logic/units/unit_conversion_service";
import { HttpStatusCode } from "axios";

const queryInputSchema = z.object({
  originalUnitType: z.string(), // e.g. m
  targetUnitType: z.string(), // e.g. km
  value: z.number(), // e.g. 1000
});

/**
    This endpoing converts a given unit to the desired one
 */
export const UnitConverter = onRequest(async (request, response) => {
  const requestBody = validateInput(request.body, queryInputSchema);

  // 1: Verify that: originalUnitType and targetUnitType are of the same classification (e.g. both are distances)
  const originalUnitClassification = classifyUnitType(
    requestBody.originalUnitType
  );
  const targetUnitClassification = classifyUnitType(requestBody.targetUnitType);

  if (originalUnitClassification !== targetUnitClassification) {
    response.status(HttpStatusCode.BadRequest).json({
      status: HttpStatusCode.BadRequest,
      message: "The originalUnitType and targetUnitType do not match.",
    });
    return;
  }

  // Verify that the targetUnitType and originalUnitType is a supported Unit. Otherwise they cannot be converted.
  const targetUnitSupported = UnitConversionService.verifyIfUnitIsSupporter(
    requestBody.targetUnitType
  );
  const originalTargetSupported = UnitConversionService.verifyIfUnitIsSupporter(
    requestBody.originalUnitType
  );

  if (targetUnitSupported === false || originalTargetSupported === false) {
    response.status(HttpStatusCode.BadRequest).json({
      status: HttpStatusCode.BadRequest,
      message: "Either the Target Unit or the Original Unit is not supported.",
    });
    return;
  }

  // Convert
  const convertedUnit = UnitConversionService.convertUnit(
    requestBody.originalUnitType,
    requestBody.targetUnitType,
    requestBody.value
  );

  response
    .json({ convertedUnit: convertedUnit, unit: requestBody.targetUnitType })
    .status(200)
    .send();
});

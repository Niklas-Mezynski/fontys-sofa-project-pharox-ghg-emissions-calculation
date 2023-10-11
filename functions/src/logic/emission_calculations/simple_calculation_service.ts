import { z } from "zod";
import { parseZodError } from "../../utils/functions";
import { logger } from "../../utils/logger";

const bodyInputSchema = z.object({
  usedFuel: z.number().min(0),
  emissionFactor: z.number().min(0),
});

/**
 * Calculates the emission based on the provided fuel and emission factor.
 * @param {object} requestBody the request body.
 * @return {object} the response object.
 */
function simpleEmissionCalculation(requestBody: Record<string, unknown>) {
  const parseResult = bodyInputSchema.safeParse(requestBody);

  if (!parseResult.success) {
    throw parseZodError(
      parseResult.error.issues,
      "Not all necessary body properties are present."
    );
  }

  const httpRequestBody = parseResult.data;

  const emission = httpRequestBody.usedFuel * httpRequestBody.emissionFactor;

  logger.info(
    "Calculated Emission: " +
      emission +
      "\n Provided Fuel: " +
      httpRequestBody.usedFuel +
      "\n Provided Emissions Factor: " +
      httpRequestBody.emissionFactor
  );

  return {
    status: 200,
    result: emission,
    calculationData: {
      usedFuel: httpRequestBody.usedFuel,
      emissionFactor: httpRequestBody.emissionFactor,
    },
  };
}

export const SimpleCalculationService = { simpleEmissionCalculation };

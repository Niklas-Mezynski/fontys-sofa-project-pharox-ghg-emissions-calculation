import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// TODO: Move logic to separate file
export const emissionCalculationSimple = onRequest((request, response) => {
  // Fetch request body
  const httpRequestBody = request.body;

  // Validate that the necessary properties are present within the body
  if (
    httpRequestBody.usedFuel === null ||
    httpRequestBody.emissionFactor === null
  ) {
    response.status(400).send("Not all necessary body properties are present.");
  }

  const emission = httpRequestBody.usedFuel * httpRequestBody.emissionFactor;

  logger.info(
    "Calculated Emission: " +
      emission +
      "\n Provided Fuel: " +
      httpRequestBody.usedFuel +
      "\n Provided Emissions Factor: " +
      httpRequestBody.emissionFactor
  );

  const responseObject = {
    status: 200,
    result: emission,
    calculationData: {
      usedFuel: httpRequestBody.usedFuel,
      emissionFactor: httpRequestBody.emissionFactor,
    },
  };

  response.status(200).send(responseObject);
});

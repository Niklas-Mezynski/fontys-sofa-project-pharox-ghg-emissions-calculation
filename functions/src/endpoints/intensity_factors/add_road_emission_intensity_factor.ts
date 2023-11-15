import { onErrorHandledRequest } from "../../utils/request_handler";

/**
 * Cloud function to perform an emission calculation
 */
export const newRoadEmissionIntensityFactor = onErrorHandledRequest(
  async (request, response) => {
    // Return emission value
    response.status(200).send("ok");
  }
);

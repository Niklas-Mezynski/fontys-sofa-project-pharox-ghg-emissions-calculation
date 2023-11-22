import { createIntensityFactor } from "../../../logic/intensity_factors/intensity_factor_service";
import { onErrorHandledRequest } from "../../../utils/request_handler";

/**
 * Endpoint which adds a ROAD Emission Intensity Factor.
 */
export const newRoadEmissionIntensityFactor = onErrorHandledRequest(
  async (request, response) => {
    await createIntensityFactor(request.body);
    response.status(200).send("Factor inserted.");
  }
);

import { removeIntensityFactor } from "../../logic/intensity_factors/intensity_factor_service";
import { onErrorHandledRequest } from "../../utils/request_handler";

/**
 * Updates an Emission Intensity Factor by UUID
 */
export const removeRoadEmissionIntensityFactor = onErrorHandledRequest(
  async (request, response) => {
    await removeIntensityFactor(request.body, request.body.identifier);
    response.status(200).send("Factor Removed.");
  }
);

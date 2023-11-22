import { updateIntensityFactor } from "../../../logic/intensity_factors/intensity_factor_service";
import { onErrorHandledRequest } from "../../../utils/request_handler";

/**
 * Updates an Emission Intensity Factor by UUID
 */
export const updateRoadEmissionIntensityFactor = onErrorHandledRequest(
  async (request, response) => {
    await updateIntensityFactor(request.body, request.body.identifier);
    response.status(200).send("Factor Updated.");
  }
);

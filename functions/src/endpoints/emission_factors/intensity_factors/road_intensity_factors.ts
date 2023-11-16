import { RoadIntensityFactorService } from "../../../logic/emission_factors/intensity_factors/road_intensity_factor_service";
import { onErrorHandledRequest } from "../../../utils/request_handler";

export const addRoadEmissionIntensityFactors = onErrorHandledRequest(
  async (request, response) => {
    const emissionFactors =
      await RoadIntensityFactorService.createRoadIntensityFactors(request.body);

    response.status(200).json(emissionFactors);
  }
);

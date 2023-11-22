import { CRUDEmissionFactorService } from "../../../logic/emission_factors/crud_emission_factor_service";
import { roadIntensityFactorSchema } from "../../../models/emission_factors/road_intensity_factors";
import { onErrorHandledRequest } from "../../../utils/request_handler";

/**
 * Endpoint which adds a ROAD Emission Intensity Factor.
 */
export const createRoadEmissionIntensityFactor = onErrorHandledRequest(
  async (request, response) => {
    await CRUDEmissionFactorService.createEmissionFactor(
      request.body,
      roadIntensityFactorSchema,
      "ROAD"
    );
    response.status(200).send("Factor inserted.");
  }
);

/**
 * Updates an Emission Intensity Factor by UUID
 */
export const deleteRoadEmissionIntensityFactor = onErrorHandledRequest(
  async (request, response) => {
    await CRUDEmissionFactorService.deleteEmissionFactor(
      request.body.identifier,
      "ROAD"
    );
    response.status(200).send("Factor Removed.");
  }
);

/**
 * Updates an Emission Intensity Factor by UUID
 */
export const updateRoadEmissionIntensityFactor = onErrorHandledRequest(
  async (request, response) => {
    await CRUDEmissionFactorService.updateEmissionFactor(
      request.body,
      request.body.id,
      roadIntensityFactorSchema,
      "ROAD"
    );
    response.status(200).send("Factor Updated.");
  }
);

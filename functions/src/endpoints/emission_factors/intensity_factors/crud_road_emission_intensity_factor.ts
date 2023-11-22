import { HttpStatusCode } from "axios";
import { CRUDEmissionFactorService } from "../../../logic/emission_factors/crud_emission_factor_service";
import { CustomError } from "../../../utils/errors";
import { onErrorHandledRequest } from "../../../utils/request_handler";

/**
 * Cloud function to fetch all the ROAD emission factors
 */
export const getRoadEmissionIntensityFactors = onErrorHandledRequest(
  async (request, response) => {
    const factors = await CRUDEmissionFactorService.getEmissionFactors("ROAD");
    response.json(factors);
  }
);

/**
 * Cloud function to fetch a ROAD emission factors by ID
 */
export const getRoadEmissionIntensityFactorById = onErrorHandledRequest(
  async (request, response) => {
    const { id } = request.query;

    if (!id) {
      throw new CustomError({
        status: HttpStatusCode.NotFound,
        message: "Road Emission Factor ID not Found",
      });
    }

    const factor = await CRUDEmissionFactorService.getEmissionFactorById(
      id as string,
      "ROAD"
    );
    response.json(factor);
  }
);

/**
 * Endpoint which adds a ROAD Emission Intensity Factor.
 */
export const createRoadEmissionIntensityFactor = onErrorHandledRequest(
  async (request, response) => {
    await CRUDEmissionFactorService.createEmissionFactor(request.body, "ROAD");
    response.status(200).send("Factor inserted.");
  }
);

/**
 * Endpoint which adds multiple ROAD Emission Intensity Factors.
 */
export const createRoadEmissionIntensityFactors = onErrorHandledRequest(
  async (request, response) => {
    await CRUDEmissionFactorService.createEmissionFactors(request.body, "ROAD");
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
      "ROAD"
    );
    response.status(200).send("Factor Updated.");
  }
);

import { HttpStatusCode } from "axios";
import { CustomError } from "../../../utils/errors";
import { onErrorHandledRequest } from "../../../utils/request_handler";
import { roadIntensityFactorSchema } from "../../../models/emission_factors/road_intensity_factors";
import { validateInput } from "../../../utils/functions";
import { CRUDEntityService } from "../../../logic/common/CRUD_entity_service";

/** CREATE METHODS */

/**
 * Cloud function to create a Road Emission Intensity Factor.
 */
export const createRoadEmissionIntensityFactor = onErrorHandledRequest(
  async (request, response) => {
    const createdFactor = await CRUDEntityService.createEntity(request.body, "ROAD_FACTOR");
    response.status(200).send(createdFactor);
  }
);

/**
 * Cloud function to create multiple Road Emission Intensity Factors.
 */
export const createRoadEmissionIntensityFactors = onErrorHandledRequest(
  async (request, response) => {
    const createdFactors = await CRUDEntityService.createEntities(request.body, "ROAD_FACTOR");
    response.status(200).send(createdFactors);
  }
);

/** READ METHODS */

/**
 * Cloud function to fetch all the ROAD emission factors
 */
export const getRoadEmissionIntensityFactors = onErrorHandledRequest(
  async (request, response) => {
    const factors = await CRUDEntityService.getEntities("ROAD_FACTOR");
    response.json(factors);
  }
);

/**
 * Cloud function to fetch a ROAD emission factors by ID
 */
export const getRoadEmissionIntensityFactorById = onErrorHandledRequest(
  async (request, response) => {
    const { id } = validateInput(
      request.query,
      roadIntensityFactorSchema.partial(),
      "Road Emission Intensity Factor ID not Found"
    );

    if (!id) {
      throw new CustomError({
        status: HttpStatusCode.NotFound,
        message: "Road Emission Intensity Factor ID not Found",
      });
    }

    const factor = await CRUDEntityService.getEntityById(
      id,
      "ROAD_FACTOR"
    );
    response.json(factor);
  }
);

/** UPDATE METHODS */

/**
 * Cloud function to update a Road Emission Intensity Factor by ID
 */
export const updateRoadEmissionIntensityFactor = onErrorHandledRequest(
  async (request, response) => {
    const { id } = validateInput(
      request.query,
      roadIntensityFactorSchema.partial(),
      "Road Emission Intensity Factor ID not Found"
    );

    if (!id) {
      throw new CustomError({
        status: HttpStatusCode.NotFound,
        message: "Road Emission Intensity Factor ID not Found",
      });
    }

    const updatedFactor = await CRUDEntityService.updateEntity(
      request.body,
      id,
      "ROAD_FACTOR"
    );
    response.status(200).send(updatedFactor);
  }
);

/** DELETE METHODS */

/**
 * Cloud function to delete a Road Emission Intensity Factor by ID
 */
export const deleteRoadEmissionIntensityFactor = onErrorHandledRequest(
  async (request, response) => {
    const { id } = validateInput(
      request.query,
      roadIntensityFactorSchema.partial(),
      "Road Emission Intensity Factor ID not Found"
    );

    if (!id) {
      throw new CustomError({
        status: HttpStatusCode.NotFound,
        message: "Road Emission Intensity Factor ID not Found",
      });
    }

    await CRUDEntityService.deleteEntity(
      id,
      "ROAD_FACTOR"
    );
    response.status(200).send("Road Emission Intensity Factor deleted.");
  }
);

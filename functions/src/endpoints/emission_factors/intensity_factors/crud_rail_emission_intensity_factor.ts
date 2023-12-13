import { HttpStatusCode } from "axios";
import { CustomError } from "../../../utils/errors";
import { onErrorHandledRequest } from "../../../utils/request_handler";
import { railIntensityFactorSchema } from "../../../models/emission_factors/rail_intensity_factors";
import { validateInput } from "../../../utils/functions";
import { CRUDEntityService } from "../../../logic/common/CRUD_entity_service";

/** CREATE METHODS */

/**
 * Cloud function to create a Rail Emission Intensity Factor.
 */
export const createRailEmissionIntensityFactor = onErrorHandledRequest(
  async (request, response) => {
    const createdFactor = await CRUDEntityService.createEntity(
      request.body,
      "RAIL_FACTOR"
    );
    response.status(200).send(createdFactor);
  }
);

/**
 * Cloud function to create multiple Rail Emission Intensity Factors.
 */
export const createRailEmissionIntensityFactors = onErrorHandledRequest(
  async (request, response) => {
    const createdFactors = await CRUDEntityService.createEntities(
      request.body,
      "RAIL_FACTOR"
    );
    response.status(200).send(createdFactors);
  }
);

/** READ METHODS */

/**
 * Cloud function to fetch all the RAIL emission factors
 */
export const getRailEmissionIntensityFactors = onErrorHandledRequest(
  async (request, response) => {
    const factors = await CRUDEntityService.getEntities("RAIL_FACTOR");
    response.json(factors);
  }
);

/**
 * Cloud function to fetch a RAIL emission factors by ID
 */
export const getRailEmissionIntensityFactorById = onErrorHandledRequest(
  async (request, response) => {
    const { id } = validateInput(
      request.query,
      railIntensityFactorSchema.partial(),
      "Rail Emission Intensity Factor ID not Found"
    );

    if (!id) {
      throw new CustomError({
        status: HttpStatusCode.NotFound,
        message: "Rail Emission Intensity Factor ID not Found",
      });
    }

    const factor = await CRUDEntityService.getEntityById(id, "RAIL_FACTOR");
    response.json(factor);
  }
);

/** UPDATE METHODS */

/**
 * Cloud function to update a Rail Emission Intensity Factor by ID
 */
export const updateRailEmissionIntensityFactor = onErrorHandledRequest(
  async (request, response) => {
    const { id } = validateInput(
      request.query,
      railIntensityFactorSchema.partial(),
      "Rail Emission Intensity Factor ID not Found"
    );

    if (!id) {
      throw new CustomError({
        status: HttpStatusCode.NotFound,
        message: "Rail Emission Intensity Factor ID not Found",
      });
    }

    const updatedFactor = await CRUDEntityService.updateEntity(
      request.body,
      id,
      "RAIL_FACTOR"
    );
    response.status(200).send(updatedFactor);
  }
);

/** DELETE METHODS */

/**
 * Cloud function to delete a Rail Emission Intensity Factor by ID
 */
export const deleteRailEmissionIntensityFactor = onErrorHandledRequest(
  async (request, response) => {
    const { id } = validateInput(
      request.query,
      railIntensityFactorSchema.partial(),
      "Rail Emission Intensity Factor ID not Found"
    );

    if (!id) {
      throw new CustomError({
        status: HttpStatusCode.NotFound,
        message: "Rail Emission Intensity Factor ID not Found",
      });
    }

    await CRUDEntityService.deleteEntity(id, "RAIL_FACTOR");
    response.status(200).send("Rail Emission Intensity Factor deleted.");
  }
);

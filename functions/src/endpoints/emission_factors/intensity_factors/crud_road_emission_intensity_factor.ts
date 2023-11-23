import { HttpStatusCode } from "axios";
import { CRUDEmissionFactorService } from "../../../logic/emission_factors/crud_emission_factor_service";
import { CustomError } from "../../../utils/errors";
import { onErrorHandledRequest } from "../../../utils/request_handler";
import { roadIntensityFactorSchema } from "../../../models/emission_factors/road_intensity_factors";
import { validateInput } from "../../../utils/functions";

/** CREATE METHODS */

/**
 * Cloud function to create a Road Emission Intensity Factor.
 */
export const createRoadEmissionIntensityFactor = onErrorHandledRequest(
  async (request, response) => {
    const createdFactor = await CRUDEmissionFactorService.createEmissionFactor(request.body, "ROAD");
    response.status(200).send(createdFactor);
  }
);

/**
 * Cloud function to create multiple Road Emission Intensity Factors.
 */
export const createRoadEmissionIntensityFactors = onErrorHandledRequest(
  async (request, response) => {
    const createdFactors = await CRUDEmissionFactorService.createEmissionFactors(request.body, "ROAD");
    response.status(200).send(createdFactors);
  }
);

/** READ METHODS */

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

    const factor = await CRUDEmissionFactorService.getEmissionFactorById(
      id,
      "ROAD"
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

    const updatedFactor = await CRUDEmissionFactorService.updateEmissionFactor(
      request.body,
      id,
      "ROAD"
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

    await CRUDEmissionFactorService.deleteEmissionFactor(
      id,
      "ROAD"
    );
    response.status(200).send("Road Emission Intensity Factor.");
  }
);

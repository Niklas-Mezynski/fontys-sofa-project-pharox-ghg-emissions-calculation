import { HttpStatusCode } from "axios";
import { FuelEmissionFactorService } from "../../../logic/emission_factors/fuel_emission_factor_service";
import {
  fuelEmissionFactorSchema,
  fuelSchema,
} from "../../../models/emission_factors/fuel_emission_factors";
import { CustomError } from "../../../utils/errors";
import { validateInput } from "../../../utils/functions";
import { onErrorHandledRequest } from "../../../utils/request_handler";
import { CRUDEntityService } from "../../../logic/common/CRUD_entity_service";
import { Filter } from "firebase-admin/firestore";

/** CREATE METHODS */

/**
 * Cloud function to add a Fuel emission factor
 */
export const createFuelEmissionFactor = onErrorHandledRequest(
  async (request, response) => {
    const emissionFactor = await CRUDEntityService.createEntity(
      request.body,
      "FUEL_FACTOR"
    );
    response.status(200).json(emissionFactor);
  }
);

/**
 * Cloud function to add multiple Fuel emission factors
 */
export const createFuelEmissionFactors = onErrorHandledRequest(
  async (request, response) => {
    const emissionFactors = await CRUDEntityService.createEntities(
      request.body,
      "FUEL_FACTOR"
    );

    response.status(200).json(emissionFactors);
  }
);

/** READ METHODS */

/**
 * Cloud function to fetch all the Fuel emission factors
 */
export const getFuelEmissionFactors = onErrorHandledRequest(
  async (request, response) => {
    const factors = await CRUDEntityService.getEntities("FUEL_FACTOR");
    response.json(factors);
  }
);

/**
 * Cloud function to fetch a Fuel emission factors by ID
 */
export const getFuelEmissionFactorById = onErrorHandledRequest(
  async (request, response) => {
    const { id } = validateInput(
      request.query,
      fuelEmissionFactorSchema.partial(),
      "Fuel Emission Factor ID not Found"
    );

    if (!id) {
      throw new CustomError({
        status: HttpStatusCode.NotFound,
        message: "Fuel Emission Factor ID not Found",
      });
    }

    const factor = await CRUDEntityService.getEntityById(id, "FUEL_FACTOR");
    response.json(factor);
  }
);

/**
 * Cloud function to fetch all the Fuel emission factors with a certain Fuel code
 */
export const getFuelEmissionFactorByFuelCode = onErrorHandledRequest(
  async (request, response) => {
    const { code } = validateInput(
      request.query,
      fuelSchema.partial(),
      "Fuel Code not Found"
    );

    if (!code) {
      throw new CustomError({
        status: HttpStatusCode.NotFound,
        message: "Fuel Code not Found",
      });
    }

    const filter = Filter.where("fuel.code", "==", code);
    const factors = await CRUDEntityService.getEntitiesByFilter(
      filter,
      "FUEL_FACTOR"
    );

    response.json(factors);
  }
);

/**
 * Cloud function to fetch all the Fuel emission factors with a certain Region
 */
export const getFuelEmissionFactorByRegion = onErrorHandledRequest(
  async (request, response) => {
    const { region } = validateInput(
      request.query,
      fuelEmissionFactorSchema.partial(),
      "Region not Found"
    );

    if (!region) {
      throw new CustomError({
        status: HttpStatusCode.NotFound,
        message: "Region not Found",
      });
    }

    const filter = Filter.where("region", "==", region);
    const factors = await CRUDEntityService.getEntitiesByFilter(
      filter,
      "FUEL_FACTOR"
    );

    response.json(factors);
  }
);

/**
 * Cloud function to fetch all the Fuel emission factors with a certain Source
 */
export const getFuelEmissionFactorBySource = onErrorHandledRequest(
  async (request, response) => {
    const { source } = validateInput(
      request.query,
      fuelEmissionFactorSchema.partial(),
      "Data source not Found"
    );

    if (!source) {
      throw new CustomError({
        status: HttpStatusCode.NotFound,
        message: "Data source not Found",
      });
    }

    const filter = Filter.where("source", "==", source);
    const factors = await CRUDEntityService.getEntitiesByFilter(
      filter,
      "FUEL_FACTOR"
    );

    response.json(factors);
  }
);

/** UPDATE METHODS */

/**
 * Cloud function to update a Fuel emission factor by ID
 */
export const updateFuelEmissionFactor = onErrorHandledRequest(
  async (request, response) => {
    const { id } = validateInput(
      request.query,
      fuelEmissionFactorSchema.partial(),
      "Fuel Emission Factor ID not Found"
    );

    if (!id) {
      throw new CustomError({
        status: HttpStatusCode.NotFound,
        message: "Fuel Emission Factor ID not Found",
      });
    }

    const factor = await CRUDEntityService.updateEntity(
      request.body,
      id,
      "FUEL_FACTOR"
    );
    response.json(factor);
  }
);

/** DELETE METHODS */

/**
 * Cloud function to delete a Fuel emission factor by ID
 */
export const deleteFuelEmissionFactor = onErrorHandledRequest(
  async (request, response) => {
    const { id } = validateInput(
      request.query,
      fuelEmissionFactorSchema.partial(),
      "Fuel Emission Factor ID not Found"
    );

    if (!id) {
      throw new CustomError({
        status: HttpStatusCode.NotFound,
        message: "Fuel Emission Factor ID not Found",
      });
    }

    await CRUDEntityService.deleteEntity(id, "FUEL_FACTOR");
    response.status(200).send("Fuel Emission Factor deleted.");
  }
);

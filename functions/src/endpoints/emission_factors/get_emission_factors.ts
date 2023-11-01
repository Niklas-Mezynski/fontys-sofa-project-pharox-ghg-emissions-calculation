import { HttpStatusCode } from "axios";
import { EmissionFactorService } from "../../logic/emission_factors/emission_factor_service";
import { getEmissionFactorQueryInput } from "../../models/emission_factors/climatiq_emission_factors";
import { authenticate } from "../../utils/authentication";
import { fuelEmissionFactorSchema, fuelSchema } from "../../models/emission_factors/emission_factors";
import { CustomError, onErrorHandledRequest } from "../../utils/errors";
import { validateInput } from "../../utils/functions";

export const getEmissionFactors = onErrorHandledRequest(
  async (request, response) => {
    authenticate(request.headers.authorization);
    
    const factors = await EmissionFactorService.getAll();

    response.json(factors);
  }
);

export const getEmissionFactorByActivity = onErrorHandledRequest(
  async (request, response) => {
    authenticate(request.headers.authorization);
    
    const { activityId } = validateInput(
      request.query,
      getEmissionFactorQueryInput
    );

    const factor = await EmissionFactorService.getByActivityId(activityId);

    response.json(factor);
  }
);

/** FUEL EMISSION FACTORS */

/**
 * Cloud function to fetch all the Fuel emission factors
 */
export const getFuelEmissionFactors = onErrorHandledRequest(
  async (request, response) => {
    const factors = await EmissionFactorService.getAllFuelEmissionFactors();
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
      "Fuel Emission Factor ID not Found",
    );

    if (!id) {
      throw new CustomError({
        status: HttpStatusCode.NotFound,
        message: "Fuel Emission Factor ID not Found",
      });
    }

    const factor = await EmissionFactorService.getFuelEmissionFactorById(id);
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

    const factors = await EmissionFactorService.getFuelEmissionFactorByFuelCode(code);
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

    const factors = await EmissionFactorService.getFuelEmissionFactorByRegion(region);
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
      "Region not Found"
    );

    if (!source) {
      throw new CustomError({
        status: HttpStatusCode.NotFound,
        message: "Region not Found",
      });
    }

    const factors = await EmissionFactorService.getFuelEmissionFactorBySource(source);
    response.json(factors);
  }
);

/** INTENSITY EMISSION FACTORS */
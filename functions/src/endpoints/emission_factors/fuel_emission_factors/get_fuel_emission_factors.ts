import { CustomError } from "../../../utils/errors";
import {
  fuelEmissionFactorSchema,
  fuelSchema,
} from "../../../models/emission_factors/fuel_emission_factors";
import { FuelEmissionFactorService } from "../../../logic/emission_factors/fuel_emission_factor_service";
import { HttpStatusCode } from "axios";
import { onErrorHandledRequest } from "../../../utils/request_handler";
import { validateInput } from "../../../utils/functions";

/** FUEL EMISSION FACTORS */

/**
 * Cloud function to fetch all the Fuel emission factors
 */
export const getFuelEmissionFactors = onErrorHandledRequest(
  async (request, response) => {
    const factors = await FuelEmissionFactorService.getAllFuelEmissionFactors();
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

    const factor = await FuelEmissionFactorService.getFuelEmissionFactorById(id);
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

    const factors =
      await FuelEmissionFactorService.getFuelEmissionFactorByFuelCode(code);
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

    const factors =
      await FuelEmissionFactorService.getFuelEmissionFactorByRegion(region);
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

    const factors =
      await FuelEmissionFactorService.getFuelEmissionFactorBySource(source);
    response.json(factors);
  }
);

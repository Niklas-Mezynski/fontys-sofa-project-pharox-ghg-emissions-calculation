import { CRUDEmissionFactorService } from "../../../logic/emission_factors/crud_emission_factor_service";
import { FuelEmissionFactorService } from "../../../logic/emission_factors/fuel_emission_factor_service";
import { fuelEmissionFactorSchema } from "../../../models/emission_factors/fuel_emission_factors";
import { onErrorHandledRequest } from "../../../utils/request_handler";

/**
 * Cloud function to add a Fuel emission factor
 */
export const addFuelEmissionFactor = onErrorHandledRequest(
  async (request, response) => {
    const emissionFactor = await CRUDEmissionFactorService.createEmissionFactor(
      request.body,
      fuelEmissionFactorSchema,
      "FUEL"
    );
    response.status(200).json(emissionFactor);
  }
);

/**
 * Cloud function to add multiple Fuel emission factors
 */
export const addFuelEmissionFactors = onErrorHandledRequest(
  async (request, response) => {
    const emissionFactors =
      await CRUDEmissionFactorService.createEmissionFactors(
        request.body,
        fuelEmissionFactorSchema,
        "FUEL"
      );

    response.status(200).json(emissionFactors);
  }
);

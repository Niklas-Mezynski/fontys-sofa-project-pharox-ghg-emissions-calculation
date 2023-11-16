import { FuelEmissionFactorService } from "../../../logic/emission_factors/fuel_emission_factor_service";
import { onErrorHandledRequest } from "../../../utils/request_handler";

/**
 * Cloud function to add a Fuel emission factor
 */
export const addFuelEmissionFactor = onErrorHandledRequest(
  async (request, response) => {
    const emissionFactor = await FuelEmissionFactorService.createFuelEmissionFactor(
      request.body
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
      await FuelEmissionFactorService.createFuelEmissionFactors(request.body);

    response.status(200).json(emissionFactors);
  }
);

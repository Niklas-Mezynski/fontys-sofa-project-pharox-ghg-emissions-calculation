import { EmissionFactorService } from "../../logic/emission_factors/emission_factor_service";
import { onErrorHandledRequest } from "../../utils/errors";

export const addFuelEmissionFactor = onErrorHandledRequest(
  async (request, response) => { 
    const emissionFactor = await EmissionFactorService.createFuelEmissionFactor(request.body);
    response.status(200).json(emissionFactor);
  }
);

export const addFuelEmissionFactors = onErrorHandledRequest(
  async (request, response) => {
    const emissionFactors = await EmissionFactorService.createFuelEmissionFactors(request.body);

    response.status(200).json(emissionFactors);
  }
);
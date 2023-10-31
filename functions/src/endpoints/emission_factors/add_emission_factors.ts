import { EmissionFactorService } from "../../logic/emission_factors/emission_factor_service";
import { authenticate } from "../../utils/authentication";
import { onErrorHandledRequest } from "../../utils/errors";

export const addFuelEmissionFactor = onErrorHandledRequest(
  async (request, response) => {
    authenticate(request.headers.authorization);
    
    const emissionFactor = await EmissionFactorService.createFuelEmissionFactor(request.body);
    response.status(200).json(emissionFactor);
  }
);

export const addFuelEmissionFactors = onErrorHandledRequest(
  async (request, response) => {
    authenticate(request.headers.authorization);
    
    const emissionFactors = await EmissionFactorService.createFuelEmissionFactors(request.body);

    response.status(200).json(emissionFactors);
  }
);
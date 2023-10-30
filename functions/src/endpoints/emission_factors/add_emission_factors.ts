import { EmissionFactorService } from "../../logic/emission_factors/emission_factor_service";
import { onErrorHandledRequest } from "../../utils/errors";

export const addEmissionFactor = onErrorHandledRequest(
  async (request, response) => {
    const emissionFactor = EmissionFactorService.create();

    response.status(200).json(emissionFactor);
  }
);

export const addEmissionFactors = onErrorHandledRequest(
    async (request, response) => {
      const emissionFactor = EmissionFactorService.createBulk();
  
      response.status(200).json(emissionFactor);
    }
  );
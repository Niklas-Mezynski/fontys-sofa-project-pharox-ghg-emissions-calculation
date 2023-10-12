import { EmissionFactorService } from "../../logic/emission_factors/emission_factor_service";
import { getEmissionFactorQueryInput } from "../../models/emission_factors/emission_factors";
import { onErrorHandledRequest } from "../../utils/errors";
import { validateInput } from "../../utils/functions";

export const getEmissionFactors = onErrorHandledRequest(
  async (request, response) => {
    const factors = await EmissionFactorService.getAll();

    response.json(factors);
  }
);

export const getEmissionFactorByActivity = onErrorHandledRequest(
  async (request, response) => {
    const { activityId } = validateInput(
      request.query,
      getEmissionFactorQueryInput
    );

    const factor = await EmissionFactorService.getByActivityId(activityId);

    response.json(factor);
  }
);

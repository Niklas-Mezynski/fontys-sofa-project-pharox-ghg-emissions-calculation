import { z } from "zod";
import { EmissionFactorService } from "../../logic/emission_factors/emission_factor_service";
import { onErrorHandledRequest } from "../../utils/errors";
import { parseZodError } from "../../utils/functions";

export const getEmissionFactors = onErrorHandledRequest(
  async (request, response) => {
    const factors = await EmissionFactorService.getAll();

    response.json(factors);
  }
);

const queryInputSchema = z.object({
  activityId: z.string().min(1),
});

export const getEmissionFactorByActivity = onErrorHandledRequest(
  async (request, response) => {
    const parseResult = queryInputSchema.safeParse(request.query);

    if (!parseResult.success) {
      throw parseZodError(parseResult.error.issues, "Invalid query input.");
    }

    const { activityId } = parseResult.data;

    const factor = await EmissionFactorService.getByActivityId(activityId);

    response.json(factor);
  }
);

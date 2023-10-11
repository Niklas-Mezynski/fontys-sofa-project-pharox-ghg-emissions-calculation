import { HttpStatusCode } from "axios";
import { onRequest } from "firebase-functions/v2/https";
import { z } from "zod";
import { EmissionFactorService } from "../../logic/emission_factors/emission_factor_service";
import { parseZodError } from "../../utils/functions";

export const getEmissionFactors = onRequest(async (request, response) => {
  const factors = await EmissionFactorService.getAll();

  response.json(factors);
});

const queryInputSchema = z.object({
  activityId: z.string().min(1),
});

export const getEmissionFactorByActivity = onRequest(
  async (request, response) => {
    const parseResult = queryInputSchema.safeParse(request.query);

    if (!parseResult.success) {
      response.status(HttpStatusCode.BadRequest).json({
        status: HttpStatusCode.BadRequest,
        message: parseZodError(parseResult.error.issues),
      });
      return;
    }

    const { activityId } = parseResult.data;

    const factor = await EmissionFactorService.getByActivityId(activityId);

    if (!factor) {
      response.status(HttpStatusCode.NotFound).json({
        status: HttpStatusCode.NotFound,
        message: `Emission factor for activity ${activityId} not found.`,
      });
      return;
    }

    response.json(factor);
  }
);

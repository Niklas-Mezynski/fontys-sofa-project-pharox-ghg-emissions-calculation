import { HttpStatusCode } from "axios";
import { onRequest } from "firebase-functions/v2/https";
import { z } from "zod";
import { db } from "..";

export const getEmissionFactors = onRequest(async (request, response) => {
  const factors = await db.collection("emission_factors").get();

  response.json(factors.docs.map((doc) => doc.data()));
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

    const factor = await db
      .collection("emission_factors")
      .doc(activityId)
      .get();

    if (!factor.exists) {
      response.status(HttpStatusCode.NotFound).json({
        status: HttpStatusCode.NotFound,
        message: `Emission factor for activity ${activityId} not found.`,
      });
      return;
    }

    response.json(factor.data());
  }
);

function parseZodError(issues: z.ZodIssue[]) {
  return issues.map((issue) => {
    return {
      inputField: issue.path.join("."),
      error: issue.message,
    };
  });
}

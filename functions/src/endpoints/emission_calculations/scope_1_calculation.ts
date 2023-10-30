import { HttpStatusCode } from "axios";
import { onRequest } from "firebase-functions/v2/https";
import { z } from "zod";
import { EmissionFactorService } from "../../logic/emission_factors/emission_factor_service";
import { parseZodError } from "../../utils/functions";

const queryInputSchema = z.object({
  usedFuel: z.coerce.number().min(1),
  activityId: z.coerce.string().min(1),
});

export const Scope1Calculation = onRequest(async (request, response) => {
  const parseResult = queryInputSchema.safeParse(request.query);

  if (!parseResult.success) {
    response.status(HttpStatusCode.BadRequest).json({
      status: HttpStatusCode.BadRequest,
      message: parseZodError(parseResult.error.issues),
    });
    return;
  }

  const { activityId } = parseResult.data;
  const { usedFuel } = parseResult.data;

  const activity = await EmissionFactorService.getByActivityId(activityId);

  const factor = activity?.factor;

  const postData = {
    usedFuel: usedFuel,
    emissionFactor: factor,
  };

  response.status(200).send(postData);
//   const result = SimpleCalculationService.simpleEmissionCalculation(postData);

//   response.status(200).send(result);
  /*
  const apiUrl = 'https://emissioncalculationsimple-u2tzkd7k6q-uc.a.run.app';

  const postData = {
    usedFuel: usedFuel,
    emissionFactor: factor
  };


  logger.info(
    "Provided Fuel: " +
      usedFuel +
      "\n Provided Activity ID: " +
      activityId
  );


  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
    .then((APIresponse) => APIresponse.json())
    .then((data) => {
      response.send(data)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
*/
});

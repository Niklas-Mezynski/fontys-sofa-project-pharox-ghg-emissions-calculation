import { onRequest } from "firebase-functions/v2/https";
import { ClimatiqService } from "../../logic/emission_factors/climatiq_service";

export const fetchClimatiq = onRequest(async (request, response) => {
  const data = await ClimatiqService.fetchClimatiqApi();

  response.json({
    status: "success",
    message: `Saved ${data.length} emission factors to the database.`,
  });
});

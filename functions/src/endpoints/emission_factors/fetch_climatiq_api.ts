import { ClimatiqService } from "../../logic/emission_factors/climatiq_service";
import { authenticate } from "../../utils/authentication";
import { onErrorHandledRequest } from "../../utils/errors";

export const fetchClimatiq = onErrorHandledRequest(
  async (request, response) => {
    authenticate(request.headers.authorization);
    
    const data = await ClimatiqService.fetchClimatiqApi();

    response.json({
      status: "success",
      message: `Saved ${data.length} emission factors to the database.`,
    });
  }
);

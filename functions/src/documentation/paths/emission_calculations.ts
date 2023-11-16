import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { freightEmissionCalculationInputSchema } from "../../models/emission_calculations/emission_calculation_model";

export const emissionCalculationOpenApiPaths: RouteConfig[] = [
  {
    method: "post",
    path: "/emissionCalculator",
    summary: "Calculate GHG emissions",
    description: "Cloud function to perform an emission calculation",
    tags: ["Emission calculations"],
    request: {
      body: {
        content: {
          "application/json": {
            schema: freightEmissionCalculationInputSchema,
          },
        },
        description: "The calculation input",
        required: true,
      },
    },
    responses: {
      "200": {
        description: "The emission calculation overview/report",
      },
    },
  },
];

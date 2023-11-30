import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { calculationReportSchema, freightEmissionCalculationInputSchema } from "../../models/emission_calculations/emission_calculation_model";
import { z } from "zod";

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
  {
    method: "post",
    path: "/emissionCalculatorBatch",
    summary: "Calculate batch GHG emissions",
    description: "Cloud function to perform batch emission calculations",
    tags: ["Emission calculations"],
    request: {
      body: {
        content: {
          "application/json": {
            schema: z.array(freightEmissionCalculationInputSchema),
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
  // EMISSION CALCULATION REPORTS
  {
    method: "get",
    path: "/getEmissionCalculationReportById",
    summary: "Fetch an emission calculation report by ID",
    description:
      "Function that fetch an emission calculation report which matches the given ID",
    tags: ["Emission calculation reports"],
    request: {
      params: z.object({
        id: z.string().uuid(),
      }),
    },
    responses: {
      "200": {
        description: "The found emission calculation report",
        content: {
          "application/json": {
            schema: calculationReportSchema,
          },
        },
      },
    },
  },
  {
    method: "get",
    path: "/getEmissionCalculationReports",
    summary: "Fetch all emission calculation reports",
    description:
      "Function that fetches all emission calculation reports in the Database",
    tags: ["Emission calculation reports"],
    responses: {
      "200": {
        description: "List of found emission calculation reports",
        content: {
          "application/json": {
            schema: z.array(calculationReportSchema),
          },
        },
      },
    },
  },
  {
    method: "patch",
    path: "/updateEmissionCalculationReport",
    summary: "Update an emission calculation report",
    description:
      "Function that updates an emission calculation report which matches the given ID",
    tags: ["Emission calculation reports"],
    request: {
      params: z.object({
        id: z.string().uuid(),
      }),
    },
    responses: {
      "200": {
        description: "The updated emission calculation report",
        content: {
          "application/json": {
            schema: calculationReportSchema,
          },
        },
      },
    },
  },
  {
    method: "delete",
    path: "/deleteEmissionCalculationReport",
    summary: "Delete an emission calculation report",
    description:
      "Function that deletes an emission calculation report which matches the given ID",
    tags: ["Emission calculation reports"],
    request: {
      params: z.object({
        id: z.string().uuid(),
      }),
    },
    responses: {
      "200": {
        description: "Emission calculation report deleted",
      },
    },
  },
];

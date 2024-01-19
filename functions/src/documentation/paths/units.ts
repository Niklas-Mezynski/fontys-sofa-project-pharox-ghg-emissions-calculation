import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import {
  allUnits,
  unitClassificationInputSchema,
  unitConverterInputSchema,
  unitTypes,
} from "../../models/units/units";

export const unitsOpenApiPaths: RouteConfig[] = [
  {
    method: "post",
    path: "/unitClassification",
    summary: "Classify the given unit",
    description:
      "Classify whether a unit is Weight, Distance, Volume or Electricity",
    tags: ["Units"],
    request: {
      body: {
        description: "The unit to classify",
        required: true,
        content: {
          "application/json": {
            schema: unitClassificationInputSchema,
          },
        },
      },
    },
    responses: {
      "200": {
        description: "The unit classification",
        content: {
          "application/json": {
            schema: z.object({
              unit: z.enum(unitTypes),
            }),
          },
        },
      },
    },
  },
  {
    method: "post",
    path: "/unitConverter",
    summary: "Convert a given unit to the desired one",
    description: "Convert a given unit to the desired one",
    tags: ["Units"],
    request: {
      body: {
        description: "The value and units to convert from and to",
        required: true,
        content: {
          "application/json": {
            schema: unitConverterInputSchema,
          },
        },
      },
    },
    responses: {
      "200": {
        description: "The converted units",
        content: {
          "application/json": {
            schema: z.object({
              value: z.number(),
              unit: z.enum(allUnits),
            }),
          },
        },
      },
    },
  },
];

import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import {
  fuelEmissionFactorSchema,
  fuelEmissionFactorSourceSchema,
  regionSchema,
} from "../../models/emission_factors/fuel_emission_factors";

export const emissionFactorsOpenApiPaths: RouteConfig[] = [
  {
    method: "post",
    path: "/addFuelEmissionFactor",
    summary: "Add a fuel emission factor",
    description: "Function that adds a fuel emission factors to the Database",
    tags: ["Emission factors"],
    requestBody: {
      description: "The fuel emission factor to add",
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "../../schemas/emission_factors/fuel_emission_factor.yaml",
          },
        },
      },
    },
    request: {
      body: {
        content: {
          "application/json": {
            schema: fuelEmissionFactorSchema,
          },
        },
        description: "The fuel emission factor to add",
        required: true,
      },
    },
    responses: {
      "200": {
        description: "The added fuel emission factors",
        content: {
          "application/json": {
            schema: fuelEmissionFactorSchema,
          },
        },
      },
    },
  },
  {
    method: "post",
    path: "/addFuelEmissionFactors",
    summary: "Add multiple fuel emission factors",
    description:
      "Function that adds multiple fuel emission factors to the Database",
    tags: ["Emission factors"],
    request: {
      body: {
        description: "List of fuel emission factors to add",
        required: true,
        content: {
          "application/json": {
            schema: z.array(fuelEmissionFactorSchema),
          },
        },
      },
    },
    responses: {
      "200": {
        description: "List of added fuel emission factors",
        content: {
          "application/json": {
            schema: z.array(fuelEmissionFactorSchema),
          },
        },
      },
    },
  },
  {
    method: "get",
    path: "/getFuelEmissionFactorByFuelCode",
    summary: "Fetch fuel emission factors using fuel code",
    description:
      "Function that fetches the fuel emission factors which matches the given fuel code",
    tags: ["Emission factors"],
    request: {
      params: z.object({
        code: z.string().openapi({
          example: "GASOLINE",
          description: "The fuel code to fetch the Fuel emission factors",
        }),
      }),
    },
    responses: {
      "200": {
        description: "List of found fuel emission factors",
        content: {
          "application/json": {
            schema: z.array(fuelEmissionFactorSchema),
          },
        },
      },
    },
  },
  {
    method: "get",
    path: "/getFuelEmissionFactorById",
    summary: "Fetch a fuel emission factor by ID",
    description:
      "Function that fetch a fuel emission factors which matches the given ID",
    tags: ["Emission factors"],
    request: {
      params: z.object({
        id: z.string().uuid(),
      }),
    },
    responses: {
      "200": {
        description: "The found fuel emission factor",
        content: {
          "application/json": {
            schema: fuelEmissionFactorSchema,
          },
        },
      },
    },
  },
  {
    method: "get",
    path: "/getFuelEmissionFactorByRegion",
    summary: "Fetch fuel emission factors by region",
    description:
      "Fetches the fuel emission factors which match the given region",
    tags: ["Emission factors"],
    request: {
      params: z.object({
        region: regionSchema,
      }),
    },
    responses: {
      "200": {
        description: "List of the found fuel emission factors",
        content: {
          "application/json": {
            schema: z.array(fuelEmissionFactorSchema),
          },
        },
      },
    },
  },
  {
    method: "get",
    path: "/getFuelEmissionFactorBySource",
    summary: "Fetch fuel emission factors by data source",
    description:
      "Function that fetches the fuel emission factors which matches the given data source",
    tags: ["Emission factors"],
    request: {
      params: z.object({
        source: fuelEmissionFactorSourceSchema,
      }),
    },
    responses: {
      "200": {
        description: "List of found fuel emission factors",
        content: {
          "application/json": {
            schema: z.array(fuelEmissionFactorSchema),
          },
        },
      },
    },
  },
  {
    method: "get",
    path: "/getFuelEmissionFactors",
    summary: "Fetch all fuel emission factors",
    description:
      "Function that fetches all fuel emission factors in the Database",
    tags: ["Emission factors"],
    responses: {
      "200": {
        description: "List of found fuel emission factors",
        content: {
          "application/json": {
            schema: z.array(fuelEmissionFactorSchema),
          },
        },
      },
    },
  },
];

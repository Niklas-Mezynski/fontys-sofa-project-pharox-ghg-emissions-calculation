import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { fuelEmissionFactorSchema } from "../../models/emission_factors/fuel_emission_factors";
import { regionSchema } from "../../models/emission_factors/common_emission_factor_models";
import { roadIntensityFactorSchema } from "../../models/emission_factors/road_intensity_factors";

export const emissionFactorsOpenApiPaths: RouteConfig[] = [
  // FUEL EMISSION FACTORS
  {
    method: "post",
    path: "/createFuelEmissionFactor",
    summary: "Create a fuel emission factor",
    description: "Function that adds a fuel emission factors to the Database",
    tags: ["Fuel Emission factors"],
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
    path: "/createFuelEmissionFactors",
    summary: "Create multiple fuel emission factors",
    description:
      "Function that adds multiple fuel emission factors to the Database",
    tags: ["Fuel Emission factors"],
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
    tags: ["Fuel Emission factors"],
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
    tags: ["Fuel Emission factors"],
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
    tags: ["Fuel Emission factors"],
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
    tags: ["Fuel Emission factors"],
    request: {
      params: z.object({
        source: fuelEmissionFactorSchema,
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
    tags: ["Fuel Emission factors"],
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
    method: "patch",
    path: "/updateFuelEmissionFactor",
    summary: "Update a fuel emission factor",
    description:
      "Function that updates a fuel emission factors which matches the given ID",
    tags: ["Fuel Emission factors"],
    request: {
      params: z.object({
        id: z.string().uuid(),
      }),
    },
    responses: {
      "200": {
        description: "The updated fuel emission factor",
        content: {
          "application/json": {
            schema: fuelEmissionFactorSchema,
          },
        },
      },
    },
  },
  {
    method: "delete",
    path: "/deleteFuelEmissionFactor",
    summary: "Delete a fuel emission factor",
    description:
      "Function that deletes a fuel emission factors which matches the given ID",
    tags: ["Fuel Emission factors"],
    request: {
      params: z.object({
        id: z.string().uuid(),
      }),
    },
    responses: {
    },
  },
  // ROAD INTENSITY EMISSION FACTORS
  {
    method: "post",
    path: "/createRoadEmissionIntensityFactor",
    summary: "Create a road intensity emission factor",
    description: "Function that adds a road intensity emission factors to the Database",
    tags: ["Intensity Emission factors"],
    requestBody: {
      description: "The road intensity emission factor to add",
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
            schema: roadIntensityFactorSchema,
          },
        },
        description: "The road intensity emission factor to add",
        required: true,
      },
    },
    responses: {
      "200": {
        description: "The added road intensity emission factor",
        content: {
          "application/json": {
            schema: roadIntensityFactorSchema,
          },
        },
      },
    },
  },
  {
    method: "post",
    path: "/createRoadEmissionIntensityFactors",
    summary: "Create multiple road intensity emission factors",
    description:
      "Function that adds multiple road intensity emission factors to the Database",
    tags: ["Intensity Emission factors"],
    request: {
      body: {
        description: "List of road intensity emission factors to add",
        required: true,
        content: {
          "application/json": {
            schema: z.array(roadIntensityFactorSchema),
          },
        },
      },
    },
    responses: {
      "200": {
        description: "List of added road intensity emission factors",
        content: {
          "application/json": {
            schema: z.array(roadIntensityFactorSchema),
          },
        },
      },
    },
  },
  {
    method: "get",
    path: "/getRoadEmissionIntensityFactorById",
    summary: "Fetch a road intensity emission factor by ID",
    description:
      "Function that fetch a road intensity emission factors which matches the given ID",
    tags: ["Intensity Emission factors"],
    request: {
      params: z.object({
        id: z.string().uuid(),
      }),
    },
    responses: {
      "200": {
        description: "The found road intensity emission factor",
        content: {
          "application/json": {
            schema: roadIntensityFactorSchema,
          },
        },
      },
    },
  },
  {
    method: "get",
    path: "/getRoadEmissionIntensityFactors",
    summary: "Fetch all road intensity emission factors",
    description:
      "Function that fetches all road intensity emission factors in the Database",
    tags: ["Intensity Emission factors"],
    responses: {
      "200": {
        description: "List of found road intensity emission factors",
        content: {
          "application/json": {
            schema: z.array(roadIntensityFactorSchema),
          },
        },
      },
    },
  },
  {
    method: "patch",
    path: "/updateRoadEmissionIntensityFactor",
    summary: "Update a road intensity emission factor",
    description:
      "Function that updates a road intensity emission factor which matches the given ID",
    tags: ["Intensity Emission factors"],
    request: {
      params: z.object({
        id: z.string().uuid(),
      }),
    },
    responses: {
      "200": {
        description: "The updated road intensity emission factor",
        content: {
          "application/json": {
            schema: roadIntensityFactorSchema,
          },
        },
      },
    },
  },
  {
    method: "delete",
    path: "/deleteRoadEmissionIntensityFactor",
    summary: "Delete a road intensity emission factor",
    description:
      "Function that deletes a road intensity emission factor which matches the given ID",
    tags: ["Intensity Emission factors"],
    request: {
      params: z.object({
        id: z.string().uuid(),
      }),
    },
    responses: {
    },
  },
];

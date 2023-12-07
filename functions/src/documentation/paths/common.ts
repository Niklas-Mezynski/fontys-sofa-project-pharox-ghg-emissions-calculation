import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { fuelSchema } from "../../models/emission_factors/fuel_emission_factors";
import { vehicleSchema } from "../../models/emission_factors/road_intensity_factors";

export const commonOpenApiPaths: RouteConfig[] = [
  // FUELS
  {
    method: "post",
    path: "/createFuel",
    summary: "Create a fuel",
    description: "Function that adds a fuel to the Database",
    tags: ["Common"],
    // requestBody: {
    //   description: "The fuel to add",
    //   required: true,
    //   content: {
    //     "application/json": {
    //       schema: fuelSchema,
    //     },
    //   },
    // },
    request: {
      body: {
        content: {
          "application/json": {
            schema: fuelSchema,
          },
        },
        description: "The fuel to add",
        required: true,
      },
    },
    responses: {
      "200": {
        description: "The added fuel",
        content: {
          "application/json": {
            schema: fuelSchema,
          },
        },
      },
    },
  },
  {
    method: "post",
    path: "/createFuels",
    summary: "Create multiple fuels",
    description:
      "Function that adds multiple fuels to the Database",
    tags: ["Common"],
    request: {
      body: {
        description: "List of fuels to add",
        required: true,
        content: {
          "application/json": {
            schema: z.array(fuelSchema),
          },
        },
      },
    },
    responses: {
      "200": {
        description: "List of added fuels",
        content: {
          "application/json": {
            schema: z.array(fuelSchema),
          },
        },
      },
    },
  },
  {
    method: "get",
    path: "/getFuelById",
    summary: "Fetch a fuel by ID",
    description:
      "Function that fetch a fuel which matches the given ID",
    tags: ["Common"],
    request: {
      params: z.object({
        id: z.string().uuid(),
      }),
    },
    responses: {
      "200": {
        description: "The found fuel",
        content: {
          "application/json": {
            schema: fuelSchema,
          },
        },
      },
    },
  },
  {
    method: "get",
    path: "/getFuels",
    summary: "Fetch all fuels",
    description:
      "Function that fetches all fuels in the Database",
    tags: ["Common"],
    responses: {
      "200": {
        description: "List of found fuels",
        content: {
          "application/json": {
            schema: z.array(fuelSchema),
          },
        },
      },
    },
  },
  {
    method: "patch",
    path: "/updateFuel",
    summary: "Update a fuel",
    description:
      "Function that updates a fuel which matches the given ID",
    tags: ["Common"],
    request: {
      params: z.object({
        id: z.string().uuid(),
      }),
    },
    responses: {
      "200": {
        description: "The updated fuel",
        content: {
          "application/json": {
            schema: fuelSchema,
          },
        },
      },
    },
  },
  {
    method: "delete",
    path: "/deleteFuel",
    summary: "Delete a fuel",
    description:
      "Function that deletes a fuel which matches the given ID",
    tags: ["Common"],
    request: {
      params: z.object({
        id: z.string().uuid(),
      }),
    },
    responses: {
      "200": {
        description: "Fuel deleted",
      },
    },
  },
  // FUELS
  {
    method: "post",
    path: "/createVehicle",
    summary: "Create a vehicle",
    description: "Function that adds a vehicle to the Database",
    tags: ["Common"],
    // requestBody: {
    //   description: "The vehicle to add",
    //   required: true,
    //   content: {
    //     "application/json": {
    //       schema: vehicleSchema,
    //     },
    //   },
    // },
    request: {
      body: {
        content: {
          "application/json": {
            schema: vehicleSchema,
          },
        },
        description: "The vehicle to add",
        required: true,
      },
    },
    responses: {
      "200": {
        description: "The added vehicle",
        content: {
          "application/json": {
            schema: vehicleSchema,
          },
        },
      },
    },
  },
  {
    method: "post",
    path: "/createVehicles",
    summary: "Create multiple vehicles",
    description:
      "Function that adds multiple vehicles to the Database",
    tags: ["Common"],
    request: {
      body: {
        description: "List of vehicles to add",
        required: true,
        content: {
          "application/json": {
            schema: z.array(vehicleSchema),
          },
        },
      },
    },
    responses: {
      "200": {
        description: "List of added vehicles",
        content: {
          "application/json": {
            schema: z.array(vehicleSchema),
          },
        },
      },
    },
  },
  {
    method: "get",
    path: "/getVehicleById",
    summary: "Fetch a vehicle by ID",
    description:
      "Function that fetch a vehicle which matches the given ID",
    tags: ["Common"],
    request: {
      params: z.object({
        id: z.string().uuid(),
      }),
    },
    responses: {
      "200": {
        description: "The found vehicle",
        content: {
          "application/json": {
            schema: vehicleSchema,
          },
        },
      },
    },
  },
  {
    method: "get",
    path: "/getVehicles",
    summary: "Fetch all vehicles",
    description:
      "Function that fetches all vehicles in the Database",
    tags: ["Common"],
    responses: {
      "200": {
        description: "List of found vehicles",
        content: {
          "application/json": {
            schema: z.array(vehicleSchema),
          },
        },
      },
    },
  },
  {
    method: "patch",
    path: "/updateVehicle",
    summary: "Update a vehicle",
    description:
      "Function that updates a vehicle which matches the given ID",
    tags: ["Common"],
    request: {
      params: z.object({
        id: z.string().uuid(),
      }),
    },
    responses: {
      "200": {
        description: "The updated vehicle",
        content: {
          "application/json": {
            schema: vehicleSchema,
          },
        },
      },
    },
  },
  {
    method: "delete",
    path: "/deleteVehicle",
    summary: "Delete a vehicle",
    description:
      "Function that deletes a vehicle which matches the given ID",
    tags: ["Common"],
    request: {
      params: z.object({
        id: z.string().uuid(),
      }),
    },
    responses: {
      "200": {
        description: "Vehicle deleted",
      },
    },
  },
];

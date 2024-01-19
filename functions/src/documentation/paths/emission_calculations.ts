import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import {
  calculationReportSchema,
  freightEmissionCalculationInputSchema,
} from "../../models/emission_calculations/emission_calculation_model";
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
        content: {
          "application/json": {
            schema: z.any(),
            example: {
              emissions: {
                co2e: {
                  value: 2044472.0910000002,
                  unit: "kg",
                },
                intensity: {
                  value: 0.6975512763584911,
                  unit: "kg/tkm",
                },
                activity: {
                  value: 112805524505,
                  unit: "tkm",
                },
                distance: {
                  value: 3695559.5999999996,
                  unit: "km",
                },
                breakdown: {
                  scope1: {
                    co2e: {
                      value: 0,
                      unit: "kg",
                    },
                    intensity: {
                      value: 0,
                      unit: "kg/tkm",
                    },
                  },
                  scope2: {
                    co2e: {
                      value: 0,
                      unit: "kg",
                    },
                    intensity: {
                      value: 0,
                      unit: "kg/tkm",
                    },
                  },
                  scope3: {
                    co2e: {
                      value: 0,
                      unit: "kg",
                    },
                    intensity: {
                      value: 0,
                      unit: "kg/tkm",
                    },
                  },
                  unknownScope: {
                    co2e: {
                      value: 2044472.0910000002,
                      unit: "kg",
                    },
                    intensity: {
                      value: 0.6975512763584911,
                      unit: "kg/tkm",
                    },
                  },
                  wtt: {
                    co2e: {
                      value: 401097.82,
                      unit: "kg",
                    },
                    intensity: {
                      value: 0.00010825366125270676,
                      unit: "kg/tkm",
                    },
                  },
                  ttw: {
                    co2e: {
                      value: 1641378.76,
                      unit: "kg",
                    },
                    intensity: {
                      value: 0.00044302269723836866,
                      unit: "kg/tkm",
                    },
                  },
                },
              },
              transportActivities: [
                {
                  input: {
                    distance: {
                      value: 286.3,
                      unit: "km",
                    },
                    weight: {
                      value: 10,
                      unit: "tonnes",
                    },
                    region: "EU",
                    transportDetails: {
                      modeOfTransport: "ROAD",
                      refrigerated: false,
                      vehicle: {
                        code: "VAN_LT_3.5_T",
                        weight: {
                          value: 3,
                          unit: "t",
                        },
                        engineType: "",
                      },
                      characteristics: {
                        loadFactor: null,
                        emptyRunning: null,
                        loadCharacteristic: null,
                        combinedLoadFactorEmptyRunning: null,
                      },
                      fuelCode: null,
                    },
                  },
                  emissionFactor: {
                    id: "8505f3d0-d962-4afd-8868-496413931510",
                    vehicle: {
                      code: "VAN_LT_3.5_T_GVW",
                      name: "Van <- 3.5 t GVW",
                      weight: {
                        lower: null,
                        upper: 3.5,
                        unit: "t",
                      },
                      engineType: null,
                    },
                    characteristics: null,
                    fuel: null,
                    fuelConsumption: null,
                    factor: {
                      unit: "KG_CO2E_PER_TKM",
                      wtt: null,
                      ttw: null,
                      wtw: 0.68,
                    },
                    region: "EU",
                    source: "GLEC",
                    refrigerated: false,
                  },
                  mode: "ROAD",
                  emissions: {
                    co2e: {
                      value: 1946.8400000000001,
                      unit: "kg",
                    },
                    intensity: {
                      value: 0.68,
                      unit: "kg/tkm",
                    },
                    activity: {
                      value: 2863,
                      unit: "tkm",
                    },
                    distance: {
                      value: 286.3,
                      unit: "km",
                    },
                    breakdown: {
                      wtt: {
                        co2e: {
                          value: 0,
                          unit: "kg",
                        },
                        intensity: {
                          value: 0,
                          unit: "kg/tkm",
                        },
                      },
                      ttw: {
                        co2e: {
                          value: 0,
                          unit: "kg",
                        },
                        intensity: {
                          value: 0,
                          unit: "kg/tkm",
                        },
                      },
                    },
                  },
                },
                {
                  input: {
                    distance: {
                      value: 286.3,
                      unit: "km",
                    },
                    weight: {
                      value: 10,
                      unit: "tonnes",
                    },
                    region: "EU",
                    transportDetails: {
                      modeOfTransport: "RAIL",
                      tractionType: null,
                      refrigerated: false,
                      characteristics: {
                        loadFactor: null,
                        emptyRunning: null,
                        loadCharacteristic: null,
                      },
                    },
                  },
                  emissionFactor: {
                    id: "07abc96a-a4fe-4963-aec7-0d677da6d576",
                    characteristics: {
                      loadFactor: null,
                      emptyRunning: null,
                      loadCharacteristic: null,
                    },
                    tractionType: null,
                    fuelConsumption: null,
                    factor: {
                      unit: "KG_CO2E_PER_TKM",
                      wtt: null,
                      ttw: null,
                      wtw: 0.017,
                    },
                    region: "EU",
                    source: "GLEC",
                    refrigerated: false,
                  },
                  mode: "RAIL",
                  emissions: {
                    co2e: {
                      value: 48.67100000000001,
                      unit: "kg",
                    },
                    intensity: {
                      value: 0.017,
                      unit: "kg/tkm",
                    },
                    activity: {
                      value: 2863,
                      unit: "tkm",
                    },
                    distance: {
                      value: 286.3,
                      unit: "km",
                    },
                    breakdown: {
                      wtt: {
                        co2e: {
                          value: 0,
                          unit: "kg",
                        },
                        intensity: {
                          value: 0,
                          unit: "kg/tkm",
                        },
                      },
                      ttw: {
                        co2e: {
                          value: 0,
                          unit: "kg",
                        },
                        intensity: {
                          value: 0,
                          unit: "kg/tkm",
                        },
                      },
                    },
                  },
                },
                {
                  input: {
                    distance: {
                      value: 845364,
                      unit: "km",
                    },
                    weight: {
                      value: 4366,
                      unit: "tonnes",
                    },
                    region: "EU",
                    transportDetails: {
                      consumedFuel: {
                        value: 85364,
                        unit: "l",
                      },
                      fuelCode: "GASOLINE_E5",
                    },
                  },
                  emissionFactor: {
                    id: "1b6ae714-020c-4814-bb5c-a0aa2174228f",
                    source: "GLEC",
                    fuel: {
                      code: "GASOLINE_E5",
                      name: "Gasoline, 5% bioethanol blend",
                    },
                    factors: [
                      {
                        unit: {
                          producedUnit: "kg",
                          producedProduct: "CO2e",
                          perUnit: "kg",
                        },
                        wtt: 0.66,
                        ttw: 3.08,
                        wtw: 3.74,
                      },
                      {
                        unit: {
                          producedUnit: "kg",
                          producedProduct: "CO2e",
                          perUnit: "l",
                        },
                        wtt: 0.5,
                        ttw: 2.3,
                        wtw: 2.8,
                      },
                    ],
                    region: "EU",
                  },
                  mode: "UNKNOWN - Primary data provided",
                  emissions: {
                    co2e: {
                      value: 239019.19999999998,
                      unit: "kg",
                    },
                    intensity: {
                      value: 0.0000647597715040892,
                      unit: "kg/tkm",
                    },
                    activity: {
                      value: 3690859224,
                      unit: "tkm",
                    },
                    distance: {
                      value: 845364,
                      unit: "km",
                    },
                    breakdown: {
                      wtt: {
                        co2e: {
                          value: 42682,
                          unit: "kg",
                        },
                        intensity: {
                          value: 0.000011564244911444501,
                          unit: "kg/tkm",
                        },
                      },
                      ttw: {
                        co2e: {
                          value: 196337.19999999998,
                          unit: "kg",
                        },
                        intensity: {
                          value: 0.0000531955265926447,
                          unit: "kg/tkm",
                        },
                      },
                    },
                  },
                },
                {
                  input: {
                    distance: {
                      value: 2161954,
                      unit: "km",
                    },
                    weight: {
                      value: 44975,
                      unit: "tonnes",
                    },
                    region: "EU",
                    transportDetails: {
                      consumedFuel: {
                        value: 374285,
                        unit: "l",
                      },
                      fuelCode: "DIESEL_B5",
                    },
                  },
                  emissionFactor: {
                    id: "a10b1e71-854e-481b-9b02-e9b7bbc568eb",
                    source: "GLEC",
                    fuel: {
                      code: "DIESEL_B5",
                      name: "Diesel, 5% biodiesel blend (B5)",
                    },
                    factors: [
                      {
                        unit: {
                          producedUnit: "kg",
                          producedProduct: "CO2e",
                          perUnit: "kg",
                        },
                        wtt: 0.76,
                        ttw: 3.04,
                        wtw: 3.8,
                      },
                      {
                        unit: {
                          producedUnit: "kg",
                          producedProduct: "CO2e",
                          perUnit: "l",
                        },
                        wtt: 0.63,
                        ttw: 2.54,
                        wtw: 3.17,
                      },
                    ],
                    region: "EU",
                  },
                  mode: "UNKNOWN - Primary data provided",
                  emissions: {
                    co2e: {
                      value: 1186483.45,
                      unit: "kg",
                    },
                    intensity: {
                      value: 0.00001220236645876189,
                      unit: "kg/tkm",
                    },
                    activity: {
                      value: 97233881150,
                      unit: "tkm",
                    },
                    distance: {
                      value: 2161954,
                      unit: "km",
                    },
                    breakdown: {
                      wtt: {
                        co2e: {
                          value: 235799.55,
                          unit: "kg",
                        },
                        intensity: {
                          value: 0.000002425075983917978,
                          unit: "kg/tkm",
                        },
                      },
                      ttw: {
                        co2e: {
                          value: 950683.9,
                          unit: "kg",
                        },
                        intensity: {
                          value: 0.000009777290474843912,
                          unit: "kg/tkm",
                        },
                      },
                    },
                  },
                },
                {
                  input: {
                    distance: {
                      value: 495827,
                      unit: "km",
                    },
                    weight: {
                      value: 21375,
                      unit: "tonnes",
                    },
                    region: "EU",
                    transportDetails: {
                      consumedFuel: {
                        value: 127257,
                        unit: "l",
                      },
                      fuelCode: "DIESEL_B5",
                    },
                  },
                  emissionFactor: {
                    id: "a10b1e71-854e-481b-9b02-e9b7bbc568eb",
                    source: "GLEC",
                    fuel: {
                      code: "DIESEL_B5",
                      name: "Diesel, 5% biodiesel blend (B5)",
                    },
                    factors: [
                      {
                        unit: {
                          producedUnit: "kg",
                          producedProduct: "CO2e",
                          perUnit: "kg",
                        },
                        wtt: 0.76,
                        ttw: 3.04,
                        wtw: 3.8,
                      },
                      {
                        unit: {
                          producedUnit: "kg",
                          producedProduct: "CO2e",
                          perUnit: "l",
                        },
                        wtt: 0.63,
                        ttw: 2.54,
                        wtw: 3.17,
                      },
                    ],
                    region: "EU",
                  },
                  mode: "UNKNOWN - Primary data provided",
                  emissions: {
                    co2e: {
                      value: 403404.69,
                      unit: "kg",
                    },
                    intensity: {
                      value: 0.00003806314306217233,
                      unit: "kg/tkm",
                    },
                    activity: {
                      value: 10598302125,
                      unit: "tkm",
                    },
                    distance: {
                      value: 495827,
                      unit: "km",
                    },
                    breakdown: {
                      wtt: {
                        co2e: {
                          value: 80171.91,
                          unit: "kg",
                        },
                        intensity: {
                          value: 0.000007564599409832356,
                          unit: "kg/tkm",
                        },
                      },
                      ttw: {
                        co2e: {
                          value: 323232.78,
                          unit: "kg",
                        },
                        intensity: {
                          value: 0.000030498543652339975,
                          unit: "kg/tkm",
                        },
                      },
                    },
                  },
                },
                {
                  input: {
                    distance: {
                      value: 174364,
                      unit: "km",
                    },
                    weight: {
                      value: 6865,
                      unit: "tonnes",
                    },
                    region: "EU",
                    transportDetails: {
                      consumedFuel: {
                        value: 59886,
                        unit: "l",
                      },
                      fuelCode: "DIESEL_B5",
                    },
                  },
                  emissionFactor: {
                    id: "a10b1e71-854e-481b-9b02-e9b7bbc568eb",
                    source: "GLEC",
                    fuel: {
                      code: "DIESEL_B5",
                      name: "Diesel, 5% biodiesel blend (B5)",
                    },
                    factors: [
                      {
                        unit: {
                          producedUnit: "kg",
                          producedProduct: "CO2e",
                          perUnit: "kg",
                        },
                        wtt: 0.76,
                        ttw: 3.04,
                        wtw: 3.8,
                      },
                      {
                        unit: {
                          producedUnit: "kg",
                          producedProduct: "CO2e",
                          perUnit: "l",
                        },
                        wtt: 0.63,
                        ttw: 2.54,
                        wtw: 3.17,
                      },
                    ],
                    region: "EU",
                  },
                  mode: "UNKNOWN - Primary data provided",
                  emissions: {
                    co2e: {
                      value: 189838.62,
                      unit: "kg",
                    },
                    intensity: {
                      value: 0.00015859416445756299,
                      unit: "kg/tkm",
                    },
                    activity: {
                      value: 1197008860,
                      unit: "tkm",
                    },
                    distance: {
                      value: 174364,
                      unit: "km",
                    },
                    breakdown: {
                      wtt: {
                        co2e: {
                          value: 37728.18,
                          unit: "kg",
                        },
                        intensity: {
                          value: 0.00003151871407200779,
                          unit: "kg/tkm",
                        },
                      },
                      ttw: {
                        co2e: {
                          value: 152110.44,
                          unit: "kg",
                        },
                        intensity: {
                          value: 0.0001270754503855552,
                          unit: "kg/tkm",
                        },
                      },
                    },
                  },
                },
                {
                  input: {
                    distance: {
                      value: 17478,
                      unit: "km",
                    },
                    weight: {
                      value: 4890,
                      unit: "tonnes",
                    },
                    region: "EU",
                    transportDetails: {
                      consumedFuel: {
                        value: 7486,
                        unit: "l",
                      },
                      fuelCode: "DIESEL_B5",
                    },
                  },
                  emissionFactor: {
                    id: "a10b1e71-854e-481b-9b02-e9b7bbc568eb",
                    source: "GLEC",
                    fuel: {
                      code: "DIESEL_B5",
                      name: "Diesel, 5% biodiesel blend (B5)",
                    },
                    factors: [
                      {
                        unit: {
                          producedUnit: "kg",
                          producedProduct: "CO2e",
                          perUnit: "kg",
                        },
                        wtt: 0.76,
                        ttw: 3.04,
                        wtw: 3.8,
                      },
                      {
                        unit: {
                          producedUnit: "kg",
                          producedProduct: "CO2e",
                          perUnit: "l",
                        },
                        wtt: 0.63,
                        ttw: 2.54,
                        wtw: 3.17,
                      },
                    ],
                    region: "EU",
                  },
                  mode: "UNKNOWN - Primary data provided",
                  emissions: {
                    co2e: {
                      value: 23730.62,
                      unit: "kg",
                    },
                    intensity: {
                      value: 0.00027765691300848906,
                      unit: "kg/tkm",
                    },
                    activity: {
                      value: 85467420,
                      unit: "tkm",
                    },
                    distance: {
                      value: 17478,
                      unit: "km",
                    },
                    breakdown: {
                      wtt: {
                        co2e: {
                          value: 4716.18,
                          unit: "kg",
                        },
                        intensity: {
                          value: 0.00005518102687550414,
                          unit: "kg/tkm",
                        },
                      },
                      ttw: {
                        co2e: {
                          value: 19014.44,
                          unit: "kg",
                        },
                        intensity: {
                          value: 0.00022247588613298492,
                          unit: "kg/tkm",
                        },
                      },
                    },
                  },
                },
              ],
              date: "2023-12-14T09:08:40.086Z",
            },
          },
        },
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

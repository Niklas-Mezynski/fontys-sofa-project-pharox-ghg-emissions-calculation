import { z } from "zod";
import { commonModels, transformUndefinedToNull } from "../common";
import {
  distanceUnits,
  electricityUnits,
  volumeUnits,
  weightUnits,
} from "../units/units";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { emissionFactorRegions } from "../emission_factors/common_emission_factor_models";
import { railTractionTypes } from "../emission_factors/rail_intensity_factors";

extendZodWithOpenApi(z);

const consumedFuelTransportDetails = z.object({
  consumedFuel: commonModels.valueWithUnitModel([
    ...volumeUnits,
    ...weightUnits,
    ...electricityUnits,
  ]),
  fuelCode: z.string().openapi({
    description: "A unique code for the fuel used",
  }),
});
export type ConsumedFuelTransportDetails = z.infer<
  typeof consumedFuelTransportDetails
>;

const roadTransportDetails = z.object({
  modeOfTransport: z.literal("ROAD"),
  refrigerated: z.boolean().optional().default(false),
  vehicle: z.object({
    code: z.string().nullable().optional(),
    weight: commonModels.valueWithUnitModel(weightUnits),
    engineType: z.string().optional().nullable(),
  }),
  characteristics: z.object({
    loadFactor: z.number().optional().nullable(),
    emptyRunning: z.number().nullable().optional(),
    loadCharacteristic: z.string().nullable().optional(),
    combinedLoadFactorEmptyRunning: z.number().nullable().optional(),
  }),
  fuelCode: z.string().nullable().optional(),
});
export type RoadTransportDetails = z.infer<typeof roadTransportDetails>;

const railTransportDetails = z.object({
  modeOfTransport: z.literal("RAIL"),
  tractionType: z
    .enum(railTractionTypes)
    .nullable()
    .optional()
    .transform(transformUndefinedToNull),
  refrigerated: z.boolean().optional().default(false),
  characteristics: z.object({
    loadFactor: z
      .number()
      .optional()
      .nullable()
      .transform(transformUndefinedToNull),
    emptyRunning: z
      .number()
      .nullable()
      .optional()
      .transform(transformUndefinedToNull),
    loadCharacteristic: z
      .string()
      .nullable()
      .optional()
      .transform(transformUndefinedToNull),
  }),
});
export type RailTransportDetails = z.infer<typeof railTransportDetails>;

export const freightEmissionCalculationInputSchema = z
  .object({
    /**
     * Any metadata that should be stored with the calculation
     */
    metadata: z.record(z.unknown()).optional().nullable(),
    date: z.string().optional().nullable(),
    transportParts: z
      .array(
        z.object({
          scope: commonModels.glecScopeModel.optional().nullable(),
          distance: commonModels.valueWithUnitModel(distanceUnits),
          weight: commonModels.valueWithUnitModel(weightUnits),
          region: z.enum(emissionFactorRegions),
          transportDetails: z.union([
            consumedFuelTransportDetails,
            roadTransportDetails,
            railTransportDetails,
          ]),
        })
      )
      .openapi({
        description:
          "The different transport activities to calculate emissions for. Each has their own fuel type, fuel consumption and freight details.",
      }),
  })
  .openapi({
    example: {
      transportParts: [
        {
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
        {
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
            characteristics: {
              loadFactor: null,
              emptyRunning: null,
              loadCharacteristic: null,
            },
            refrigerated: false,
          },
        },
        {
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
        {
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
        {
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
        {
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
        {
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
      ],
    },
  });

export type FreightEmissionCalculationInput = z.infer<
  typeof freightEmissionCalculationInputSchema
>;

const emissionReportBaseSchema = z.object({
  co2e: z.object({
    value: z.number(),
    unit: z.string(),
  }),
  intensity: z.object({
    value: z.number(),
    unit: z.string(),
  }),
  activity: z.object({
    value: z.number(),
    unit: z.string(),
  }),
  distance: z.object({
    value: z.number(),
    unit: z.string(),
  }),
  breakdown: z.object({
    wtt: z.object({
      co2e: z.object({
        value: z.number(),
        unit: z.string(),
      }),
      intensity: z.object({
        value: z.number(),
        unit: z.string(),
      }),
    }),
    ttw: z.object({
      co2e: z.object({
        value: z.number(),
        unit: z.string(),
      }),
      intensity: z.object({
        value: z.number(),
        unit: z.string(),
      }),
    }),
  }),
});

const transportActivityReportSchema = z.object({
  /**
   * The mode of transport used for the transport activity
   */
  mode: z.string(),
  /**
   * The user's input data used for the calculation
   */
  input: z.unknown(),
  /**
   * The scope of the transport activity (if provided)
   */
  scope: z.string().optional().nullable(),
  /**
   * Any assumptions made during the calculation
   */
  assumptions: z.string().optional().nullable(),
  /**
   * The emission factor from the DB used for the calculation
   */
  emissionFactor: z.unknown(),
  /**
   * The breakdown of all the emissions produced by the transport activity
   */
  emissions: emissionReportBaseSchema,
});

const totalEmissionReportSchema = z.intersection(
  emissionReportBaseSchema,
  z.object({
    breakdown: z.object({
      scope1: z.object({
        co2e: z.object({
          value: z.number(),
          unit: z.string(),
        }),
        intensity: z.object({
          value: z.number(),
          unit: z.string(),
        }),
      }),
      scope2: z.object({
        co2e: z.object({
          value: z.number(),
          unit: z.string(),
        }),
        intensity: z.object({
          value: z.number(),
          unit: z.string(),
        }),
      }),
      scope3: z.object({
        co2e: z.object({
          value: z.number(),
          unit: z.string(),
        }),
        intensity: z.object({
          value: z.number(),
          unit: z.string(),
        }),
      }),
      unknownScope: z.object({
        co2e: z.object({
          value: z.number(),
          unit: z.string(),
        }),
        intensity: z.object({
          value: z.number(),
          unit: z.string(),
        }),
      }),
    }),
  })
);

export const calculationReportSchema = z.object({
  id: z.string().optional().nullable(),
  metadata: z.record(z.unknown()).optional().nullable(),
  date: z.date(),
  emissions: totalEmissionReportSchema,
  transportActivities: z.array(transportActivityReportSchema),
});

export type EmissionReportBase = z.infer<typeof emissionReportBaseSchema>;

export type TotalEmissionReport = z.infer<typeof totalEmissionReportSchema>;

export type TransportActivityReport = z.infer<
  typeof transportActivityReportSchema
>;

export type CalculationReport = z.infer<typeof calculationReportSchema>;

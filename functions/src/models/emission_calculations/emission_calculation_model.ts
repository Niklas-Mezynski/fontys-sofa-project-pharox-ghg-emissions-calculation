import { z } from "zod";
import { commonModels } from "../common";
import {
  distanceUnits,
  electricityUnits,
  volumeUnits,
  weightUnits,
} from "../units/units";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { emissionFactorRegions } from "../emission_factors/common_emission_factor_models";

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
  refrigerated: z.boolean().default(false),
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

type ValueWithUnit = {
  value: number;
  unit: string;
};

export type EmissionReportBase = {
  co2e: ValueWithUnit;
  intensity: ValueWithUnit;
  activity: ValueWithUnit;
  distance: ValueWithUnit;
  breakdown: {
    wtt: {
      co2e: ValueWithUnit;
      intensity: ValueWithUnit;
    };
    ttw: {
      co2e: ValueWithUnit;
      intensity: ValueWithUnit;
    };
  };
};

export type TotalEmissionReport = EmissionReportBase & {
  breakdown: {
    scope1: {
      co2e: ValueWithUnit;
      intensity: ValueWithUnit;
    };
    scope2: {
      co2e: ValueWithUnit;
      intensity: ValueWithUnit;
    };
    scope3: {
      co2e: ValueWithUnit;
      intensity: ValueWithUnit;
    };
    unknownScope: {
      co2e: ValueWithUnit;
      intensity: ValueWithUnit;
    };
  };
};

export type TransportActivityReport = {
  /**
   * The mode of transport used for the transport activity
   */
  mode: string;
  /**
   * The user's input data used for the calculation
   */
  input: unknown;
  /**
   * The scope of the transport activity (if provided)
   */
  scope?: string;
  /**
   * Any assumptions made during the calculation
   */
  assumptions?: string;
  /**
   * The emission factor from the DB used for the calculation
   */
  emissionFactor: unknown;
  /**
   * The breakdown of all the emissions produced by the transport activity
   */
  emissions: EmissionReportBase;
};

export const calculationReportSchema = z.object({
  id: z.string().optional().nullable(),
  metadata: z.record(z.unknown()).optional().nullable(),
  date: z.date(),
  emissions: z.object({
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
  }),
  transportActivities: z.array(
    z.object({
      mode: z.string(),
      input: z.unknown(),
      scope: z.string().optional().nullable(),
      assumptions: z.string().optional().nullable(),
      emissionFactor: z.unknown(),
      emissions: z.object({
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
      }),
    })
  ),
});

export type CalculationReport = z.infer<typeof calculationReportSchema>;

// export type CalculationReport = {
//   id?: string;
//   metadata?: Record<string, unknown>;
//   date?: string;
//   emissions: TotalEmissionReport;
//   transportActivities: TransportActivityReport[];
// };



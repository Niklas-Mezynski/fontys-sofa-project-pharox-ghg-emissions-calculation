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
      metadata: {
        anything: "can go here",
      },
      transportParts: [
        {
          distance: {
            value: 100000,
            unit: "m",
          },
          weight: {
            value: 1000,
            unit: "kg",
          },
          region: "EU",
          transportDetails: {
            consumedFuel: {
              value: 100,
              unit: "kg",
            },
            fuelCode: "HEAVY_FUEL_OIL",
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
  mode: string;
  input: unknown;
  scope?: string;
  assumptions?: string;
  emissionFactor: unknown;
  emissions: EmissionReportBase;
};

export type CalculationReport = {
  metadata?: Record<string, unknown>;
  date?: string;
  emissions: TotalEmissionReport;
  transportActivities: TransportActivityReport[];
};

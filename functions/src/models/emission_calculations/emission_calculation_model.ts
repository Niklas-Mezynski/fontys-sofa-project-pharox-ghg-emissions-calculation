import { z } from "zod";
import { commonModels } from "../common";
import { emissionFactorRegions } from "../emission_factors/fuel_emission_factors";
import {
  distanceUnits,
  electricityUnits,
  volumeUnits,
  weightUnits,
} from "../units/units";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

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
    transportParts: z
      .array(
        z.object({
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

export type CalculationReport = {
  metadata?: Record<string, unknown>;
  transportActivities: {
    producedEmissions: {
      tankToWheel: number | null;
      wellToTank: number | null;
      wellToWheel: number | null;
    };
    emissionIntensity: {
      tkm: number;
      value: number;
      unit: string;
    };
    unit: string;
    usedEmissionFactor: unknown;
  }[];
  totalEmissions?: number;
};

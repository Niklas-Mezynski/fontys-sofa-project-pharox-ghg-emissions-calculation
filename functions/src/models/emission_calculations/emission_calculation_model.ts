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

// const roadFuelTypes = [
//   "DIESEL",
//   "PETROL",
//   "HYBRID",
//   "CNG",
//   "LPG",
//   "LNG",
//   "PLUGIN_HYBRID",
//   "ELECTRICITY",
//   "OTHER",
// ] as const;

// const railFuelTypes = ["DIESEL", "ELECTRICITY"] as const;

// TODO: Add all possible truck types for road transport
// const roadTruckTypes = ["TRUCK", "VAN"] as const;

// TODO: Add all possible ship types for inland water transport
// const inlandWaterVesselTypes = ["MOTOR_VESSEL", "TANKER_VESSEL"] as const;

// TODO: Add all possible ship types for inland water transport
// const oceanVesselTypes = ["GENERAL_CARGO"] as const;

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
          region: z.enum(emissionFactorRegions).default("EU"),
          transportDetails:
            // z.intersection(
            z.object({
              consumedFuel: commonModels.valueWithUnitModel([
                ...volumeUnits,
                ...weightUnits,
                ...electricityUnits,
              ]),
              fuelCode: z.string().openapi({
                description: "A unique code for the fuel used",
              }),
            }),
          // TODO: Maybe use discriminated union instead of normal Union (https://github.com/colinhacks/zod#discriminated-unions)
          // z.union([
          //   z.object({
          //     modeOfTransport: z.literal("ROAD"),
          //     truckType: z.enum(roadTruckTypes),
          //     fuelType: z.enum(roadFuelTypes),
          //   }),
          //   z.object({
          //     modeOfTransport: z.literal("RAIL"),
          //     fuelType: z.enum(railFuelTypes),
          //   }),
          //   z.object({
          //     modeOfTransport: z.literal("AIR"),
          //     aircraftModelId: z.string(),
          //   }),
          //   z.object({
          //     modeOfTransport: z.literal("INLAND_WATER"),
          //     vesselType: z.enum(inlandWaterVesselTypes),
          //   }),
          //   z.object({
          //     modeOfTransport: z.literal("OCEAN"),
          //     vesselType: z.enum(oceanVesselTypes),
          //     imoVesselNumber: z.number(),
          //   }),
          //   z.object({
          //     /**
          //      * The unique vehicle identifier. Minimum requirement to identify an emission factor.
          //      */
          //     vehicleIdentifier: z.string(), // TODO: Add validation for all possible vehicle identifiers
          //   }),
          // ])
          // ),
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

// function test(input: FreightEmissionCalculationInput) {
//   const vehicle = input.transportParts[0].transportDetails;

//   if ("modeOfTransport" in vehicle) {
//     vehicle.consumedFuel;
//     vehicle.consumedFuel.unit;
//     if (vehicle.modeOfTransport === "ROAD") {
//       vehicle.truckType;
//       vehicle.fuelType;
//     }
//     if (vehicle.modeOfTransport === "RAIL") {
//       vehicle.fuelType;
//     }
//     if (vehicle.modeOfTransport === "AIR") {
//       vehicle.aircraftModelId;
//     }
//     if (vehicle.modeOfTransport === "INLAND_WATER") {
//       vehicle.vesselType;
//     }
//     if (vehicle.modeOfTransport === "OCEAN") {
//       vehicle.vesselType;
//       vehicle.imoVesselNumber;
//     }
//   }
// }

import { z } from "zod";
import { commonModels } from "../common";

const roadFuelTypes = [
  "DIESEL",
  "PETROL",
  "HYBRID",
  "CNG",
  "LPG",
  "LNG",
  "PLUGIN_HYBRID",
  "ELECTRICITY",
  "OTHER",
] as const;

const railFuelTypes = ["DIESEL", "ELECTRICITY"] as const;

const roadTruckTypes = ["TRUCK", "VAN"] as const;

const inlandWaterVesselTypes = ["MOTOR_VESSEL", "TANKER_VESSEL"] as const;

const oceanVesselTypes = ["GENERAL_CARGO"] as const;

const freightEmissionCalculationInputSchema = z.object({
  transportParts: z.array(
    z.object({
      distance: commonModels.valueWithUnitModel(["km"]), // TODO: Add all possible units
      vehicle: z.union([
        z.object({
          modeOfTransport: z.literal("ROAD"),
          truckType: z.enum(roadTruckTypes), // TODO: Add all possible truck types for road transport
          fuelType: z.enum(roadFuelTypes),
        }),
        z.object({
          modeOfTransport: z.literal("RAIL"),
          fuelType: z.enum(railFuelTypes),
        }),
        z.object({
          modeOfTransport: z.literal("AIR"),
          aircraftModelId: z.string(),
        }),
        z.object({
          modeOfTransport: z.literal("INLAND_WATER"),
          vesselType: z.enum(inlandWaterVesselTypes), // TODO: Add all possible ship types for inland water transport
        }),
        z.object({
          modeOfTransport: z.literal("OCEAN"),
          vesselType: z.enum(oceanVesselTypes), // TODO: Add all possible ship types for inland water transport
          imoVesselNumber: z.number(),
        }),
        z.object({
          /**
           * The unique vehicle identifier. Minimum requirement to identify an emission factor.
           */
          vehicleIdentifier: z.string(), // TODO: Add validation for all possible vehicle identifiers
        }),
      ]),
    })
  ),
});

export type FreightEmissionCalculationInput = z.infer<
  typeof freightEmissionCalculationInputSchema
>;

// function test(input: FreightEmissionCalculationInput) {
//   const vehicle = input.transportParts[0].vehicle;

//   if ("modeOfTransport" in vehicle) {
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

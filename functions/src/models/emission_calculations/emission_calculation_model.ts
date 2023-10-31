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

// TODO: Add all possible truck types for road transport
const roadTruckTypes = ["TRUCK", "VAN"] as const;

// TODO: Add all possible ship types for inland water transport
const inlandWaterVesselTypes = ["MOTOR_VESSEL", "TANKER_VESSEL"] as const;

// TODO: Add all possible ship types for inland water transport
const oceanVesselTypes = ["GENERAL_CARGO"] as const;

const freightEmissionCalculationInputSchema = z.object({
  transportParts: z.array(
    z.object({
      distance: commonModels.valueWithUnitModel(["km", "m"]), // TODO: Add all possible units
      vehicle: z.intersection(
        z.object({
          consumedFuel: commonModels.valueWithUnitModel(["l", "kg"]), // TODO: Add all possible units
        }),
        z.union([
          z.object({
            modeOfTransport: z.literal("ROAD"),
            truckType: z.enum(roadTruckTypes),
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
            vesselType: z.enum(inlandWaterVesselTypes),
          }),
          z.object({
            modeOfTransport: z.literal("OCEAN"),
            vesselType: z.enum(oceanVesselTypes),
            imoVesselNumber: z.number(),
          }),
          z.object({
            /**
             * The unique vehicle identifier. Minimum requirement to identify an emission factor.
             */
            vehicleIdentifier: z.string(), // TODO: Add validation for all possible vehicle identifiers
          }),
        ])
      ),
    })
  ),
});

export type FreightEmissionCalculationInput = z.infer<
  typeof freightEmissionCalculationInputSchema
>;

// function test(input: FreightEmissionCalculationInput) {
//   const vehicle = input.transportParts[0].vehicle;

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

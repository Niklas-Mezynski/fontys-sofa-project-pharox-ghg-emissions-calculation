import { z } from "zod";
import { CheckStructureOfConst } from "../../utils/types";

export const unitClassificationInputSchema = z.object({
  unit: z.string(),
});

export const unitConverterInputSchema = z.object({
  originalUnitType: z.string(), // e.g. m
  targetUnitType: z.string(), // e.g. km
  value: z.number(), // e.g. 1000
});

/**
 * System allowed unit types
 */
export const unitTypes = [
  "DISTANCE",
  "WEIGHT",
  "VOLUME",
  "ELECTRICITY",
  "UNKNOWN",
] as const;
export type UnitType = (typeof unitTypes)[number];

export const volumeUnits = ["ml", "l", "tsp", "tbsp"] as const;
export type VolumeUnit = (typeof volumeUnits)[number];

export const weightUnits = ["g", "kg", "tonnes", "t", "oz", "lb"] as const;
export type WeightUnit = (typeof weightUnits)[number];

export const distanceUnits = ["km", "cm", "m", "in", "ft", "mi"] as const;
export type DistanceUnit = (typeof distanceUnits)[number];

export const electricityUnits = ["kWh"] as const;
export type ElectricityUnit = (typeof electricityUnits)[number];

export const allUnits = [
  ...volumeUnits,
  ...weightUnits,
  ...distanceUnits,
  ...electricityUnits,
] as const;

// Define your structure type
type UnitStructure = {
  [key in Exclude<UnitType, "UNKNOWN">]: {
    type: key;
    units: Unit;
    isOfType: (unit: string) => unit is Unit;
  };
};

/**
 * Units allowed divided by unit type
 */
const unitObject = {
  VOLUME: {
    type: "VOLUME",
    units: volumeUnits,
    isOfType: (unit: string): unit is VolumeUnit =>
      volumeUnits.includes(unit as VolumeUnit),
  },
  WEIGHT: {
    type: "WEIGHT",
    units: weightUnits,
    isOfType: (unit: string): unit is WeightUnit =>
      weightUnits.includes(unit as WeightUnit),
  },
  DISTANCE: {
    type: "DISTANCE",
    units: distanceUnits,
    isOfType: (unit: string): unit is DistanceUnit =>
      distanceUnits.includes(unit as DistanceUnit),
  },
  ELECTRICITY: {
    type: "ELECTRICITY",
    units: electricityUnits,
    isOfType: (unit: string): unit is ElectricityUnit =>
      electricityUnits.includes(unit as ElectricityUnit),
  },
} as const;

export const units: CheckStructureOfConst<typeof unitObject, UnitStructure> =
  unitObject;

export type Unit = (typeof units)[Exclude<
  UnitType,
  "UNKNOWN"
>]["units"][number];

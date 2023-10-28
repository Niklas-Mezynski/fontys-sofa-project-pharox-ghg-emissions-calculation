/**
 * System allowed unit types
 */
export const unitTypes = ["DISTANCE", "WEIGHT", "VOLUME", "UNKNOWN"] as const;
export type UnitType = (typeof unitTypes)[number];

/**
 * Units allowed divided by unit type
 */
export const units = [
  {unitType: "VOLUME" as UnitType, units: ["ml", "l", "tsp", "tbsp"] as const},
  {unitType: "WEIGHT" as UnitType, units: ["g", "kg", "oz", "lb"] as const},
  {unitType: "DISTANCE" as UnitType, units: ["km", "cm", "m", "in", "ft", "mi"] as const},
];
export type Units = (typeof units)[number];
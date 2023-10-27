/**
 * Units supported in the system
 */
export const supportedUnits = [
  "km",
  "mi",
  "cm",
  "m",
  "g",
  "kg",
  "lb",
  "ml",
  "l",
] as const;
export type SupportedUnits = (typeof supportedUnits)[number];

/**
 * System allowed unit types
 */
export const unitTypes = ["DISTANCE", "WEIGHT", "VOLUME", "UNKNOWN"] as const;
export type UnitType = (typeof unitTypes)[number];

/**
 * Units allowed divided be unit type
 */
export const units = [
  {unitType: "VOLUME" as UnitType, units: ["ml", "l", "tsp", "tbsp"] as const},
  {unitType: "WEIGHT" as UnitType, units: ["g", "kg", "oz", "lb"] as const},
  {unitType: "DISTANCE" as UnitType, units: ["km", "cm", "m", "in", "ft"] as const},
];
export type Units = (typeof units)[number];
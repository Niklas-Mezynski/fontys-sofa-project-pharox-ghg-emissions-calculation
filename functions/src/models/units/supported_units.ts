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
export type Unit = (typeof supportedUnits)[number];

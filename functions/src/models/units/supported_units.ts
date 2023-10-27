// export enum supportedUnits {
//   // Distance
//   KM = "km",
//   MI = "mi",
//   CM = "cm",
//   M = "m",
//   // Weight
//   G = "g",
//   KG = "kg",
//   LB = "lb",
//   // Volumes
//   ML = "ml",
//   L = "l",
// }

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

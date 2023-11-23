import { z } from "zod";

export const emissionFactorRegions = [
  "EU",
  "NA",
  "AF",
  "AS",
  "SA",
  "OC",
  "AN",
  "INTERNATIONAL",
] as const;
export const regionSchema = z.enum(emissionFactorRegions).default("EU");

export const emissionFactorSourceSchema = z
  .enum(["CUSTOM", "GLEC"])
  .default("GLEC");

/**
 * Creates a zod schema for the factors of a emission factor using the allowed units.
 */
export function baseFactorSchema<
  U extends string,
  T extends Readonly<[U, ...U[]]>,
>(allowedFactorUnits: T) {
  return z.object({
    unit: z.enum(allowedFactorUnits),
    wtt: z.number().nullable(),
    ttw: z.number().nullable(),
    wtw: z.number().nullable(),
  });
}

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

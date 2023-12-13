import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import {
  baseFactorSchema,
  emissionFactorSourceSchema,
  fuelConsumptionSchema,
  glecIntensityFactorUnits,
  regionSchema,
} from "./common_emission_factor_models";

extendZodWithOpenApi(z);

export const characteristicsSchema = z.object({
  loadFactor: z.number().nullable(),
  emptyRunning: z.number().nullable(),
  loadCharacteristic: z.string().nullable(),
});

export const railTractionTypes = ["DIESEL", "ELECTRIC"] as const;

export const railIntensityFactorSchema = z.object({
  id: z.string().uuid().optional(),
  characteristics: characteristicsSchema.nullable(),
  tractionType: z.enum(railTractionTypes).nullable(),
  fuelConsumption: fuelConsumptionSchema.nullable(),
  factor: baseFactorSchema(glecIntensityFactorUnits).nullable(),
  region: regionSchema,
  source: emissionFactorSourceSchema,
  refrigerated: z.boolean().default(false),
});
export type RailIntensityFactor = z.infer<typeof railIntensityFactorSchema>;

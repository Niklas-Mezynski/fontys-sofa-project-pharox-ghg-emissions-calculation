import { z } from "zod";
import { weightUnits } from "../units/units";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { commonModels } from "../common";
import {
  baseFactorSchema,
  emissionFactorSourceSchema,
  regionSchema,
} from "./common_emission_factor_models";

extendZodWithOpenApi(z);

export const vehicleSchema = z.object({
  code: z.string(),
  name: z.string(),
  weight: z
    .object({
      lower: z.number().nullable(),
      upper: z.number().nullable(),
      unit: z.enum(weightUnits),
    })
    .nullable(),
  engineType: z.string().nullable(),
});

export const characteristicsSchema = z.object({
  loadFactor: z.number().nullable(),
  emptyRunning: z.number().nullable(),
  loadCharacteristic: z.string().nullable(),
  combinedLoadFactorEmptyRunning: z.number().nullable(),
});

const fuelSchema = z.object({
  name: z.string(),
  code: z.string(),
});

export const glecIntensityFuelConsumptionUnits = [
  "KWH_PER_TKM",
  "KG_PER_TKM",
  "L_PER_TKM",
] as const;

export const fuelConsumptionSchema = z.array(
  commonModels.valueWithUnitModel(glecIntensityFuelConsumptionUnits)
);

export const glecIntensityFactorUnits = ["G_CO2E_PER_TKM", "KG_CO2E_PER_TKM"] as const;

export const roadIntensityFactorSchema = z.object({
  id: z.string().uuid().optional(),
  vehicle: vehicleSchema.nullable(),
  characteristics: characteristicsSchema.nullable(),
  fuel: fuelSchema.nullable(),
  fuelConsumption: fuelConsumptionSchema.nullable(),
  factor: baseFactorSchema(glecIntensityFactorUnits).nullable(),
  region: regionSchema,
  source: emissionFactorSourceSchema,
  refrigerated: z.boolean().default(false),
});
export type RoadIntensityFactor = z.infer<typeof roadIntensityFactorSchema>;

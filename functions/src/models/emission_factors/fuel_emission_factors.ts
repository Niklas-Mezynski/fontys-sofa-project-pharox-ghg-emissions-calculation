import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import {
  emissionFactorSourceSchema,
  regionSchema,
} from "./common_emission_factor_models";

extendZodWithOpenApi(z);

/** FUEL EMISSION FACTOR MODELS */

/**
 * Fuel model
 */
export const fuelSchema = z.object({
  code: z.string(),
  name: z.string().optional(),
});
export type Fuel = z.infer<typeof fuelSchema>;

export const glecFuelFactorUnits = [
  "KG_CO2E_PER_KWH",
  "KG_CO2E_PER_KG",
  "KG_CO2E_PER_L",
] as const;
/**
 * Define the different fuel factors to be able to calculate emissions
 */
export const fuelFactorSchema = z.object({
  unit: z.enum(glecFuelFactorUnits),
  factor: z.object({
    wtt: z.number().nullable(),
    ttw: z.number().nullable(),
    wtw: z.number().nullable(),
  }),
});
export type FuelFactor = z.infer<typeof fuelFactorSchema>;

/**
 * The fuel emission factor model containin the info to perform emission calculations
 */
export const fuelEmissionFactorSchema = z.object({
  id: z.string().uuid().optional(),
  source: emissionFactorSourceSchema,
  fuel: fuelSchema,
  factors: z.array(fuelFactorSchema).nonempty(),
  region: regionSchema, // EU, NA, AF, AS, SA, OC, AN - continent codes
});
export type FuelEmissionFactor = z.infer<typeof fuelEmissionFactorSchema>;

/** INTENSITY EMISSION FACTOR MODELS */

// TODO: define the model
export const intensityEmissionFactorSchema = z.object({
  id: z.string().uuid(),
  source: z.enum(["CUSTOM", "GLEC", "ISO"]).default("GLEC"),
  freightType: z
    .enum(["AIR", "RAIL", "ROAD", "OCEAN", "INLAND_WATERWAY"])
    .default("ROAD"),
  vehicleType: z.string(),
});
export type IntensityEmissionFactor = z.infer<
  typeof intensityEmissionFactorSchema
>;

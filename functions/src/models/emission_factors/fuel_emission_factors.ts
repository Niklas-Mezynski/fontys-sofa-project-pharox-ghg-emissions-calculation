import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import {
  baseFactorSchema,
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

// TODO: Refactpr this to also use the baseFactorSchema format
/**
 * Define the different fuel factors to be able to calculate emissions
 */
export const fuelFactorSchema = baseFactorSchema(glecFuelFactorUnits);
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

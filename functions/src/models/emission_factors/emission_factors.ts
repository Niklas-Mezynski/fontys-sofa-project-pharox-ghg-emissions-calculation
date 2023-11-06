import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

/**
 * Emission factor input needed to find the right emission factor.
 */
export const emissionFactorInput = z.union([
  z.object({
    activityId: z.string(),
  }),
  z.object({
    activityType: z.string(),
    vehicleType: z.string(),
    fuelType: z.string(),
  }),
]);

/**
 * Calculation data input needed to calculate the emissions.
 */
export const calculationDataInput = z.object({
  resourceAmount: z.number().positive(),
  unit: z.string(),
});

/** FUEL EMISSION FACTOR MODELS */

/**
 * Fuel model
 */
export const fuelSchema = z.object({
  code: z.string(),
  description: z.string().optional(),
});
export type Fuel = z.infer<typeof fuelSchema>;

/**
 * Define the different fuel factors to be able to calculate emissions
 */
export const fuelFactorSchema = z.object({
  unit: z.enum(["KG_CO2E_PER_KWH", "KG_CO2E_PER_KG", "KG_CO2E_PER_L"]),
  factor: z.object({
    WTT: z.number().nullable(),
    TTW: z.number().nullable(),
    WTW: z.number().nullable(),
  }),
});
export type FuelFactor = z.infer<typeof fuelFactorSchema>;

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

export const fuelEmissionFactorSourceSchema = z
  .enum(["CUSTOM", "GLEC"])
  .default("GLEC");
/**
 * The fuel emission factor model containin the info to perform emission calculations
 */
export const fuelEmissionFactorSchema = z.object({
  id: z.string().uuid().optional(),
  source: fuelEmissionFactorSourceSchema,
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

import { z } from "zod";

/**
 * Schema of an emission factor as saved in the database and used throughout the API.
 */
export const emissionFactorSchema = z.object({
  activityId: z.string(),
  id: z.string(),
  name: z.string(),
  category: z.string(),
  sector: z.string(),
  source: z.string(),
  sourceLink: z.string(),
  sourceDataset: z.string(),
  year: z.number(),
  yearReleased: z.number(),
  region: z.string(),
  regionName: z.string(),
  description: z.string(),
  unitType: z.string(),
  unit: z.string(),
  sourceLcaActivity: z.string(),
  dataQualityFlags: z.array(z.string()), // Adjust the type as needed
  accessType: z.enum(["public", "private"]),
  supportedCalculationMethods: z.array(z.string()),
  factor: z.number(),
  factorCalculationMethod: z.string(),
  factorCalculationOrigin: z.string(),
  constituentGases: z.object({
    co2eTotal: z.number().nullable(),
    co2eOther: z.number().nullable(),
    co2: z.number().nullable(),
    ch4: z.number().nullable(),
    n2o: z.number().nullable(),
  }),
});
export type EmissionFactor = z.infer<typeof emissionFactorSchema>;

/**
 * Schema of an emission factor as returned by the Climatiq API.
 */
export const climatiqEmissionFactorSchema = z.object({
  activity_id: z.string(),
  id: z.string(),
  name: z.string(),
  category: z.string(),
  sector: z.string(),
  source: z.string(),
  source_link: z.string(),
  source_dataset: z.string(),
  year: z.number(),
  year_released: z.number(),
  region: z.string(),
  region_name: z.string(),
  description: z.string(),
  unit_type: z.string(),
  unit: z.string(),
  source_lca_activity: z.string(),
  data_quality_flags: z.array(z.string()), // Adjust the type as needed
  access_type: z.enum(["public", "private"]),
  supported_calculation_methods: z.array(z.string()),
  factor: z.number(),
  factor_calculation_method: z.string(),
  factor_calculation_origin: z.string(),
  constituent_gases: z.object({
    co2e_total: z.number().nullable(),
    co2e_other: z.number().nullable(),
    co2: z.number().nullable(),
    ch4: z.number().nullable(),
    n2o: z.number().nullable(),
  }),
});
export type ClimatiqEmissionFactor = z.infer<
  typeof climatiqEmissionFactorSchema
>;

/**
 * Schema of an array of emission factors as returned by the Climatiq API.
 */
export const climatiqEmissionFactorResponseSchema = z.array(
  climatiqEmissionFactorSchema
);
export type ClimatiqEmissionFactorResponse = z.infer<
  typeof climatiqEmissionFactorResponseSchema
>;

/**
 * Schema of the input for the getEmissionFactorByActivityId endpoint.
 */
export const getEmissionFactorQueryInput = z.object({
  activityId: z.string().min(1),
});

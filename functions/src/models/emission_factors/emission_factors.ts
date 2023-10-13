import { z } from "zod";

const constituentGasesSchema = z.object({
  co2e_total: z.number().nullable(),
  co2e_other: z.number().nullable(),
  co2: z.number().nullable(),
  ch4: z.number().nullable(),
  n2o: z.number().nullable(),
});

export const climatiqEmissionFactorResponseSchema = z.array(
  z.object({
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
    constituent_gases: constituentGasesSchema,
  })
);

export type ClimatiqEmissionFactorResponse = z.infer<
  typeof climatiqEmissionFactorResponseSchema
>;

export const getEmissionFactorQueryInput = z.object({
  activityId: z.string().min(1),
});

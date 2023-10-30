import { z } from "zod";

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

/**
 * Emission calculator input needed to calculate the emissions.
 */
export const emissionCalculatorInput = z.object({
  emissionDetails: emissionFactorInput,
  calculationDetails: calculationDataInput,
});
export type EmissionCalculatorInput = z.infer<typeof emissionCalculatorInput>;

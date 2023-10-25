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

export type EmissionFactorInput = z.infer<typeof emissionFactorInput>;

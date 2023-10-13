import { z } from "zod";

export const simpleEmissionCalculationInput = z.object({
  usedFuel: z.number().min(0),
  emissionFactor: z.number().min(0),
});

export type SimpleEmissionCalculationInput = z.infer<
  typeof simpleEmissionCalculationInput
>;

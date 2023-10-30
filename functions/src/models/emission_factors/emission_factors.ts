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

export const fuel = z.object({
  code: z.string(),
  name: z.string(),
  description: z.string(),
});
export type Fuel = z.infer<typeof fuel>;

export const fuelFactor = z.object({
  unit: z.enum(["KG_CO2E_PER_KWH", "KG_CO2E_PER_KG", "KG_CO2E_PER_L"]),
  factor: z.object({
    WTT: z.number().lte(1).gte(0),
    TTW: z.number().lte(1).gte(0),
    WTW: z.number().lte(1).gte(0),
  }),
});
export type FuelFactor = z.infer<typeof fuelFactor>;

export const fuelEmissionFactor = z.object({
  id: z.string().uuid(),
  source: z.enum(["CUSTOM", "GLEC", "ISO"]).default("GLEC"),
  fuel: z.custom<Fuel>(),
  factors: z.array<FuelFactor>(),
});
export type FuelEmissionFactor = z.infer<typeof fuelEmissionFactor>;

export const intensityEmissionFactor = z.object({

});
export type IntensityEmissionFactor = z.infer<typeof intensityEmissionFactor>;
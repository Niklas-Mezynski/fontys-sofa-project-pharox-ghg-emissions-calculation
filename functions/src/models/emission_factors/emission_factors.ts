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

/**
 * Fuel model
 */
export const fuel = z.object({
  code: z.string(),
  name: z.string(),
  description: z.string().optional(),
});
export type Fuel = z.infer<typeof fuel>;

/**
 * Define the different fuel factors to be able to calculate emissions
 */
export const fuelFactor = z.object({
  unit: z.enum(["KG_CO2E_PER_KWH", "KG_CO2E_PER_KG", "KG_CO2E_PER_L"]),
  factor: z.object({
    WTT: z.number().lte(1).gte(0),
    TTW: z.number().lte(1).gte(0),
    WTW: z.number().lte(1).gte(0),
  }),
});
export type FuelFactor = z.infer<typeof fuelFactor>;

/**
 * The fuel emission factor model containin the info to perform emission calculations
 */
export const fuelEmissionFactor = z.object({
  id: z.string().uuid(),
  source: z.enum(["CUSTOM", "GLEC", "ISO"]).default("GLEC"),
  fuel: z.custom<Fuel>(),
  factors: z.custom<FuelFactor>().array().nonempty(),
  region: z.enum(["EU", "NA", "AF", "AS", "SA", "OC", "AN", "INTERNATIONAL"]).default("EU"), // EU, NA, AF, AS, SA, OC, AN - continent codes
});
export type FuelEmissionFactor = z.infer<typeof fuelEmissionFactor>;

// TODO: define the model
export const intensityEmissionFactor = z.object({
  id: z.string().uuid(),
  source: z.enum(["CUSTOM", "GLEC", "ISO"]).default("GLEC"),
  freightType: z.enum(["AIR", "RAIL", "ROAD", "OCEAN", "INLAND_WATERWAY"]),
  vehicleType: z.string(),

});
export type IntensityEmissionFactor = z.infer<typeof intensityEmissionFactor>;
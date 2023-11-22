import { z } from "zod";
import { roadIntensityFactorSchema } from "../emission_factors/road_intensity_factors";

export const updateRoadEmissionIntensityFactorSchema =
  roadIntensityFactorSchema.extend({ identifier: z.string() });

export const removeRoadEmissionIntensityFactorSchema = z.object({
  identifier: z.string(),
});

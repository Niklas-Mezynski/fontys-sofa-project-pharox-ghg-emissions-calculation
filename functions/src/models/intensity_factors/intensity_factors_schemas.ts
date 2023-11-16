import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { roadIntensityFactorSchema } from "../emission_factors/road_intensity_factors";

export const updateRoadEmissionIntensityFactorSchema =
  roadIntensityFactorSchema.extend({ identifier: z.string() });

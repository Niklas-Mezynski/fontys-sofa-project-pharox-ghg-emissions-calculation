import { z } from "zod";

const valueWithUnitModel = (allowedUnits: readonly [string, ...string[]]) =>
  z.object({
    value: z.number(),
    unit: z.enum(allowedUnits),
  });

export const commonModels = {
  valueWithUnitModel,
};

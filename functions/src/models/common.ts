import { z } from "zod";

function valueWithUnitModel<U extends string, T extends Readonly<[U, ...U[]]>>(
  allowedUnits: T
) {
  return z.object({
    value: z.number(),
    unit: z.enum(allowedUnits),
  });
}

export const commonModels = {
  valueWithUnitModel,
};

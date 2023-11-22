import { z } from "zod";

/**
 * Creates a zod schema for a value with a unit.
 * @param allowedUnits The allowed units for the value, must be a const array of strings.
 */
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

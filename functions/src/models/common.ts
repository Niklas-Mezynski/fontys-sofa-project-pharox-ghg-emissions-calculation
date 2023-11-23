import { type } from "os";
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

const glecScopeModel = z.enum(["SCOPE1", "SCOPE2", "SCOPE3"]);
export type GLECScope = z.infer<typeof glecScopeModel>;

export const commonModels = {
  valueWithUnitModel,
  glecScopeModel,
};

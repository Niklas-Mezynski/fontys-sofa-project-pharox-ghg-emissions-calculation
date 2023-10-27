import { unitType } from "../../models/units/unit_types";

const volumeUnits = ["ml", "l", "tsp", "tbsp"] as const;
const weightUnits = ["g", "kg", "oz", "lb"] as const;
const distanceUnits = ["km", "cm", "m", "in", "ft"] as const;

/**
 * Determine whether a unit is a Distance, Weight or Volume
 * @returns The type of unit
 */
export function classifyUnitType(unit: string): unitType {
  console.log("Classification of: " + unit + "  Starting...");

  if ((volumeUnits as readonly string[]).includes(unit)) {
    return unitType.Volume;
  }
  if ((weightUnits as readonly string[]).includes(unit)) {
    return unitType.Weight;
  }
  if ((distanceUnits as readonly string[]).includes(unit)) {
    return unitType.Distance;
  }

  return unitType.UNKNOWN;
}

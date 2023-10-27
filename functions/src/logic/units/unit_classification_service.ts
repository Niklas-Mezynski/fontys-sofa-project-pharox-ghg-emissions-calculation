import { UnitType } from "../../models/units/unit_types";

const volumeUnits = ["ml", "l", "tsp", "tbsp"] as const;
const weightUnits = ["g", "kg", "oz", "lb"] as const;
const distanceUnits = ["km", "cm", "m", "in", "ft"] as const;

/**
 * Determine whether a unit is a Distance, Weight or Volume
 * @returns The type of unit
 */
export function classifyUnitType(unit: string): UnitType {
  console.log("Classification of: " + unit + "  Starting...");

  if ((volumeUnits as readonly string[]).includes(unit)) {
    return "VOLUME";
  }
  if ((weightUnits as readonly string[]).includes(unit)) {
    return "WEIGHT";
  }
  if ((distanceUnits as readonly string[]).includes(unit)) {
    return "DISTANCE";
  }

  return "UNKNOWN";
}

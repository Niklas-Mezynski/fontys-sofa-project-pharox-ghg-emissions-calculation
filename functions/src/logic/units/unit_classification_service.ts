import { UnitType, units } from "../../models/units/units";

/**
 * Determine whether a unit is a Distance, Weight or Volume (Unknown if not known)
 * @param {string} unit - The unit to classify
 * @returns {UnitType} The unit type
 */
export function classifyUnitType(unit: string): UnitType {
  console.log("Classification of: " + unit + "  Starting...");

  for (const unitObject of units) {
    if ((unitObject.units as readonly string[]).includes(unit)) {
      return unitObject.unitType;
    }
  }

  return "UNKNOWN" as UnitType;
}

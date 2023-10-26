import { classifyUnit } from "../../utils/units/unit_classifier";

/**
 * Determine whether a unit is a Distance, Weight or Volume
 * @returns The type of unit
 */
function ClassifyUnitType(unit: string) {
  return classifyUnit(unit);
}

/**
 * Converts unit from Imperial to Metric
 * @returns The unit in the Metric system
 */
function ConvertUnit() {
  return null;
}

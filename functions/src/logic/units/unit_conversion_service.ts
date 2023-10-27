import convert from "convert";
import { Unit, supportedUnits } from "../../models/units/supported_units";

/**
 * Converts supported units from one to another
 * @returns The unit in the Metric system
 */
function convertUnit(
  originalUnit: string,
  targetUnit: string,
  value: number
): number {
  return convert(value, originalUnit as never).to(targetUnit as never).quantity;
}

function verifyIfUnitIsSupporter(unit: string): boolean {
  return supportedUnits.includes(unit as Unit);
}

export const UnitConversionService = {
  convertUnit,
  verifyIfUnitIsSupporter,
};

import convert from "convert";
import { units } from "../../models/units/units";
import { HttpStatusCode } from "axios";
import { CustomError } from "../../utils/errors";

/**
 * Converts supported units from one to another
 * @param {string} originalUnit - The unit to convert from
 * @param {string} targetUnit - The unit to convert to
 * @param {string} value - The value that gets converted with the units
 * @returns {number} The unit in the Metric system
 */
function convertUnits(
  originalUnit: string,
  targetUnit: string,
  value: number
): number {
  if (originalUnit === targetUnit) {
    return value;
  }

  if (!UnitConversionService.verifyIfUnitIsSupported(originalUnit)) {
    throw new CustomError({
      status: HttpStatusCode.BadRequest,
      message: `Unit '${originalUnit}' is not supported. It cannot be converted to '${targetUnit}'`,
    });
  }

  if (!UnitConversionService.verifyIfUnitIsSupported(targetUnit)) {
    throw new CustomError({
      status: HttpStatusCode.BadRequest,
      message: `Unit '${targetUnit}' is not supported. It cannot be converted from '${originalUnit}'`,
    });
  }

  const result = convert(value, originalUnit as never).to(targetUnit as never);
  return result as never as number;
}

/**
 * Function to determine whether the given unit is supported
 * @param {string} unit - The unit to verify whether is supported
 * @returns {boolean} - Whether the given unit is supported
 */
function verifyIfUnitIsSupported(unit: string): boolean {
  for (const unitObject of units) {
    if ((unitObject.units as readonly string[]).includes(unit)) {
      return true;
    }
  }

  return false;
}

export const UnitConversionService = {
  convertUnits,
  verifyIfUnitIsSupported,
};

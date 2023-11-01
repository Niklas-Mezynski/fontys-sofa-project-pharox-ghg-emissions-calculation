import convert from "convert";
import { units } from "../../models/units/units";
import { HttpStatusCode } from "axios";
import convert from "convert";
import { units } from "../../models/units/units";
import { CustomError } from "../../utils/errors";

/**
 * Converts supported units from one to another
 * @param {string} originalUnit - The unit to convert from
 * @param {string} targetUnit - The unit to convert to
 * @param {string} value - The value that gets converted with the units
 * @returns {number} The unit in the Metric system
 */
function convertUnits(originalUnit: string, targetUnit: string, value: number) {
  if (
    units.VOLUME.isOfType(originalUnit) &&
    units.VOLUME.isOfType(targetUnit)
  ) {
    const conversionResult = convert(value, originalUnit).to(targetUnit);
    return {
      value: conversionResult,
      unit: targetUnit,
    };
  }

  if (
    units.WEIGHT.isOfType(originalUnit) &&
    units.WEIGHT.isOfType(targetUnit)
  ) {
    const conversionResult = convert(value, originalUnit).to(targetUnit);
    return {
      value: conversionResult,
      unit: targetUnit,
    };
  }

  if (
    units.DISTANCE.isOfType(originalUnit) &&
    units.DISTANCE.isOfType(targetUnit)
  ) {
    const conversionResult = convert(value, originalUnit).to(targetUnit);
    return {
      value: conversionResult,
      unit: targetUnit,
    };
  }

  if (
    units.ELECTRICITY.isOfType(originalUnit) &&
    units.ELECTRICITY.isOfType(targetUnit)
  ) {
    const conversionResult = convert(value, originalUnit).to(targetUnit);
    return {
      value: conversionResult,
      unit: targetUnit,
    };
  }

  throw new CustomError({
    status: HttpStatusCode.BadRequest,
    message: `Conversion from '${originalUnit}' to '${targetUnit}' is not supported`,
  });
}

export const UnitConversionService = {
  convertUnits,
};

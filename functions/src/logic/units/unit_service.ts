/**
 * Function that splits a composed unit into an array of units
 * @param {string} unit - The composed unit to split
 * @param {string} splitter - The string to split the unit by
 * @returns {string[]} - The splitted unit
 */
function splitComposedUnits(unit: string, splitter = "_CO2E_PER_"): string[]{
  return unit.split(splitter);
}

/**
 * Function that creates a composed unit from an array of units
 * @param {string} unit - The composed unit to split
 * @param {string} join - The string to join the splitted the units
 * @returns {string[]} - The splitted unit
 */
function createComposedUnits(units: string[], join = "_CO2E_PER_"): string{
  return units.join(join);
}

export const UnitService = {
  splitComposedUnits,
  createComposedUnits,
};

import { UnitConversionService } from "../../../src/logic/units/unit_conversion_service";
import { CustomError } from "../../../src/utils/errors";

describe("testing_unit_conversion", () => {
  test("The unit and value provided should return the coresponding value in desired units", () => {

    expect(UnitConversionService.convertUnits("km", "m", 1).value).toBe(1000);
    expect(UnitConversionService.convertUnits("kg", "g", 1).value).toBe(1000);
    expect(UnitConversionService.convertUnits("m", "ft", 1).value).toBeCloseTo(3.28);
    expect(UnitConversionService.convertUnits("ml", "l", 1000).value).toBe(1);
    expect(UnitConversionService.convertUnits("oz", "g", 1).value).toBeCloseTo(28.349);
    expect(UnitConversionService.convertUnits("mi", "km", 1).value).toBeCloseTo(1.609);
    expect(UnitConversionService.convertUnits("l", "l", 1).value).toBe(1);
    expect(UnitConversionService.convertUnits("kWh", "kWh", 1).value).toBe(1);
  });
});

describe("testing_unit_conversion_throws_an_error", () => {
  test("The unit conversion should throw an error due to units being of a different unit type", () => {

    expect(() => UnitConversionService.convertUnits("mi", "l", 1)).toThrow(CustomError);
    expect(() => UnitConversionService.convertUnits("kg", "l", 1)).toThrow(CustomError);
    expect(() => UnitConversionService.convertUnits("oz", "aaa", 1)).toThrow(CustomError);
    expect(() => UnitConversionService.convertUnits("l", "in", 1)).toThrow(CustomError);

  });
});

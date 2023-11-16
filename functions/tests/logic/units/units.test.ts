import { classifyUnitType } from "../../src/logic/units/unit_classification_service";
import { UnitConversionService } from "../../src/logic/units/unit_conversion_service";
import { CustomError } from "../../src/utils/errors";
//import { CustomError } from "../../src/utils/errors";

describe('testing_volume_unit_classification_service', () => {
    test('The unit provided should return the correct unit type', () => {
      
      expect(classifyUnitType("ml")).toBe("VOLUME");
      expect(classifyUnitType("l")).toBe("VOLUME");
      expect(classifyUnitType("tsp")).toBe("VOLUME");
      expect(classifyUnitType("tbsp")).toBe("VOLUME");
  
    });
  });
  
  describe('testing_weight_unit_classification_service', () => {
    test('The unit provided should return the correct unit type', () => {
      
      expect(classifyUnitType("g")).toBe("WEIGHT");
      expect(classifyUnitType("kg")).toBe("WEIGHT");
      expect(classifyUnitType("oz")).toBe("WEIGHT");
      expect(classifyUnitType("lb")).toBe("WEIGHT");
  
    });
  });
  
  describe('testing_distance_unit_classification_service', () => {
    test('The unit provided should return the correct unit type', () => {
      
      expect(classifyUnitType("km")).toBe("DISTANCE");
      expect(classifyUnitType("cm")).toBe("DISTANCE");
      expect(classifyUnitType("m")).toBe("DISTANCE");
      expect(classifyUnitType("in")).toBe("DISTANCE");
      expect(classifyUnitType("ft")).toBe("DISTANCE");
      expect(classifyUnitType("mi")).toBe("DISTANCE");
  
    });
  });
  
  describe('testing_unit_classification_service_Wrong_input', () => {
    test('The unit provided should return "UNKNOWN"', () => {
      
      expect(classifyUnitType("a")).toBe("UNKNOWN");
      expect(classifyUnitType("trtrt")).toBe("UNKNOWN");
      expect(classifyUnitType("1111")).toBe("UNKNOWN");
      expect(classifyUnitType("")).toBe("UNKNOWN");
  
    });
  });
  
  describe('testing_unit_conversion', () => {
    test('The unit and value provided should return the coresponding value in desired units', () => {
  
      expect(UnitConversionService.convertUnits("km", "m", 1).value).toBe(1000);
      expect(UnitConversionService.convertUnits("kg", "g", 1).value).toBe(1000);
      expect(UnitConversionService.convertUnits("m", "ft", 1).value).toBeCloseTo(3.28);
      expect(UnitConversionService.convertUnits("ml", "l", 1000).value).toBe(1);
      expect(UnitConversionService.convertUnits("oz", "g", 1).value).toBeCloseTo(28.349);
      expect(UnitConversionService.convertUnits("mi", "km", 1).value).toBeCloseTo(1.609); 
      expect(UnitConversionService.convertUnits("l", "l", 1).value).toBe(1);
    });
  });

  describe('testing_unit_conversion_throws_an_error', () => {
    test('The unit conversion should throw an error due to units being of a different unit type', () => {

      expect(() => UnitConversionService.convertUnits("mi", "l", 1)).toThrow(CustomError);
      expect(() => UnitConversionService.convertUnits("kg", "l", 1)).toThrow(CustomError);
      expect(() => UnitConversionService.convertUnits("oz", "aaa", 1)).toThrow(CustomError);
      expect(() => UnitConversionService.convertUnits("l", "in", 1)).toThrow(CustomError);
    
    });
  });
import { classifyUnitType } from "../../../src/logic/units/unit_classification_service";

describe("testing_volume_unit_classification_service", () => {
  test("The unit provided should return the correct unit type", () => {

    expect(classifyUnitType("ml")).toBe("VOLUME");
    expect(classifyUnitType("l")).toBe("VOLUME");
    expect(classifyUnitType("tsp")).toBe("VOLUME");
    expect(classifyUnitType("tbsp")).toBe("VOLUME");

  });
});

describe("testing_weight_unit_classification_service", () => {
  test("The unit provided should return the correct unit type", () => {

    expect(classifyUnitType("g")).toBe("WEIGHT");
    expect(classifyUnitType("kg")).toBe("WEIGHT");
    expect(classifyUnitType("oz")).toBe("WEIGHT");
    expect(classifyUnitType("lb")).toBe("WEIGHT");

  });
});

describe("testing_distance_unit_classification_service", () => {
  test("The unit provided should return the correct unit type", () => {

    expect(classifyUnitType("km")).toBe("DISTANCE");
    expect(classifyUnitType("cm")).toBe("DISTANCE");
    expect(classifyUnitType("m")).toBe("DISTANCE");
    expect(classifyUnitType("in")).toBe("DISTANCE");
    expect(classifyUnitType("ft")).toBe("DISTANCE");
    expect(classifyUnitType("mi")).toBe("DISTANCE");

  });
});

describe("testing_unit_classification_service_Wrong_input", () => {
  test("The unit provided should return \"UNKNOWN\"", () => {

    expect(classifyUnitType("a")).toBe("UNKNOWN");
    expect(classifyUnitType("trtrt")).toBe("UNKNOWN");
    expect(classifyUnitType("1111")).toBe("UNKNOWN");
    expect(classifyUnitType("")).toBe("UNKNOWN");

  });
});

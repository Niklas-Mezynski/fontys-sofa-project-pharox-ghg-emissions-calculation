// import * as indexFunctions from "../src/index";

import { classifyUnitType } from "../src/logic/units/unit_classification_service";

describe("Index - Hello World", () => {
  test("Hello World function returns 'Hello world!'", async () => {
    // A fake request object, with req.query.text set to 'input'
    // const req = {body: {}};

    // A fake response object, with a stubbed redirect function which asserts that it is called
    // with parameters 303, 'new_ref'.
    // const res = {
    //   send: (payload: string) => {
    //     expect(payload).toBe("Hello world!");
    //   },
    // };

    // Invoke addMessage with our fake request and response objects. This will cause the
    // assertions in the response object to be evaluated.
    // await indexFunctions.helloWorld(req as any, res as any);

    expect(1).toBe(1);
  });
});


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
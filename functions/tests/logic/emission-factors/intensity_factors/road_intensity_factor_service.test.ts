import { RoadIntensityFactorService } from "../../../../src/logic/emission_factors/intensity_factors/road_intensity_factor_service";
import { RoadTransportDetails } from "../../../../src/models/emission_calculations/emission_calculation_model";
import { CustomError } from "../../../../src/utils/errors";
import { FirestoreUtil } from "../../../../src/utils/firestore";
import { roadIntensityFactors } from "../../../helpers/test-data";

describe("Emission factors - Road intensity emission factor algorithm", () => {
  const inputA = {
    "modeOfTransport": "ROAD",
    "refrigerated": false,
    "vehicle": {
      "code": null,
      "weight": {
        "value": 55,
        "unit": "t",
      },
      "engineType": null,
    },
    "characteristics": {
      "loadFactor": null,
      "emptyRunning": null,
      "loadCharacteristic": null,
      "combinedLoadFactorEmptyRunning": null,
    },
    "fuelCode": null,
  } as RoadTransportDetails;

  const inputB = {
    "modeOfTransport": "ROAD",
    "refrigerated": false,
    "vehicle": {
      "code": "ART_TRUCK",
      "weight": {
        "value": 55,
        "unit": "t",
      },
      "engineType": null,
    },
    "characteristics": {
      "loadFactor": null,
      "emptyRunning": null,
      "loadCharacteristic": null,
      "combinedLoadFactorEmptyRunning": null,
    },
    "fuelCode": null,
  } as RoadTransportDetails;

  const inputC = {
    "modeOfTransport": "ROAD",
    "refrigerated": false,
    "vehicle": {
      "code": "ARTICULATED_TRUCK",
      "weight": {
        "value": 3,
        "unit": "t",
      },
      "engineType": "",
    },
    "characteristics": {
      "loadFactor": 25,
      "emptyRunning": 25,
      "loadCharacteristic": "AVERAGE_MIXED",
      "combinedLoadFactorEmptyRunning": 25,
    },
    "fuelCode": "PETROL",
  } as RoadTransportDetails;

  const inputD = {
    "modeOfTransport": "ROAD",
    "refrigerated": false,
    "vehicle": {
      "code": "VAN_LT_3.5_T",
      "weight": {
        "value": 3,
        "unit": "t",
      },
      "engineType": "TURBO_DIESEL",
    },
    "characteristics": {
      "loadFactor": null,
      "emptyRunning": null,
      "loadCharacteristic": "AVERAGE_MIXED",
      "combinedLoadFactorEmptyRunning": null,
    },
    "fuelCode": "DIESEL_B10",
  } as RoadTransportDetails;

  const inputE = {
    "modeOfTransport": "ROAD",
    "refrigerated": false,
    "vehicle": {
      "code": null,
      "weight": {
        "value": 70,
        "unit": "t",
      },
      "engineType": null,
    },
    "characteristics": {
      "loadFactor": null,
      "emptyRunning": null,
      "loadCharacteristic": null,
      "combinedLoadFactorEmptyRunning": null,
    },
    "fuelCode": null,
  } as RoadTransportDetails;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("Get the road intensity factor to be used in the emission calculation A", async () => {
    jest.spyOn(FirestoreUtil, "getByFilter").mockResolvedValue(roadIntensityFactors);

    await expect(RoadIntensityFactorService.getSpecificIntensityFactor(inputA, "EU")).resolves.toStrictEqual(roadIntensityFactors.find((factor) => factor.id === "7ceae7d4-1320-4a96-877b-2010916a9925"));
  });

  test("Get the road intensity factor to be used in the emission calculation B", async () => {
    jest.spyOn(FirestoreUtil, "getByFilter").mockResolvedValue(roadIntensityFactors);

    await expect(RoadIntensityFactorService.getSpecificIntensityFactor(inputB, "EU")).resolves.toStrictEqual(roadIntensityFactors.find((factor) => factor.id === "7ceae7d4-1320-4a96-877b-2010916a9925"));
  });

  test("Get the road intensity factor to be used in the emission calculation C", async () => {
    jest.spyOn(FirestoreUtil, "getByFilter").mockResolvedValue(roadIntensityFactors);

    await expect(RoadIntensityFactorService.getSpecificIntensityFactor(inputC, "EU")).rejects.toThrow(CustomError);
  });

  test("Get the road intensity factor to be used in the emission calculation D", async () => {
    jest.spyOn(FirestoreUtil, "getByFilter").mockResolvedValue(roadIntensityFactors);

    await expect(RoadIntensityFactorService.getSpecificIntensityFactor(inputD, "EU")).resolves.toStrictEqual(roadIntensityFactors.find((factor) => factor.id === "7ceae7d4-1320-4a96-877b-2010916a9924"));
  });

  test("Get the road intensity factor to be used in the emission calculation E", async () => {
    jest.spyOn(FirestoreUtil, "getByFilter").mockResolvedValue([]);

    await expect(RoadIntensityFactorService.getSpecificIntensityFactor(inputA, "EU")).rejects.toThrow(CustomError);
  });

  test("Get the road intensity factor to be used in the emission calculation F", async () => {
    jest.spyOn(FirestoreUtil, "getByFilter").mockResolvedValue([{id: "12345", value: "aaaa"}]);

    await expect(RoadIntensityFactorService.getSpecificIntensityFactor(inputA, "EU")).rejects.toThrow(CustomError);
  });

  test("Get the road intensity factor to be used in the emission calculation F", async () => {
    jest.spyOn(FirestoreUtil, "getByFilter").mockResolvedValue(roadIntensityFactors);

    await expect(RoadIntensityFactorService.getSpecificIntensityFactor(inputE, "EU")).rejects.toThrow(CustomError);
  });
});

describe("Emission factors - Road intensity emission factor helper methods", () => {
  const vehicleInputA = {
    "vehicle": {
      "code": "VAN_LT_3.5_T",
      "weight": {
        "value": 3,
        "unit": "t",
      },
      "engineType": "",
    },
  } as RoadTransportDetails;

  const vehicleInputB = {
    "vehicle": {
      "code": "VAN_GT_3.5_T",
      "weight": {
        "value": 5,
        "unit": "t",
      },
      "engineType": "",
    },
  } as RoadTransportDetails;

  const vehicleInputC = {
    "vehicle": {
      "code": "VAN_GT_10_T",
      "weight": {
        "value": 15,
        "unit": "t",
      },
      "engineType": "",
    },
  } as RoadTransportDetails;

  const vehicleInputD = {
    "vehicle": {
      "code": "TRUCK",
      "weight": {
        "value": 3,
        "unit": "t",
      },
      "engineType": "",
    },
  } as RoadTransportDetails;

  const vehicleInputE = {
    "vehicle": {
      "code": null,
      "weight": {
        "value": 2,
        "unit": "t",
      },
      "engineType": "TURBO_DIESEL",
    },
  } as RoadTransportDetails;

  const vehicleInputF = {
    "vehicle": {
      "code": null,
      "weight": {
        "value": 3,
        "unit": "t",
      },
      "engineType": "",
    },
  } as RoadTransportDetails;

  const characteristicsInputA = {
    "characteristics": {
      "loadFactor": null,
      "emptyRunning": null,
      "loadCharacteristic": null,
      "combinedLoadFactorEmptyRunning": null,
    },
  } as RoadTransportDetails;

  const characteristicsInputB = {
    "characteristics": {
      "loadFactor": 1,
      "emptyRunning": null,
      "loadCharacteristic": null,
      "combinedLoadFactorEmptyRunning": null,
    },
  } as RoadTransportDetails;

  const characteristicsInputC = {
    "characteristics": {
      "loadFactor": null,
      "emptyRunning": 1,
      "loadCharacteristic": null,
      "combinedLoadFactorEmptyRunning": null,
    },
  } as RoadTransportDetails;

  const characteristicsInputD = {
    "characteristics": {
      "loadFactor": null,
      "emptyRunning": null,
      "loadCharacteristic": "AVERAGE_MIXED",
      "combinedLoadFactorEmptyRunning": null,
    },
  } as RoadTransportDetails;

  const characteristicsInputE = {
    "characteristics": {
      "loadFactor": null,
      "emptyRunning": null,
      "loadCharacteristic": null,
      "combinedLoadFactorEmptyRunning": 1,
    },
  } as RoadTransportDetails;

  const fuelInputA = {
    "fuelCode": "DIESEL_B5",
  } as RoadTransportDetails;

  const fuelInputB = {fuelCode: null} as RoadTransportDetails;

  test("Filter factors by vehicle A", async () => {
    const {factors, useDefault} = RoadIntensityFactorService.filterFactorsByVehicle(vehicleInputA, roadIntensityFactors, true);
    expect(factors).toStrictEqual([roadIntensityFactors.find((factor) => factor.id === "7ceae7d4-1320-4a96-877b-2010916a9920")]);
    expect(useDefault).toStrictEqual(true);
  });

  test("Filter factors by vehicle B", async () => {
    const {factors, useDefault} = RoadIntensityFactorService.filterFactorsByVehicle(vehicleInputB, roadIntensityFactors, true);
    expect(factors).toStrictEqual([roadIntensityFactors.find((factor) => factor.id === "7ceae7d4-1320-4a96-877b-2010916a9921")]);
    expect(useDefault).toStrictEqual(true);
  });

  test("Filter factors by vehicle C", async () => {
    const {factors, useDefault} = RoadIntensityFactorService.filterFactorsByVehicle(vehicleInputC, roadIntensityFactors, true);
    expect(factors).toStrictEqual([roadIntensityFactors.find((factor) => factor.id === "7ceae7d4-1320-4a96-877b-2010916a9922")]);
    expect(useDefault).toStrictEqual(true);
  });

  test("Filter factors by vehicle D", async () => {
    const {factors, useDefault} = RoadIntensityFactorService.filterFactorsByVehicle(vehicleInputD, roadIntensityFactors, true);
    expect(factors).toStrictEqual([]);
    expect(useDefault).toStrictEqual(true);
  });

  test("Filter factors by vehicle E", async () => {
    const {factors, useDefault} = RoadIntensityFactorService.filterFactorsByVehicle(vehicleInputE, roadIntensityFactors, true);
    expect(factors).toStrictEqual([roadIntensityFactors.find((factor) => factor.id === "7ceae7d4-1320-4a96-877b-2010916a9924")]);
    expect(useDefault).toStrictEqual(false);
  });

  test("Filter factors by vehicle F", async () => {
    const {factors, useDefault} = RoadIntensityFactorService.filterFactorsByVehicle(vehicleInputF, roadIntensityFactors, true);
    expect(factors).toStrictEqual([roadIntensityFactors.find((factor) => factor.id === "7ceae7d4-1320-4a96-877b-2010916a9920")]);
    expect(useDefault).toStrictEqual(true);
  });

  test("Filter factors by characteristics A", async () => {
    const {factors, useDefault} = RoadIntensityFactorService.filterFactorsByCharacteristics(characteristicsInputA, roadIntensityFactors, true);
    expect(factors).toStrictEqual(roadIntensityFactors);
    expect(useDefault).toStrictEqual(true);
  });

  test("Filter factors by characteristics B", async () => {
    const {factors, useDefault} = RoadIntensityFactorService.filterFactorsByCharacteristics(characteristicsInputB, roadIntensityFactors, true);
    expect(factors).toStrictEqual([roadIntensityFactors.find((factor) => factor.id === "7ceae7d4-1320-4a96-877b-2010916a9921")]);
    expect(useDefault).toStrictEqual(false);
  });

  test("Filter factors by characteristics C", async () => {
    const {factors, useDefault} = RoadIntensityFactorService.filterFactorsByCharacteristics(characteristicsInputC, roadIntensityFactors, true);
    expect(factors).toStrictEqual([roadIntensityFactors.find((factor) => factor.id === "7ceae7d4-1320-4a96-877b-2010916a9922")]);
    expect(useDefault).toStrictEqual(false);
  });

  test("Filter factors by characteristics D", async () => {
    const {factors, useDefault} = RoadIntensityFactorService.filterFactorsByCharacteristics(characteristicsInputD, roadIntensityFactors, true);
    expect(factors).toStrictEqual([roadIntensityFactors.find((factor) => factor.id === "7ceae7d4-1320-4a96-877b-2010916a9924")]);
    expect(useDefault).toStrictEqual(false);
  });

  test("Filter factors by characteristics E", async () => {
    const {factors, useDefault} = RoadIntensityFactorService.filterFactorsByCharacteristics(characteristicsInputE, roadIntensityFactors, true);
    expect(factors).toStrictEqual([roadIntensityFactors.find((factor) => factor.id === "7ceae7d4-1320-4a96-877b-2010916a9920")]);
    expect(useDefault).toStrictEqual(false);
  });

  test("Filter factors by fuel A", async () => {
    const {factors, useDefault} = RoadIntensityFactorService.filterFactorsByFuel(fuelInputA, roadIntensityFactors, true);
    expect(factors).toStrictEqual([roadIntensityFactors.find((factor) => factor.id === "7ceae7d4-1320-4a96-877b-2010916a9920")]);
    expect(useDefault).toStrictEqual(false);
  });

  test("Filter factors by fuel B", async () => {
    const {factors, useDefault} = RoadIntensityFactorService.filterFactorsByFuel(fuelInputB, roadIntensityFactors, true);
    expect(factors).toStrictEqual(roadIntensityFactors);
    expect(useDefault).toStrictEqual(true);
  });

  test("Filter default factor", async () => {
    // expect(RoadIntensityFactorService.filterDefaultFactor(roadIntensityFactors)).toStrictEqual([roadIntensityFactors.find((factor) => factor.id === "7ceae7d4-1320-4a96-877b-2010916a9925")]);
    console.log(RoadIntensityFactorService.filterDefaultFactor(roadIntensityFactors).map((factor) => factor.id));
    expect(RoadIntensityFactorService.filterDefaultFactor(roadIntensityFactors)).toStrictEqual(roadIntensityFactors.filter((factor) => ["7ceae7d4-1320-4a96-877b-2010916a9925", "7ceae7d4-1320-4a96-877b-2010916a9926"].includes(factor.id)));
  });

});

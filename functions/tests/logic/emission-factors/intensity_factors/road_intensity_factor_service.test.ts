import { RoadIntensityFactorService } from "../../../../src/logic/emission_factors/intensity_factors/road_intensity_factor_service";
import { RoadTransportDetails } from "../../../../src/models/emission_calculations/emission_calculation_model";
import { FirestoreUtil } from "../../../../src/utils/firestore";
import { validateInput } from "../../../../src/utils/functions";
import { roadIntensityFactors } from "../../../helpers/test-data";

describe("Emission factors - Road intensity emission factor algorithm", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("Get the road intensity factor to be used in the emission calculation", async () => {
    jest
      .spyOn(FirestoreUtil, "getByFilter")
      .mockResolvedValue(roadIntensityFactors);

    // expect(await RoadIntensityFactorService.getSpecificIntensityFactor({}, null)).toStrictEqual(roadIntensityFactors);
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
      "code": "VAN_LT_3.5_T",
      "weight": {
        "value": 5,
        "unit": "t",
      },
      "engineType": "",
    },
  } as RoadTransportDetails;

  const vehicleInputC = {
    "vehicle": {
      "code": "VAN_LT_3.5_T",
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
      "code": "VAN_LT_3.5_T",
      "weight": {
        "value": 3,
        "unit": "t",
      },
      "engineType": "TURBO_DIESEL",
    },
  } as RoadTransportDetails;

  const vehicleInputF = {
    "vehicle": {
      "code": "TRUCK",
      "weight": {
        "value": 3,
        "unit": "t",
      },
      "engineType": null,
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
    expect(factors).toStrictEqual([roadIntensityFactors.find((factor) => factor.id === "7ceae7d4-1320-4a96-877b-2010916a9923")]);
    expect(useDefault).toStrictEqual(true);
  });

  test("Filter factors by vehicle B", async () => {
    const {factors, useDefault} = RoadIntensityFactorService.filterFactorsByVehicle(vehicleInputB, roadIntensityFactors, true);
    expect(factors).toStrictEqual([roadIntensityFactors.find((factor) => factor.id === "da52fa5c-211b-403a-835b-23eeaaa57f7c")]);
    expect(useDefault).toStrictEqual(true);
  });

  test("Filter factors by vehicle C", async () => {
    const {factors, useDefault} = RoadIntensityFactorService.filterFactorsByVehicle(vehicleInputC, roadIntensityFactors, true);
    expect(factors).toStrictEqual([roadIntensityFactors.find((factor) => factor.id === "cc273c6f-b61c-4a6d-92a1-7e9d5bd54943")]);
    expect(useDefault).toStrictEqual(true);
  });

  test("Filter factors by vehicle D", async () => {
    const {factors, useDefault} = RoadIntensityFactorService.filterFactorsByVehicle(vehicleInputD, roadIntensityFactors, true);
    expect(factors).toStrictEqual([]);
    expect(useDefault).toStrictEqual(true);
  });

  test("Filter factors by vehicle E", async () => {
    const {factors, useDefault} = RoadIntensityFactorService.filterFactorsByVehicle(vehicleInputE, roadIntensityFactors, true);
    expect(factors).toStrictEqual([roadIntensityFactors.find((factor) => factor.id === "7ceae7d4-1320-4a96-877b-2010916a9923")]);
    expect(useDefault).toStrictEqual(false);
  });

  test("Filter factors by vehicle F", async () => {
    const {factors, useDefault} = RoadIntensityFactorService.filterFactorsByVehicle(vehicleInputF, roadIntensityFactors, true);
    expect(factors).toStrictEqual([]);
    expect(useDefault).toStrictEqual(true);
  });

  test("Filter factors by characteristics A", async () => {
    const {factors, useDefault} = RoadIntensityFactorService.filterFactorsByCharacteristics(characteristicsInputA, roadIntensityFactors, true);
    expect(factors).toStrictEqual(roadIntensityFactors);
    expect(useDefault).toStrictEqual(true);
  });

  test("Filter factors by characteristics B", async () => {
    const {factors, useDefault} = RoadIntensityFactorService.filterFactorsByCharacteristics(characteristicsInputB, roadIntensityFactors, true);
    expect(factors).toStrictEqual([roadIntensityFactors.find((factor) => factor.id === "7ceae7d4-1320-4a96-877b-2010916a9924")]);
    expect(useDefault).toStrictEqual(false);
  });

  test("Filter factors by characteristics C", async () => {
    const {factors, useDefault} = RoadIntensityFactorService.filterFactorsByCharacteristics(characteristicsInputC, roadIntensityFactors, true);
    expect(factors).toStrictEqual([roadIntensityFactors.find((factor) => factor.id === "7ceae7d4-1320-4a96-877b-2010916a9925")]);
    expect(useDefault).toStrictEqual(false);
  });

  test("Filter factors by characteristics D", async () => {
    const {factors, useDefault} = RoadIntensityFactorService.filterFactorsByCharacteristics(characteristicsInputD, roadIntensityFactors, true);
    expect(factors).toStrictEqual([roadIntensityFactors.find((factor) => factor.id === "7ceae7d4-1320-4a96-877b-2010916a9926")]);
    expect(useDefault).toStrictEqual(false);
  });

  test("Filter factors by characteristics E", async () => {
    const {factors, useDefault} = RoadIntensityFactorService.filterFactorsByCharacteristics(characteristicsInputE, roadIntensityFactors, true);
    expect(factors).toStrictEqual([roadIntensityFactors.find((factor) => factor.id === "7ceae7d4-1320-4a96-877b-2010916a9923")]);
    expect(useDefault).toStrictEqual(false);
  });

  test("Filter factors by fuel A", async () => {
    const {factors, useDefault} = RoadIntensityFactorService.filterFactorsByFuel(fuelInputA, roadIntensityFactors, true);
    expect(factors).toStrictEqual([roadIntensityFactors.find((factor) => factor.id === "7ceae7d4-1320-4a96-877b-2010916a9923")]);
    expect(useDefault).toStrictEqual(false);
  });

  test("Filter factors by fuel B", async () => {
    const {factors, useDefault} = RoadIntensityFactorService.filterFactorsByFuel(fuelInputB, roadIntensityFactors, true);
    expect(factors).toStrictEqual(roadIntensityFactors);
    expect(useDefault).toStrictEqual(true);
  });

  test("Filter default factor", async () => {
    expect(RoadIntensityFactorService.filterDefaultFactor(roadIntensityFactors)).toStrictEqual([roadIntensityFactors.find((factor) => factor.id === "7ceae7d4-1320-4a96-877b-2010916a9927")]);
  });

});

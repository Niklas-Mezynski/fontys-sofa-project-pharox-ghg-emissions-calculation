import { RoadIntensityFactorService } from "../../../../src/logic/emission_factors/intensity_factors/road_intensity_factor_service";
import { RoadTransportDetails } from "../../../../src/models/emission_calculations/emission_calculation_model";
import { FirestoreUtil } from "../../../../src/utils/firestore";
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
      "code": "RIGID_TRUCK",
      "weight": {
        "value": 14.084,
        "unit": "t",
      },
      "engineType": "",
    },
  };
  const vehicleInputB = {vehicle: null};

  const characteristicsInputA = {
    "characteristics": {
      "loadFactor": null,
      "emptyRunning": null,
      "loadCharacteristic": "AVERAGE_MIXED",
      "combinedLoadFactorEmptyRunning": null,
    },
  };
  const characteristicsInputB = {characteristics: null};

  const fuelInputA = {
    "fuelCode": "DIESEL_B5",
  };
  const fuelInputB = {fuelCode: null};

  test("Filter factors by vehicle", async () => {
    // expect(await RoadIntensityFactorService.getSpecificIntensityFactor(vehicleInputB, roadIntensityFactors)).toStrictEqual(roadIntensityFactors);
  });

  test("Filter factors by characteristics", async () => {
    // expect(await RoadIntensityFactorService.getSpecificIntensityFactor({}, null)).toStrictEqual(roadIntensityFactors);
  });

  test("Filter factors by fuel", async () => {
    // expect(await RoadIntensityFactorService.getSpecificIntensityFactor({}, null)).toStrictEqual(roadIntensityFactors);
  });

  test("Filter default factor", async () => {
    // expect(await RoadIntensityFactorService.getSpecificIntensityFactor({}, null)).toStrictEqual(roadIntensityFactors);
  });

});

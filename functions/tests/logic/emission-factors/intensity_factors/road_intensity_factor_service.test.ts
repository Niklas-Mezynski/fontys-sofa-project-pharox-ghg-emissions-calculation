// import { RoadIntensityFactorService } from "../../../../src/logic/emission_factors/intensity_factors/road_intensity_factor_service";
import { FirestoreUtil } from "../../../../src/utils/firestore";
import { roadIntensityFactors } from "../../../helpers/test-data";

describe("Emission factors - Road intensity emission factors", () => {
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

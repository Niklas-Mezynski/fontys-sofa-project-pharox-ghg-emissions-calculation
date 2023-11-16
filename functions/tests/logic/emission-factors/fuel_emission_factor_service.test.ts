import { FirestoreUtil } from "../../../src/utils/firestore";
import { FuelEmissionFactorService } from "../../../src/logic/emission_factors/fuel_emission_factor_service";
import { fuelEmissionFactors } from "../../helpers/test-data";
import { TestUtils } from "../../helpers/test-utils";

describe("Emission factors - Fuel emission factors", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("Get All Fuel Emission Factor returns all fuel emission factors", async () => {
    const querySnapshot = TestUtils.generateQuerySnapshot(fuelEmissionFactors);
    jest.spyOn(FirestoreUtil, "getAll").mockResolvedValue(querySnapshot as any);

    expect(await FuelEmissionFactorService.getAllFuelEmissionFactors()).toStrictEqual(fuelEmissionFactors);
  });

  test("Get Fuel Emission Factors by Fuel code returns all fuel emission factors with the same fuel code", async () => {
    const gasolineFuelEmissionFactors = [fuelEmissionFactors[1]]

    const querySnapshot = TestUtils.generateQuerySnapshot(gasolineFuelEmissionFactors);
    jest.spyOn(FirestoreUtil, "getByFilter").mockResolvedValue(querySnapshot as any);

    const result = await FuelEmissionFactorService.getFuelEmissionFactorByFuelCode("GASOLINE")

    expect(result.length).toStrictEqual(1);
    expect(result).toStrictEqual(gasolineFuelEmissionFactors);
  });
});


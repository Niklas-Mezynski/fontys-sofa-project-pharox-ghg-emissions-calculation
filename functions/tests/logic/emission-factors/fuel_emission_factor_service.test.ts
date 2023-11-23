import { FirestoreUtil } from "../../../src/utils/firestore";
import { FuelEmissionFactorService } from "../../../src/logic/emission_factors/fuel_emission_factor_service";
import { fuelEmissionFactors } from "../../helpers/test-data";
import { CRUDEmissionFactorService } from "../../../src/logic/emission_factors/crud_emission_factor_service";

describe("Emission factors - Fuel emission factors", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("Get All Fuel Emission Factor returns all fuel emission factors", async () => {
    jest.spyOn(FirestoreUtil, "getAll").mockResolvedValue(fuelEmissionFactors);

    expect(
      await CRUDEmissionFactorService.getEmissionFactors("FUEL")
    ).toStrictEqual(fuelEmissionFactors);
  });

  test("Get Fuel Emission Factors by Fuel code returns all fuel emission factors with the same fuel code", async () => {
    const gasolineFuelEmissionFactors = [fuelEmissionFactors[1]];
    jest
      .spyOn(FirestoreUtil, "getByFilter")
      .mockResolvedValue(gasolineFuelEmissionFactors);

    const result =
      await FuelEmissionFactorService.getFuelEmissionFactorByFuelCode(
        "GASOLINE"
      );

    expect(result.length).toStrictEqual(1);
    expect(result).toStrictEqual(gasolineFuelEmissionFactors);
  });
});

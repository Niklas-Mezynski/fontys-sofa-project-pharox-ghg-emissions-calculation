import { FirestoreUtil } from "../../../src/utils/firestore";
import { FuelEmissionFactorService } from "../../../src/logic/emission_factors/fuel_emission_factor_service";
import { fuelEmissionFactors } from "../../helpers/test-data";

describe("Emission factors - Fuel emission factors", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("Get a Fuel emission factor by fuel code and region", async () => {
    const gasolineFuelEmissionFactors = [fuelEmissionFactors[1]];
    jest
      .spyOn(FirestoreUtil, "getByFilter")
      .mockResolvedValue(gasolineFuelEmissionFactors);

    const result =
      await FuelEmissionFactorService.getFuelEmissionFactorByFuelCodeAndRegion(
        "GASOLINE",
        "EU"
      );

    expect(result).toStrictEqual(fuelEmissionFactors[1]);
  });
});

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

import { FuelEmissionFactor } from "../../../src/models/emission_factors/fuel_emission_factors";
import { fuelEmissionFactors } from "../../helpers/test-data";
import { Mock } from "../../helpers/mocks";

describe("Emission factors - Fuel emission factors", () => {
  let FuelEmissionFactorService: any;
  let fuelEmissionFactorsMock: Mock<FuelEmissionFactor>;

  beforeAll(() => {

    fuelEmissionFactorsMock = new Mock<FuelEmissionFactor>(fuelEmissionFactors);
    fuelEmissionFactorsMock.mockFirebaseApplication();
    fuelEmissionFactorsMock.mockFirestore();

    /**
     * Import the logic that it will be tested
     * NOTE: Always after the Firebase App and Firestore mocking, otherwise it won't work
     */
    FuelEmissionFactorService = require("../../../src/logic/emission_factors/fuel_emission_factor_service").FuelEmissionFactorService;
  });

  afterEach(() => {
    fuelEmissionFactorsMock.resetMockToDefaultData();
  });

  afterAll(() => {
    // fuelEmissionFactorsMock.clearMocks();
  });

  test("Get All Fuel Emission Factor returns all fuel emission factors", async () => {
    expect(await FuelEmissionFactorService.getAllFuelEmissionFactors()).toStrictEqual(fuelEmissionFactors);
  });
});

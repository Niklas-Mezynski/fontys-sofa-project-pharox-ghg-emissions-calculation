/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

import { FuelEmissionFactor } from "../../../src/models/emission_factors/emission_factors";
import { Mock } from "../../helpers/mocks";
import { fuelEmissionFactors } from "../../helpers/test-data";

describe("Emission factors - Fuel emission factors", () => {
  let EmissionFactorService: any;
  let fuelEmissionFactorsMock: Mock<FuelEmissionFactor>;

  beforeAll(() => {

    fuelEmissionFactorsMock = new Mock<FuelEmissionFactor>(fuelEmissionFactors);
    fuelEmissionFactorsMock.mockFirebaseApplication();
    fuelEmissionFactorsMock.mockFirestore();

    /**
     * Import the logic that it will be tested
     * NOTE: Always after the Firebase App and Firestore mocking, otherwise it won't work
     */
    EmissionFactorService = require("../../../src/logic/emission_factors/emission_factor_service").EmissionFactorService;
  });

  afterEach(() => {
    fuelEmissionFactorsMock.resetMockToDefaultData();
  });

  afterAll(() => {
    // fuelEmissionFactorsMock.clearMocks();
  });

  test("Get All Fuel Emission Factor returns all fuel emission factors", async () => {
    expect(await EmissionFactorService.getAllFuelEmissionFactors()).toStrictEqual(fuelEmissionFactors);
  });
});

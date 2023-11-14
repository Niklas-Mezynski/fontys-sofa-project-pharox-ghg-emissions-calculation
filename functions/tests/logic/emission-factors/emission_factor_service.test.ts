/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */

describe("Emission factors - Fuel emission factors", () => {
  const fuelEmissionFactor = {
    "source": "GLEC",
    "fuel": {
      "code": "MARINE_GAS_OIL",
      "description": "Marine gas oil",
    },
    "factors": [{
      "unit": "KG_CO2E_PER_KG",
      "factor": {
        "WTT": 0.68,
        "TTW": 3.24,
        "WTW": 3.92,
      },
    }, {
      "unit": "KG_CO2E_PER_L",
      "factor": {
        "WTT": 0.61,
        "TTW": 2.88,
        "WTW": 3.49,
      },
    },
    ],
    "region": "EU",
  };

  const fuelEmissionFactors = {
    docs: [
      {
        data: () => fuelEmissionFactor,
      },
    ],
  }

  let EmissionFactorService: any;

  beforeAll(() => {

    /**
     * Mock initialization of the Firebase App
     */
    jest.mock("firebase-admin/app", () => ({
      initializeApp: jest.fn(),
    }));
  
    /**
     * Mock the different Firestore methods
     */
    jest.mock("firebase-admin/firestore", () => ({
      getFirestore: jest.fn(() => ({
        collection: jest.fn((path) => ({
          get: jest.fn().mockResolvedValue(fuelEmissionFactors),
          where: jest.fn((filter) => ({
            get: jest.fn().mockResolvedValue(fuelEmissionFactors),
          })),
          doc: jest.fn((ref) => ({
            get: jest.fn().mockResolvedValue(fuelEmissionFactor),
          })),
        })), 
      })),
    }));

    /**
     * Import the logic that it will be tested
     * NOTE: Always after the Firebase App and Firestore mocking, otherwise it won't work
     */
    EmissionFactorService = require("../../../src/logic/emission_factors/emission_factor_service").EmissionFactorService;
  });

  test("Get All Fuel Emission Factor returns all fuel emission factors", async () => {
    expect(await EmissionFactorService.getAllFuelEmissionFactors()).toStrictEqual([fuelEmissionFactor]);
  });
});

// describe("Emission factors - Intensity emission factors", () => {
//   test("Hello World function returns 'Hello world!'", async () => {
//     //
//   });
// });

import { v4 as uuid } from "uuid";
import { EmissionFactorService } from "../../../src/logic/emission_factors/emission_factor_service";

describe("Emission factors - Fuel emission factors", () => {
  // const firestoreMock = new FirestoreMock();

  // const fuelEmissionFactorsCollection = "fuel_emission_factors";
  // const fuelEmissionFactor = {
  //   "source": "GLEC",
  //   "fuel": {
  //     "code": "MARINE_GAS_OIL",
  //     "description": "Marine gas oil",
  //   },
  //   "factors": [{
  //     "unit": "KG_CO2E_PER_KG",
  //     "factor": {
  //       "WTT": 0.68,
  //       "TTW": 3.24,
  //       "WTW": 3.92,
  //     },
  //   	}, {
  //     "unit": "KG_CO2E_PER_L",
  //     "factor": {
  //       "WTT": 0.61,
  //       "TTW": 2.88,
  //       "WTW": 3.49,
  //     },
  //   },
  //   ],
  //   "region": "EU",
  // }

  // const mockQueryResponse = jest.fn()
  // mockQueryResponse.mockResolvedValue(fuelEmissionFactor)

  // jest.mock("firebase-admin", () => ({
  //   initializeApp: jest.fn(),
  //   firestore: () => ({
  //     collection: jest.fn(path => ({
  //       doc: jest.fn(id => ({
  //         get: mockQueryResponse,
  //       })),
  //     })), 
  //   }),
  // }))

  beforeEach(() => {
    // firebase.firestore = firestoreMock;
    // firestoreMock.reset();
  });

  test("Get Fuel Emission Factor by ID returns desired fuel emission factor", async () => {
    console.log(await EmissionFactorService.getFuelEmissionFactorById(uuid()));
  }, );
});

describe("Emission factors - Intensity emission factors", () => {
  test("Hello World function returns 'Hello world!'", async () => {

  });
});
import { v4 as uuid } from "uuid";
import { EmissionCalculatorService } from "../../../src/logic/emission_calculations/emission_calculator_service";
import { FreightEmissionCalculationInput } from "../../../src/models/emission_calculations/emission_calculation_model";
import { FuelEmissionFactor } from "../../../src/models/emission_factors/fuel_emission_factors";
import { FirestoreUtil } from "../../../src/utils/firestore";
import { ObjectWithId } from "../../../src/utils/types";

describe("Emission calculations", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("Calculation based on single fuel based transport activity", async () => {
    const calculationInput: FreightEmissionCalculationInput = {
      transportParts: [
        {
          transportDetails: {
            consumedFuel: {
              value: 85364,
              unit: "l",
            },
            fuelCode: "GASOLINE",
          },
          distance: {
            value: 100000,
            unit: "m",
          },
          weight: {
            value: 1000,
            unit: "kg",
          },
          region: "EU",
          scope: "SCOPE3",
        },
      ],
    };

    const factorToUse = [
      {
        id: uuid(),
        source: "GLEC",
        fuel: {
          code: "FUEL",
          name: "Fuel",
        },
        region: "EU",
        factors: [
          {
            unit: "KG_CO2E_PER_KG",
            ttw: null,
            wtt: 0.5,
            wtw: null,
          },
        ],
      },
    ] as ObjectWithId<FuelEmissionFactor>[];

    jest.spyOn(FirestoreUtil, "getByFilter").mockResolvedValue(factorToUse);

    const calcResult =
      await EmissionCalculatorService.performEmissionCalculation(
        calculationInput
      );

    expect(calcResult.emissions.breakdown.scope3.co2e.value).toStrictEqual(
      42_682
    );
  });
});

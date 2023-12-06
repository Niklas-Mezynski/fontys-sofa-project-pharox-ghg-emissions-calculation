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
          scope: "SCOPE3",
          distance: {
            value: 845364,
            unit: "km",
          },
          weight: {
            value: 4366,
            unit: "tonnes",
          },
          region: "EU",
          transportDetails: {
            consumedFuel: {
              value: 85364,
              unit: "l",
            },
            fuelCode: "GASOLINE_E5",
          },
        },
      ],
    };

    const factorToUse = [
      {
        id: uuid(),
        source: "GLEC",
        fuel: {
          code: "GASOLINE_E5",
          name: "Gasoline, 5% bioethanol blend",
        },
        factors: [
          {
            unit: "KG_CO2E_PER_KG",
            wtt: 0.66,
            ttw: 3.08,
            wtw: 3.74,
          },
          {
            unit: "KG_CO2E_PER_L",
            wtt: 0.5,
            ttw: 2.3,
            wtw: 2.8,
          },
        ],
        region: "EU",
      },
    ] as ObjectWithId<FuelEmissionFactor>[];

    jest.spyOn(FirestoreUtil, "getByFilter").mockResolvedValue(factorToUse);

    const calcResult =
      await EmissionCalculatorService.performEmissionCalculation(
        calculationInput
      );

    expect(calcResult.emissions.breakdown.scope3.co2e.value).toBeCloseTo(
      23_9019.2,
      2
    );

    expect(calcResult.emissions.co2e.value).toBeCloseTo(23_9019.2, 2);
  });
});

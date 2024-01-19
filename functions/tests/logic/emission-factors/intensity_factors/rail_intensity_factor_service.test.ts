import { RailIntensityFactorService } from "../../../../src/logic/emission_factors/intensity_factors/rail_intensity_factor_service";
import { RailTransportDetails } from "../../../../src/models/emission_calculations/emission_calculation_model";
import { RailIntensityFactor } from "../../../../src/models/emission_factors/rail_intensity_factors";
import { CustomError } from "../../../../src/utils/errors";
import { FirestoreUtil } from "../../../../src/utils/firestore";
import { ObjectWithId } from "../../../../src/utils/types";
import { NoErrorThrownError, getError } from "../../../utils/test.utils";

const genPseudoUUID = (id: number) =>
  `7ceae7d4-1320-4a96-877b-2010916a${id.toLocaleString(undefined, {
    minimumIntegerDigits: 4,
    notation: "compact",
  })}`;

const commonFactor = (
  id: number,
  source: RailIntensityFactor["source"] = "GLEC",
  region: RailIntensityFactor["region"] = "EU",
  refrigerated = false,
  factor: RailIntensityFactor["factor"] = null,
  fuelConsumption: RailIntensityFactor["fuelConsumption"] = null
) => ({
  id: genPseudoUUID(id),
  source,
  region,
  refrigerated,
  factor,
  fuelConsumption,
});

const railIntensityFactors: ObjectWithId<RailIntensityFactor>[] = [
  {
    ...commonFactor(0),
    characteristics: null,
    tractionType: "ELECTRIC",
  },
  {
    ...commonFactor(1),
    characteristics: null,
    tractionType: "DIESEL",
  },
  {
    ...commonFactor(2),
    characteristics: null,
    tractionType: null,
  },
  {
    ...commonFactor(3),
    characteristics: {
      loadFactor: 0.85,
      emptyRunning: 0.33,
      loadCharacteristic: "Cars",
    },
    tractionType: "DIESEL",
  },
  {
    ...commonFactor(3),
    characteristics: {
      loadFactor: 0.85,
      emptyRunning: 0.33,
      loadCharacteristic: "Bananas",
    },
    tractionType: "DIESEL",
  },
];

describe("Emission factors - Rail intensity emission factor algorithm", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test.each([
    {
      input: {
        modeOfTransport: "RAIL",
        refrigerated: false,
        characteristics: {
          loadFactor: null,
          emptyRunning: null,
          loadCharacteristic: null,
        },
        tractionType: null,
      } as RailTransportDetails,
      expected: railIntensityFactors[2],
    },
    {
      input: {
        modeOfTransport: "RAIL",
        refrigerated: false,
        characteristics: {
          loadFactor: null,
          emptyRunning: null,
          loadCharacteristic: null,
        },
        tractionType: "DIESEL",
      } as RailTransportDetails,
      expected: railIntensityFactors[1],
    },
    {
      input: {
        modeOfTransport: "RAIL",
        refrigerated: false,
        characteristics: {
          loadFactor: null,
          emptyRunning: null,
          loadCharacteristic: null,
        },
        tractionType: "ELECTRIC",
      } as RailTransportDetails,
      expected: railIntensityFactors[0],
    },
    {
      input: {
        modeOfTransport: "RAIL",
        refrigerated: false,
        characteristics: {
          loadFactor: 0.85,
          emptyRunning: 0.33,
          loadCharacteristic: "Cars",
        },
        tractionType: "DIESEL",
      } as RailTransportDetails,
      expected: railIntensityFactors[3],
    },
  ])(
    "Get the rail intensity factor to be used in the emission calculation where input sufficient",
    async ({ expected, input }) => {
      jest
        .spyOn(FirestoreUtil, "getByFilter")
        .mockResolvedValue(railIntensityFactors);

      await expect(
        RailIntensityFactorService.getSpecificIntensityFactor(input, "EU")
      ).resolves.toStrictEqual(expected);
    }
  );

  test.each([
    {
      input: {
        modeOfTransport: "RAIL",
        refrigerated: false,
        characteristics: {
          loadFactor: 0.85,
          emptyRunning: 0.33,
          loadCharacteristic: null,
        },
        tractionType: "DIESEL",
      } as RailTransportDetails,
    },
  ])(
    "Get the rail intensity factor to be used in the emission calculation - not enough input",
    async ({ input }) => {
      jest
        .spyOn(FirestoreUtil, "getByFilter")
        .mockResolvedValue(railIntensityFactors);

      const error = await getError(
        async () =>
          await RailIntensityFactorService.getSpecificIntensityFactor(
            input,
            "EU"
          )
      );

      // check that the returned error wasn't that no error was thrown
      expect(error).not.toBeInstanceOf(NoErrorThrownError);
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).message).toContain("not enough");
    }
  );

  test.each([
    {
      input: {
        modeOfTransport: "RAIL",
        refrigerated: false,
        characteristics: {
          loadFactor: 0.69,
          emptyRunning: 0.187,
          loadCharacteristic: "RANDOM VALUE N/A",
        },
        tractionType: "DIESEL",
      } as RailTransportDetails,
    },
  ])(
    "Get the rail intensity factor to be used in the emission calculation - no factor found",
    async ({ input }) => {
      jest
        .spyOn(FirestoreUtil, "getByFilter")
        .mockResolvedValue(railIntensityFactors);

      const error = await getError(
        async () =>
          await RailIntensityFactorService.getSpecificIntensityFactor(
            input,
            "EU"
          )
      );

      expect(error).not.toBeInstanceOf(NoErrorThrownError);
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).message).toContain(
        "data does not corespond to any emission factor"
      );
    }
  );

  test.each([
    {
      factors: [
        {
          ...commonFactor(0),
          characteristics: {
            loadFactor: 0.85,
            emptyRunning: null,
            loadCharacteristic: null,
          },
          tractionType: "DIESEL",
        },
        {
          ...commonFactor(1),
          characteristics: {
            loadFactor: null,
            emptyRunning: null,
            loadCharacteristic: null,
          },
          tractionType: "DIESEL",
        },
      ] as ObjectWithId<RailIntensityFactor>[],
      input: {
        modeOfTransport: "RAIL",
        refrigerated: false,
        characteristics: {
          loadFactor: null,
          emptyRunning: null,
          loadCharacteristic: null,
        },
        tractionType: "DIESEL",
      } as RailTransportDetails,
    },
    {
      factors: [
        {
          ...commonFactor(0),
          characteristics: null,
          tractionType: "DIESEL",
        },
        {
          ...commonFactor(1),
          characteristics: {
            loadFactor: 1,
            emptyRunning: null,
            loadCharacteristic: null,
          },
          tractionType: "DIESEL",
        },
      ] as ObjectWithId<RailIntensityFactor>[],
      input: {
        modeOfTransport: "RAIL",
        refrigerated: false,
        characteristics: {
          loadFactor: 1,
          emptyRunning: null,
          loadCharacteristic: null,
        },
        tractionType: "DIESEL",
      } as RailTransportDetails,
    },
    {
      factors: [
        {
          ...commonFactor(0),
          characteristics: null,
          tractionType: "DIESEL",
        },
        {
          ...commonFactor(1),
          characteristics: {
            loadFactor: null,
            emptyRunning: null,
            loadCharacteristic: "car",
          },
          tractionType: "DIESEL",
        },
      ] as ObjectWithId<RailIntensityFactor>[],
      input: {
        modeOfTransport: "RAIL",
        refrigerated: false,
        characteristics: {
          loadFactor: null,
          emptyRunning: null,
          loadCharacteristic: "car",
        },
        tractionType: "DIESEL",
      } as RailTransportDetails,
    },
  ])(
    "Get the rail intensity factor to be used in the emission calculation - edge cases",
    async ({ input, factors }) => {
      jest.spyOn(FirestoreUtil, "getByFilter").mockResolvedValue(factors);

      await expect(
        RailIntensityFactorService.getSpecificIntensityFactor(input, "EU")
      ).resolves.toStrictEqual(factors[1]);
    }
  );
});

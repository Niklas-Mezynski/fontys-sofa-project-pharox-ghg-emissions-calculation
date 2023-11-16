import { HttpStatusCode } from "axios";
import { FirestoreUtil } from "../../utils/firestore";
import {
  EmissionFactor,
  emissionFactorSchema,
} from "../../models/emission_factors/climatiq_emission_factors";
import { CustomError } from "../../utils/errors";
import { exhaustiveMatchingGuard, validateInput } from "../../utils/functions";
import {
  FuelEmissionFactor,
  IntensityEmissionFactor,
  intensityEmissionFactorSchema,
} from "../../models/emission_factors/fuel_emission_factors";
/**
 * @deprecated Use fuelEmissionFactors instead.
 * Fetches the emission factors from the Climatiq API and saves them in the database.
 * @returns The emission factors.
 */
async function getAll() {
  const factors = await FirestoreUtil.getAll("emission_factors");
  return FirestoreUtil.getDataFromQuerySnapshot(factors);
}

/**
 * @deprecated Use fuelEmissionFactors instead.
 * Fetches the emission factor from the database based on the unitType
 * @param {string} unitType
 * @returns The emission factor.
 */
async function getByUnitType(unitType: string) {
  const factors = await getAll();

  const matchingFactors = [];

  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < factors.length; i++) {
    if (factors[i]["unit_type"] === unitType) {
      // Get incorrect format?

      console.log(factors[i]);

      const data = validateInput(
        factors[i],
        emissionFactorSchema,
        "Received unexpected emissionFactor format from the database."
      );

      matchingFactors.push(data);
    }
  }

  if (matchingFactors.length === 0) {
    throw new CustomError({
      status: HttpStatusCode.NotFound,
      message: `Emission factor for unit type ${unitType} not found.`,
    });
  }

  return matchingFactors;
}

/**
 * @deprecated Use fuelEmissionFactors instead.
 * Fetches the emission factor from the Climatiq API and saves it in the database.
 * @param {string} activityId
 * @returns The emission factor.
 */
async function getByActivityId(activityId: string) {
  const document = await FirestoreUtil.getById("emission_factors", activityId);

  if (!FirestoreUtil.isDocumentDataPresent(document)) {
    throw new CustomError({
      status: HttpStatusCode.NotFound,
      message: `Emission factor for activity ${activityId} not found.`,
    });
  }

  const data = validateInput(
    document.data(),
    emissionFactorSchema,
    "Received unexpected emissionFactor format from the database."
  );

  return data;
}

/**
 * @deprecated Use fuelEmissionFactors instead.
 * Function save emission factors in the DB
 * @param {EmissionFactor} factor - the emission factor to save
 */
async function saveEmissionFactor(factor: EmissionFactor) {
  await FirestoreUtil.createWithId("emission_factors", factor.activityId, factor);
}

/** INTENSITY EMISSION FACTORS */

const intensityEmissionFactorsCollection = "intensity_emission_factors";

/**
 * Function to create a new intensity emission factor and store it in the DB
 * @param {object} data - The data to create a new intensity emission factor
 * @returns {Promise<IntensityEmissionFactor>} - The saved intensity emission factor in the DB
 */
async function createIntensityEmissionFactor(
  data: object
): Promise<IntensityEmissionFactor> {
  const factor = validateInput(
    data,
    intensityEmissionFactorSchema,
    "Could not create a Intensity Emission Factor from the given data"
  );

  const savedFactor = await FirestoreUtil.createWithCustomId(intensityEmissionFactorsCollection, factor);
  return FirestoreUtil.getDataFromDocumentReference(savedFactor);
}

/**
 *
 * @param emissionFactor
 * @returns
 */
function mapEmissionFactorWithUnits(emissionFactor: FuelEmissionFactor) {
  return {
    ...emissionFactor,
    factors: emissionFactor.factors.map((factor) => {
      const glecUnitString = glecUnitStringMapper(factor.unit);
      if (!glecUnitString) {
        throw new CustomError({
          status: HttpStatusCode.InternalServerError,
          message: `Could not map unit string ${factor.unit} from the GLEC fuel emission factors to the required format`,
        });
      }
      return {
        ...factor,
        producedUnit: glecUnitString.producedUnit,
        perUnit: glecUnitString.perUnit,
      };
    }),
  };
}

/**
 *
 * @param unit
 * @returns
 */
function glecUnitStringMapper(
  unit: FuelEmissionFactor["factors"][number]["unit"]
) {
  switch (unit) {
    case "KG_CO2E_PER_KG":
      return {
        producedUnit: "kg_CO2e",
        perUnit: "kg",
      };
    case "KG_CO2E_PER_L":
      return {
        producedUnit: "kg_CO2e",
        perUnit: "l",
      };
    case "KG_CO2E_PER_KWH":
      return {
        producedUnit: "kg_CO2e",
        perUnit: "kWh",
      };
    default:
      return exhaustiveMatchingGuard(
        unit,
        "Invalid unit type. This should not happen and means a unhandled unit type was added to the glecUnitStringMapper."
      );
  }
}

export const EmissionFactorService = {
  createIntensityEmissionFactor,
  getAll,
  getByActivityId,
  getByUnitType,
  saveEmissionFactor,
  mapEmissionFactorWithUnits,
  glecUnitStringMapper,
};

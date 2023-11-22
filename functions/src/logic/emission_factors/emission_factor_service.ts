import { HttpStatusCode } from "axios";
import { FirestoreUtil } from "../../utils/firestore";
import { CustomError } from "../../utils/errors";
import { exhaustiveMatchingGuard, validateInput } from "../../utils/functions";
import {
  FuelEmissionFactor,
  IntensityEmissionFactor,
  intensityEmissionFactorSchema,
} from "../../models/emission_factors/fuel_emission_factors";

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
  return validateInput(
    savedFactor,
    intensityEmissionFactorSchema,
    "Received unexpected Intensity Emission Factor format from the database."
  );
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
  mapEmissionFactorWithUnits,
  glecUnitStringMapper,
};

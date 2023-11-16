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
  fuelEmissionFactorSchema,
  intensityEmissionFactorSchema,
} from "../../models/emission_factors/emission_factors";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { Filter } from "firebase-admin/firestore";

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

/** FUEL EMISSION FACTORS */

const fuelEmissionFactorsCollection = "fuel_emission_factors";

/**
 * Get all the Fuel emission factors in the database
 * @returns {Promise<FuelEmissionFactor[]>} - The found fuel emission factors
 */
async function getAllFuelEmissionFactors(): Promise<FuelEmissionFactor[]> {
  const factors = await FirestoreUtil.getAll(fuelEmissionFactorsCollection);

  const validatedFactors = validateInput(
    FirestoreUtil.getDataFromQuerySnapshot(factors),
    z.array(fuelEmissionFactorSchema),
    "Received unexpected emissionFactor format from the database."
  );

  return validatedFactors;
}

/**
 * Get a Fuel emission factor by ID
 * @param {string} id - The Fuel emission factor ID
 * @returns {Promise<FuelEmissionFactor>} - The found Fuel emission factor
 */
async function getFuelEmissionFactorById(
  id: string
): Promise<FuelEmissionFactor> {
  const document = await FirestoreUtil.getById(fuelEmissionFactorsCollection, id);

  const data: FuelEmissionFactor = validateInput(
    FirestoreUtil.getDataFromDocumentSnapshot(document),
    fuelEmissionFactorSchema,
    "Received unexpected Fuel Emission Factor format from the database."
  );

  return data;
}

/**
 * Get all the Fuel emission factors with same fuel code
 * @param {string} fuelCode - The fuel code
 * @returns {Promise<FuelEmissionFactor>} - The found Fuel emission factors
 */
async function getFuelEmissionFactorByFuelCode(
  fuelCode: string
): Promise<FuelEmissionFactor[]> {
  const filter = Filter.where("fuel.code", "==", fuelCode);
  const factors = await FirestoreUtil.getByFilter(fuelEmissionFactorsCollection, filter);

  const validatedFactors = validateInput(
    FirestoreUtil.getDataFromQuerySnapshot(factors),
    z.array(fuelEmissionFactorSchema),
    "Received unexpected Fuel Emission Factor format from the database."
  );

  return validatedFactors;
}

/**
 * Get all the Fuel emission factors with same region
 * @param {string} region - The fuel emission factor region
 * @returns {Promise<FuelEmissionFactor>} - The found Fuel emission factors
 */
async function getFuelEmissionFactorByRegion(
  region: string
): Promise<FuelEmissionFactor[]> {
  const filter = Filter.where("region", "==", region);
  const factors = await FirestoreUtil.getByFilter(fuelEmissionFactorsCollection, filter);

  const validatedFactors = validateInput(
    FirestoreUtil.getDataFromQuerySnapshot(factors),
    z.array(fuelEmissionFactorSchema),
    "Received unexpected Fuel Emission Factor format from the database."
  );

  return validatedFactors;
}

/**
 * Get all the Fuel emission factors with same source
 * @param {string} source - The fuel emission factor source
 * @returns {Promise<FuelEmissionFactor>} - The found Fuel emission factors
 */
async function getFuelEmissionFactorBySource(
  source: string
): Promise<FuelEmissionFactor[]> {
  const filter = Filter.where("source", "==", source);
  const factors = await FirestoreUtil.getByFilter(fuelEmissionFactorsCollection, filter);

  const validatedFactors = validateInput(
    FirestoreUtil.getDataFromQuerySnapshot(factors),
    z.array(fuelEmissionFactorSchema),
    "Received unexpected Fuel Emission Factor format from the database."
  );

  return validatedFactors;
}

/**
 * Function to create a new fuel emission factor and store it in the DB
 * @param {object} data - The multiple data to create a new fuel emission factor
 * @returns {Promise<FuelEmissionFactor>} - The saved fuel emission factor in the DB
 */
async function createFuelEmissionFactor(
  data: unknown
): Promise<FuelEmissionFactor> {
  const factor = validateInput(
    data,
    fuelEmissionFactorSchema,
    "Could not create a Fuel Emission Factor from the given data"
  );

  const savedFactor = await FirestoreUtil.create(fuelEmissionFactorsCollection, factor);
  return FirestoreUtil.getDataFromDocumentReference(savedFactor);
}

/**
 * Function to create multiple new fuel emission factors and store it in the DB
 * @param {object[]} data - The multiple data to create multiple new fuel emission factors
 * @returns {Promise<FuelEmissionFactor[]>} - The saved fuel emission factors in the DB
 */
async function createFuelEmissionFactors(
  data: unknown
): Promise<FuelEmissionFactor[]> {
  const validatedFactors = validateInput(
    data,
    z.array(fuelEmissionFactorSchema),
    "Could not create a Fuel Emission Factor from the given data"
  );

  const savedFactors = await FirestoreUtil.createMany(fuelEmissionFactorsCollection, validatedFactors);
  return FirestoreUtil.getDataFromDocumentReferences(savedFactors);
}

/**
 * Get a Fuel emission factor by fuel code and region, if not found in region, it tries to get the international one
 */
async function getFuelEmissionFactorByFuelCodeAndRegion(
  fuelCode: string,
  region: string
) {
  const filter = Filter.and(
    Filter.or(
      Filter.where("fuel.code", "==", fuelCode),
      Filter.where("fuel.name", "==", fuelCode)
    ),
    Filter.or(
      Filter.where("region", "==", region),
      Filter.where("region", "==", "INTERNATIONAL")
    )
  );
  const documents = await FirestoreUtil.getByFilter(fuelEmissionFactorsCollection, filter);

  const factors = validateInput(
    FirestoreUtil.getDataFromQuerySnapshot(documents),
    z.array(fuelEmissionFactorSchema),
    "Received unexpected emissionFactor format from the database."
  );

  // Find the factors with the exact region, if empty use the international factors
  const exactRegionFactors = factors.filter(
    (factor) => factor.region === region
  );
  const foundFactors = exactRegionFactors.length
    ? exactRegionFactors
    : factors.filter((factor) => factor.region === "INTERNATIONAL");

  if (foundFactors.length === 0) {
    throw new CustomError({
      status: HttpStatusCode.NotFound,
      message: `Emission factor for fuel ${fuelCode} not found.`,
    });
  }
  if (foundFactors.length > 1) {
    throw new CustomError({
      status: HttpStatusCode.InternalServerError,
      message: `Multiple emission factors for fuel ${fuelCode} found.`,
    });
  }

  return foundFactors[0];
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

  const savedFactor = await FirestoreUtil.create(intensityEmissionFactorsCollection, factor);
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
  getAllFuelEmissionFactors,
  getFuelEmissionFactorById,
  getFuelEmissionFactorByFuelCode,
  getFuelEmissionFactorByRegion,
  getFuelEmissionFactorBySource,
  createFuelEmissionFactor,
  createFuelEmissionFactors,
  createIntensityEmissionFactor,
  getAll,
  getByActivityId,
  getByUnitType,
  saveEmissionFactor,
  getFuelEmissionFactorByFuelCodeAndRegion,
};

import { CustomError } from "../../utils/errors";
import { Filter } from "firebase-admin/firestore";
import { FirestoreUtil } from "../../utils/firestore";
import { FuelEmissionFactor, fuelEmissionFactorSchema } from "../../models/emission_factors/fuel_emission_factors";
import { HttpStatusCode } from "axios";
import { validateInput } from "../../utils/functions";
import { z } from "zod";

const fuelEmissionFactorsCollection = "fuel_emission_factors";

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

  const savedFactor = await FirestoreUtil.createWithCustomId(fuelEmissionFactorsCollection, factor);
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

  const savedFactors = await FirestoreUtil.createManyWithCustomId(fuelEmissionFactorsCollection, validatedFactors);
  return FirestoreUtil.getDataFromDocumentReferences(savedFactors);
}


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

export const FuelEmissionFactorService = {
  createFuelEmissionFactor,
  createFuelEmissionFactors,
  getAllFuelEmissionFactors,
  getFuelEmissionFactorById,
  getFuelEmissionFactorByFuelCode,
  getFuelEmissionFactorByRegion,
  getFuelEmissionFactorBySource,
  getFuelEmissionFactorByFuelCodeAndRegion,
};

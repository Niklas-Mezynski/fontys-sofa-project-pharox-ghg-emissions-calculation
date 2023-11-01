import { HttpStatusCode } from "axios";
import { db } from "../..";
import {
  EmissionFactor,
  emissionFactorSchema,
} from "../../models/emission_factors/climatiq_emission_factors";
import { CustomError } from "../../utils/errors";
import { validateInput } from "../../utils/functions";
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
  const factors = await db.collection("emission_factors").get();
  return factors.docs.map((doc) => doc.data());
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
  const document = await db
    .collection("emission_factors")
    .doc(activityId)
    .get();

  if (!document.exists) {
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
  const docRef = db.collection("emission_factors").doc(factor.activityId);

  await docRef.set(factor);
}

/** FUEL EMISSION FACTORS */

const fuelEmissionFactorsCollection = "fuel_emission_factors";

/**
 * Get all the Fuel emission factors in the database
 * @returns {Promise<FuelEmissionFactor[]>} - The found fuel emission factors
 */
async function getFuelEmissionFactors(): Promise<FuelEmissionFactor[]> {
  const documents = await db
    .collection(fuelEmissionFactorsCollection)
    .get();

  if (documents.empty) {
    throw new CustomError({
      status: HttpStatusCode.NotFound,
      message: "No Fuel Emission Factors found",
    });
  }

  const data: FuelEmissionFactor[] = [];
  documents.forEach((doc) => {
    const factor = validateInput(
      doc.data(),
      fuelEmissionFactorSchema,
      "Received unexpected Fuel Emission Factor format from the database."
    );

    data.push(<FuelEmissionFactor>factor);
  });

  return data;
}

/**
 * Get a Fuel emission factor by ID
 * @param {string} id - The Fuel emission factor ID
 * @returns {Promise<FuelEmissionFactor>} - The found Fuel emission factor
 */
async function getFuelEmissionFactorById(id: string): Promise<FuelEmissionFactor> {
  const document = await db
    .collection(fuelEmissionFactorsCollection)
    .doc(id)
    .get();

  if (document.exists) {
    throw new CustomError({
      status: HttpStatusCode.NotFound,
      message: `No Fuel Emission Factor found with ID ${id}`,
    });
  }

  const data: FuelEmissionFactor = <FuelEmissionFactor>validateInput(
    document.data(),
    fuelEmissionFactorSchema,
    "Received unexpected Fuel Emission Factor format from the database."
  );

  return data;
}

/**
 * Get all the Fuel emission factors with same fuel code
 * @param {string} code - The fuel code
 * @returns {Promise<FuelEmissionFactor>} - The found Fuel emission factors
 */
async function getFuelEmissionFactorByCode(fuelCode: string): Promise<FuelEmissionFactor[]> {
  const documents = await db
    .collection(fuelEmissionFactorsCollection)
    .where("fuel.code", "==", fuelCode)
    .get();

  if (documents.empty) {
    throw new CustomError({
      status: HttpStatusCode.NotFound,
      message: `No Fuel Emission Factor found containing Fuel code ${fuelCode}`,
    });
  }

  const data: FuelEmissionFactor[] = [];
  documents.forEach((doc) => {
    const factor = validateInput(
      doc.data(),
      fuelEmissionFactorSchema,
      "Received unexpected Fuel Emission Factor format from the database."
    );

    data.push(<FuelEmissionFactor>factor);
  });

  return data;
}

/**
 * Get all the Fuel emission factors with same region
 * @param {string} region - The fuel emission factor region
 * @returns {Promise<FuelEmissionFactor>} - The found Fuel emission factors
 */
async function getFuelEmissionFactorByRegion(region: string): Promise<FuelEmissionFactor[]> {
  const documents = await db
    .collection(fuelEmissionFactorsCollection)
    .where("region", "==", region)
    .get();

  if (documents.empty) {
    throw new CustomError({
      status: HttpStatusCode.NotFound,
      message: `No Fuel Emission Factor found in region ${region}`,
    });
  }

  const data: FuelEmissionFactor[] = [];
  documents.forEach((doc) => {
    const factor = validateInput(
      doc.data(),
      fuelEmissionFactorSchema,
      "Received unexpected Fuel Emission Factor format from the database."
    );

    data.push(<FuelEmissionFactor>factor);
  });

  return data;
}

/**
 * Get all the Fuel emission factors with same source
 * @param {string} source - The fuel emission factor source
 * @returns {Promise<FuelEmissionFactor>} - The found Fuel emission factors
 */
async function getFuelEmissionFactorBySource(source: string): Promise<FuelEmissionFactor[]> {
  const documents = await db
    .collection(fuelEmissionFactorsCollection)
    .where("source", "==", source)
    .get();

  if (documents.empty) {
    throw new CustomError({
      status: HttpStatusCode.NotFound,
      message: `No Fuel Emission Factor found with source ${source}`,
    });
  }

  const data: FuelEmissionFactor[] = [];
  documents.forEach((doc) => {
    const factor = validateInput(
      doc.data(),
      fuelEmissionFactorSchema,
      "Received unexpected Fuel Emission Factor format from the database."
    );

    data.push(<FuelEmissionFactor>factor);
  });

  return data;
}

/**
 * Function to create a new fuel emission factor and store it in the DB
 * @param {object} data - The multiple data to create a new fuel emission factor
 * @returns {Promise<Partial<FuelEmissionFactor>>} - The saved fuel emission factor in the DB
 */
async function createFuelEmissionFactor(
  data: unknown
): Promise<FuelEmissionFactor> {
  const factor = validateInput(
    data,
    fuelEmissionFactorSchema,
    "Could not create a Fuel Emission Factor from the given data"
  );

  await db.collection(fuelEmissionFactorsCollection).doc(uuid()).set(factor);
  return factor;
}

/**
 * Function to create multiple new fuel emission factors and store it in the DB
 * @param {object[]} data - The multiple data to create multiple new fuel emission factors
 * @returns {Promise<Partial<FuelEmissionFactor>[]>} - The saved fuel emission factors in the DB
 */
async function createFuelEmissionFactors(
  data: unknown
): Promise<FuelEmissionFactor[]> {
  const validatedFactors = validateInput(
    data,
    z.array(fuelEmissionFactorSchema),
    "Could not create a Fuel Emission Factor from the given data"
  );

  const factors = [];

  const batch = db.batch();

  for (const factor of validatedFactors) {
    batch.set(db.collection("fuel_emission_factors").doc(uuid()), factor);

    batch.set(
      db.collection(fuelEmissionFactorsCollection).doc(uuid()),
      factor
    );

    factors.push(factor);
  }

  await batch.commit();
  return factors;
}

async function getAllFuelEmissionFactors() {
  const factors = (await db.collection("fuel_emission_factors").get()).docs.map(
    (doc) => doc.data()
  );

  const validatedFactors = validateInput(
    factors,
    z.array(fuelEmissionFactorSchema),
    "Received unexpected emissionFactor format from the database."
  );

  return validatedFactors;
}

async function getFuelEmissionFactorByFuel(fuelCode: string) {
  const document = await db
    .collection("fuel_emission_factors")
    .where(
      Filter.or(
        Filter.where("fuel.code", "==", fuelCode),
        Filter.where("fuel.name", "==", fuelCode)
      )
    )
    .limit(2)
    .get();

  if (document.size === 0) {
    throw new CustomError({
      status: HttpStatusCode.NotFound,
      message: `Emission factor for fuel ${fuelCode} not found.`,
    });
  }
  if (document.size > 1) {
    throw new CustomError({
      status: HttpStatusCode.InternalServerError,
      message: `Multiple emission factors for fuel ${fuelCode} found.`,
    });
  }

  const data = validateInput(
    document.docs[0].data(),
    fuelEmissionFactorSchema,
    "Received unexpected emissionFactor format from the database."
  );

  return data;
}

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

  await db.collection("intensity_emission_factors").doc(uuid()).set(factor);
  return factor;
}

export const EmissionFactorService = {
  return (await db.collection(intensityEmissionFactorsCollection).add(factor)).get();
}

export const EmissionFactorService = {
  getFuelEmissionFactors,
  getFuelEmissionFactorById,
  getFuelEmissionFactorByCode,
  getFuelEmissionFactorByRegion,
  getFuelEmissionFactorBySource,
  createFuelEmissionFactor,
  createFuelEmissionFactors,
  createIntensityEmissionFactor,
  getAll,
  getByActivityId,
  getByUnitType,
  saveEmissionFactor,
  getAllFuelEmissionFactors,
  getFuelEmissionFactorByFuel,
};

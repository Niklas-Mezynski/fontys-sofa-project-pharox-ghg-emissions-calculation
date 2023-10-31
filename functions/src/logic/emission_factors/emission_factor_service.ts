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

/**
 * Fetches the emission factors from the Climatiq API and saves them in the database.
 * @returns The emission factors.
 */
async function getAll() {
  const factors = await db.collection("emission_factors").get();
  return factors.docs.map((doc) => doc.data());
}

/**
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
 * Function save emission factors in the DB
 * @param {EmissionFactor} factor - the emission factor to save
 */
async function saveEmissionFactor(factor: EmissionFactor) {
  const docRef = db.collection("emission_factors").doc(factor.activityId);

  await docRef.set(factor);
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

  await db.collection("fuel_emission_factors").doc(uuid()).set(factor);
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

    factors.push(factor);
  }

  await batch.commit();
  return factors;
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
  createFuelEmissionFactor,
  createFuelEmissionFactors,
  createIntensityEmissionFactor,
  getAll,
  getByActivityId,
  getByUnitType,
  saveEmissionFactor,
};

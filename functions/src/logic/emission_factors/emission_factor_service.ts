import { HttpStatusCode } from "axios";
import { db } from "../..";
import {
  EmissionFactor,
  emissionFactorSchema,
} from "../../models/emission_factors/climatiq_emission_factors";
import { CustomError } from "../../utils/errors";
import { validateInput } from "../../utils/functions";

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

async function create()

export const EmissionFactorService = {
  getAll,
  getByActivityId,
  saveEmissionFactor,
  getByUnitType,
};

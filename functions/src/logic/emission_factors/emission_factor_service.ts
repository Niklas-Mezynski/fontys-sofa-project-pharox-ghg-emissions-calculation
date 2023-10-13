import { HttpStatusCode } from "axios";
import { db } from "../..";
import { CustomError } from "../../utils/errors";

/**
 * Fetches the emission factors from the Climatiq API and saves them in the database.
 * @return {Promise<FirebaseFirestore.DocumentData[]>} the emission factors.
 */
async function getAll() {
  const factors = await db.collection("emission_factors").get();
  return factors.docs.map((doc) => doc.data());
}

/**
 * Fetches the emission factor from the Climatiq API and saves it in the database.
 * @param {string} activityId
 * @return {Promise<FirebaseFirestore.DocumentData>} the emission factor.
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

  return document.data();
}

export const EmissionFactorService = {
  getAll,
  getByActivityId,
};

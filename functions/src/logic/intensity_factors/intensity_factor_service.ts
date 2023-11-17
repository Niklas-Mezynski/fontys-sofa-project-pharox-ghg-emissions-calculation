import { HttpStatusCode } from "axios";
import { v4 as uuid } from "uuid";
import { db } from "../..";
import { validateInput } from "../../utils/functions";
import { roadIntensityFactorSchema } from "../../models/emission_factors/road_intensity_factors";
import {
  removeRoadEmissionIntensityFactorSchema,
  updateRoadEmissionIntensityFactorSchema,
} from "../../models/intensity_factors/intensity_factors_schemas";
import { CustomError } from "../../utils/errors";

/**
 * Creates new road intensity factor and inserts it into the database.
 * @param data = roadIntensityFactor
 */
export async function createIntensityFactor(data: object) {
  const validatedInput = validateInput(data, roadIntensityFactorSchema);
  await db.collection("intensity_factors_road").doc(uuid()).set(validatedInput);
}

/**
 * Updates a road intensity factor
 * @param data = the new schema
 * @param identifier = the identifier to update
 */
export async function updateIntensityFactor(data: object, identifier: string) {
  const validatedInput = validateInput(
    data,
    updateRoadEmissionIntensityFactorSchema
  );

  // Attempt to Fetch document with the identifier.
  const fetchDocument = await db
    .collection("intensity_factors_road")
    .doc(identifier)
    .get();

  // If Exist: Update. Else, throw error.
  if (fetchDocument.exists) {
    await db
      .collection("intensity_factors_road")
      .doc(identifier)
      .set(validatedInput);
  } else {
    throw new CustomError({
      status: HttpStatusCode.BadRequest,
      message:
        "No Road Intensity Factor exists with the identifier: " + identifier,
    });
  }
}

/**
 * Removes an intensity factor by ID.
 * @param data = the entire JSON body to validate if identifier is present
 * @param identifier = the identifier
 */
export async function removeIntensityFactor(data: object, identifier: string) {
  validateInput(data, removeRoadEmissionIntensityFactorSchema);

  // Attempt to Fetch document with the identifier.
  const fetchDocument = await db
    .collection("intensity_factors_road")
    .doc(identifier)
    .get();

  // If Exist: Update. Else, throw error.
  if (fetchDocument.exists) {
    await db.collection("intensity_factors_road").doc(identifier).delete();
  } else {
    throw new CustomError({
      status: HttpStatusCode.BadRequest,
      message:
        "No Road Intensity Factor exists with the identifier: " + identifier,
    });
  }
}

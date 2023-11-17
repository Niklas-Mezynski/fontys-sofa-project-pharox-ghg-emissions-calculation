import { HttpStatusCode } from "axios";
import { validateInput } from "../../utils/functions";
import { roadIntensityFactorSchema } from "../../models/emission_factors/road_intensity_factors";
import {
  removeRoadEmissionIntensityFactorSchema,
  updateRoadEmissionIntensityFactorSchema,
} from "../../models/intensity_factors/intensity_factors_schemas";
import { CustomError } from "../../utils/errors";
import { FirestoreUtil } from "../../utils/firestore";

/**
 * Creates new road intensity factor and inserts it into the database.
 * @param data = roadIntensityFactor
 */
export async function createIntensityFactor(data: object) {
  const validatedInput = validateInput(data, roadIntensityFactorSchema);
  await FirestoreUtil.createWithCustomId("intensity_factors_road", validatedInput);
  // await db.collection("intensity_factors_road").doc(uuid()).set(validatedInput);
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

  const updatedFactor = await FirestoreUtil.updateById("intensity_factors_road", identifier, validatedInput);

  if(!updatedFactor){
    throw new CustomError({
      status: HttpStatusCode.BadRequest,
      message:
        "No Road Intensity Factor exists with the identifier: " + identifier,
    });
  }

  // // Attempt to Fetch document with the identifier.
  // const fetchDocument = await db
  //   .collection("intensity_factors_road")
  //   .doc(identifier)
  //   .get();

  // // If Exist: Update. Else, throw error.
  // if (fetchDocument.exists) {
  //   await db
  //     .collection("intensity_factors_road")
  //     .doc(identifier)
  //     .set(validatedInput);
  // } else {
  //   throw new CustomError({
  //     status: HttpStatusCode.BadRequest,
  //     message:
  //       "No Road Intensity Factor exists with the identifier: " + identifier,
  //   });
  // }
}

/**
 * Removes an intensity factor by ID.
 * @param data = the entire JSON body to validate if identifier is present
 * @param identifier = the identifier
 */
export async function removeIntensityFactor(data: object, identifier: string) {
  validateInput(data, removeRoadEmissionIntensityFactorSchema);

  await FirestoreUtil.deleteById("intensity_factors_road", identifier);

  const deletedFactor = await FirestoreUtil.getById("intensity_factors_road", identifier);

  if(deletedFactor){
    throw new CustomError({
      status: HttpStatusCode.BadRequest,
      message:
        "No Road Intensity Factor exists with the identifier: " + identifier,
    });
  }

  // // Attempt to Fetch document with the identifier.
  // const fetchDocument = await db
  //   .collection("intensity_factors_road")
  //   .doc(identifier)
  //   .get();

  // // If Exist: Update. Else, throw error.
  // if (fetchDocument.exists) {
  //   await db.collection("intensity_factors_road").doc(identifier).delete();
  // } else {
  //   throw new CustomError({
  //     status: HttpStatusCode.BadRequest,
  //     message:
  //       "No Road Intensity Factor exists with the identifier: " + identifier,
  //   });
  // }
}

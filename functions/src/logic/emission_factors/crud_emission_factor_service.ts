import { HttpStatusCode } from "axios";
import { z } from "zod";
import { CustomError } from "../../utils/errors";
import { FirestoreUtil } from "../../utils/firestore";
import { validateInput } from "../../utils/functions";

const factorSpecificData = {
  FUEL: {
    collectionName: "fuel_emission_factors",
  },
  ROAD: {
    collectionName: "intensity_factors_road",
  },
} as const;

type FactorType = keyof typeof factorSpecificData;

/**
 * Creates new road intensity factor and inserts it into the database.
 * @param data = roadIntensityFactor
 */
async function createEmissionFactor(
  data: unknown,
  validationSchema: z.Schema,
  type: FactorType
) {
  const validatedInput = validateInput(data, validationSchema);
  await FirestoreUtil.createWithCustomId(
    factorSpecificData[type].collectionName,
    validatedInput
  );
}

/**
 * Creates new road intensity factor and inserts it into the database.
 * @param data = roadIntensityFactor
 */
async function createEmissionFactors(
  data: unknown,
  validationSchema: z.Schema,
  type: FactorType
) {
  const validatedInput = validateInput(data, z.array(validationSchema));
  await FirestoreUtil.createManyWithCustomId(
    factorSpecificData[type].collectionName,
    validatedInput
  );
}

/**
 * Updates a road intensity factor
 * @param data = the new schema
 * @param identifier = the identifier to update
 */
async function updateEmissionFactor(
  data: object,
  identifier: string,
  validationSchema: z.Schema,
  type: FactorType
) {
  const validatedInput = validateInput(data, validationSchema);

  const updatedFactor = await FirestoreUtil.updateById(
    factorSpecificData[type].collectionName,
    identifier,
    validatedInput
  );

  if (!updatedFactor) {
    throw new CustomError({
      status: HttpStatusCode.NotFound,
      message: `No ${type} Emission Factor exists with the identifier: ${identifier}`,
    });
  }
}

/**
 * Removes an intensity factor by ID.
 * @param data = the entire JSON body to validate if identifier is present
 * @param identifier = the identifier
 */
async function deleteEmissionFactor(identifier: string, type: FactorType) {
  const factorToDelete = await FirestoreUtil.getById(
    factorSpecificData[type].collectionName,
    identifier
  );

  if (!factorToDelete) {
    throw new CustomError({
      status: HttpStatusCode.NotFound,
      message: `No ${type} Emission Factor exists with the identifier: ${identifier}`,
    });
  }

  await FirestoreUtil.deleteById(
    factorSpecificData[type].collectionName,
    identifier
  );
}

export const CRUDEmissionFactorService = {
  createEmissionFactor,
  createEmissionFactors,
  updateEmissionFactor,
  deleteEmissionFactor,
};

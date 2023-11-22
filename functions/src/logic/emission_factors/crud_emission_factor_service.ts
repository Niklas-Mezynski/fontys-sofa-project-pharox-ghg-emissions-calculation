import { HttpStatusCode } from "axios";
import { ZodSchema, z } from "zod";
import { fuelEmissionFactorSchema } from "../../models/emission_factors/fuel_emission_factors";
import { roadIntensityFactorSchema } from "../../models/emission_factors/road_intensity_factors";
import { CustomError } from "../../utils/errors";
import { FirestoreUtil } from "../../utils/firestore";
import { validateInput } from "../../utils/functions";

const factorSpecificData = {
  FUEL: {
    collectionName: "fuel_emission_factors",
    validationSchema: fuelEmissionFactorSchema,
  },
  ROAD: {
    collectionName: "intensity_factors_road",
    validationSchema: roadIntensityFactorSchema,
  },
} as const;

type FactorType = keyof typeof factorSpecificData;

type FactorSpecificReturnType<T extends FactorType> =
  (typeof factorSpecificData)[T]["validationSchema"]["_output"];

/**
 * Gets all emission factors of a specific type.
 * @param type = the type of emission factor
 */
async function getEmissionFactorById<T extends FactorType>(
  id: string,
  type: T
): Promise<FactorSpecificReturnType<T>> {
  const result = await FirestoreUtil.getById(
    factorSpecificData[type].collectionName,
    id
  );
  return validateInput(
    result,
    factorSpecificData[type].validationSchema as ZodSchema,
    `Received unexpected ${type} Emission Factor format from the database.`
  );
}

/**
 * Gets all emission factors of a specific type.
 * @param type = the type of emission factor
 * @returns A list of all emission factors of the given type.
 */
async function getEmissionFactors<T extends FactorType>(
  type: T
): Promise<FactorSpecificReturnType<T>[]> {
  const result = await FirestoreUtil.getAll(
    factorSpecificData[type].collectionName
  );
  return validateInput(
    result,
    z.array(factorSpecificData[type].validationSchema),
    `Received unexpected ${type} Emission Factors format from the database.`
  );
}

/**
 * Creates new road intensity factor and inserts it into the database.
 * @param data = roadIntensityFactor
 */
async function createEmissionFactor<T extends FactorType>(
  data: unknown,
  type: T
) {
  const validatedInput = validateInput(
    data,
    factorSpecificData[type].validationSchema as ZodSchema
  );
  await FirestoreUtil.createWithCustomId(
    factorSpecificData[type].collectionName,
    validatedInput
  );
}

/**
 * Creates new road intensity factor and inserts it into the database.
 * @param data = roadIntensityFactor
 */
async function createEmissionFactors<T extends FactorType>(
  data: unknown,
  type: T
): Promise<FactorSpecificReturnType<T>[]> {
  const validatedInput = validateInput(
    data,
    z.array(factorSpecificData[type].validationSchema)
  );
  const result = await FirestoreUtil.createManyWithCustomId(
    factorSpecificData[type].collectionName,
    validatedInput
  );

  return result as never;
}

/**
 * Updates a road intensity factor
 * @param data = the new schema
 * @param identifier = the identifier to update
 */
async function updateEmissionFactor<T extends FactorType>(
  data: object,
  identifier: string,
  type: T
): Promise<FactorSpecificReturnType<T>> {
  const validatedInput = validateInput(
    data,
    factorSpecificData[type].validationSchema as ZodSchema
  );

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

  return updatedFactor as never;
}

/**
 * Removes an intensity factor by ID.
 * @param data = the entire JSON body to validate if identifier is present
 * @param identifier = the identifier
 */
async function deleteEmissionFactor<T extends FactorType>(
  identifier: string,
  type: T
) {
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
  getEmissionFactorById,
  getEmissionFactors,
  createEmissionFactor,
  createEmissionFactors,
  updateEmissionFactor,
  deleteEmissionFactor,
};

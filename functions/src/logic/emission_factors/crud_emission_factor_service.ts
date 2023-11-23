import { HttpStatusCode } from "axios";
import { ZodSchema, z } from "zod";
import { fuelEmissionFactorSchema } from "../../models/emission_factors/fuel_emission_factors";
import { roadIntensityFactorSchema } from "../../models/emission_factors/road_intensity_factors";
import { CustomError } from "../../utils/errors";
import { FirestoreUtil } from "../../utils/firestore";
import { validateInput } from "../../utils/functions";

// Data specific to each factor type to perform schema validation and Firestore operations
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

type FactorSpecificReturnType<T extends FactorType> = z.infer<
  (typeof factorSpecificData)[T]["validationSchema"]
>;

/** CREATE METHODS */

/**
 * Create emission factors of a specific type and store it in the database.
 * @param {unknown} data - The data to be stored in the database.
 * @param {FactorType} type - The type of emission factor.
 * @returns The created emission factor.
 */
async function createEmissionFactor<T extends FactorType>(
  data: unknown,
  type: T
) {
  const validatedInput = validateInput(
    data,
    factorSpecificData[type].validationSchema
  );
  return FirestoreUtil.createWithCustomId(
    factorSpecificData[type].collectionName,
    validatedInput
  );
}

/**
 * Creates multiple emission factors of a specific type and store them in the database.
 * @param {unknown} data - The data to be stored in the database.
 * @param {FactorType} type - The type of emission factor.
 * @returns The created emission factors.
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

  return result;
}

/** READ METHODS */

/**
 * Get an emission factor by ID of a specific type.
 * @param {string} id - The ID of the emission factor.
 * @param {FactorType} type - The type of emission factor.
 * @returns The emission factor with the given ID.
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
    factorSpecificData[type].validationSchema,
    `Received unexpected ${type} Emission Factor format from the database.`
  );
}

/**
 * Gets all emission factors of a specific type.
 * @param {FactorType} type - The type of emission factor.
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

/** UPDATE METHODS */

/**
 * Update a emission factor by ID of a specific type.
 * @param {unknown} data - The data to be updated.
 * @param {string} identifier - The ID of the emission factor.
 * @param {FactorType} type - The type of emission factor.
 * @returns The updated emission factor.
 */
async function updateEmissionFactor<T extends FactorType>(
  data: object,
  identifier: string,
  type: T
): Promise<FactorSpecificReturnType<T>> {
  const validatedInput = validateInput(
    data,
    factorSpecificData[type].validationSchema
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

  return updatedFactor;
}

/** DELETE METHODS */

/**
 * Delete an emission factor by ID of a specific type.
 * @param {string} identifier - The ID of the emission factor.
 * @param {FactorType} type - The type of emission factor.
 * @returns {Promise<void>}
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

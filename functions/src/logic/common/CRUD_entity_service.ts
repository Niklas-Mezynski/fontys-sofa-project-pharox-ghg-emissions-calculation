import { HttpStatusCode } from "axios";
import { z } from "zod";
import { fuelEmissionFactorSchema, fuelSchema } from "../../models/emission_factors/fuel_emission_factors";
import { roadIntensityFactorSchema, vehicleSchema } from "../../models/emission_factors/road_intensity_factors";
import { CustomError } from "../../utils/errors";
import { FirestoreUtil } from "../../utils/firestore";
import { validateInput } from "../../utils/functions";
import { calculationReportSchema } from "../../models/emission_calculations/emission_calculation_model";
import { UnknownObject } from "../../utils/types";

// Data specific to each entity type to perform schema validation and Firestore operations
const entitySpecificData = {
  FUEL_FACTOR: {
    entityName: "Fuel Emission Factor",
    collectionName: "fuel_emission_factors",
    validationSchema: fuelEmissionFactorSchema,
  },
  ROAD_FACTOR: {
    entityName: "Road Intensity Emission Factor",
    collectionName: "intensity_factors_road",
    validationSchema: roadIntensityFactorSchema,
  },
  REPORT: {
    entityName: "Emission Calculation Report",
    collectionName: "emission_calculation_reports",
    validationSchema: calculationReportSchema,
  },
  FUEL: {
    entityName: "Fuel",
    collectionName: "fuels",
    validationSchema: fuelSchema,
  },
  VEHICLE: {
    entityName: "Vehicle",
    collectionName: "vehicles",
    validationSchema: vehicleSchema,
  },
} as const;

type EntityType = keyof typeof entitySpecificData;

type EntitySpecificReturnType<T extends EntityType> = z.infer<
  (typeof entitySpecificData)[T]["validationSchema"]
>;

/** CREATE METHODS */

/**
 * Create an entity of a specific type and store it in the database.
 * @param {UnknownObject} data - The data to be stored in the database.
 * @param {EntityType} type - The type of the entity.
 * @returns {Promise<EntitySpecificReturnType<T> | undefined>} The created entity.
 */
async function createEntity<T extends EntityType>(
  data: UnknownObject,
  type: T
): Promise<EntitySpecificReturnType<T> | undefined> {
  const validatedInput = validateInput(
    data,
    entitySpecificData[type].validationSchema
  );

  return FirestoreUtil.createWithCustomId(
    entitySpecificData[type].collectionName,
    validatedInput
  );
}

/**
 * Creates multiple entities of a specific type and store them in the database.
 * @param {UnknownObject[]} data - The data to be stored in the database.
 * @param {EntityType} type - The type of the entity.
 * @returns {Promise<EntitySpecificReturnType<T>[]>} The created entities.
 */
async function createEntities<T extends EntityType>(
  data: UnknownObject[],
  type: T
): Promise<EntitySpecificReturnType<T>[]> {
  const validatedInput = validateInput(
    data,
    z.array(entitySpecificData[type].validationSchema)
  );

  const result = await FirestoreUtil.createManyWithCustomId(
    entitySpecificData[type].collectionName,
    validatedInput
  );

  return result;
}

/** READ METHODS */

/**
 * Get an entity by ID of a specific type.
 * @param {string} id - The ID of the entity.
 * @param {EntityType} type - The type of the entity.
 * @returns {Promise<EntitySpecificReturnType<T>>} The entity with the given ID.
 */
async function getEntityById<T extends EntityType>(
  id: string,
  type: T
): Promise<EntitySpecificReturnType<T>> {
  const result = await FirestoreUtil.getById(
    entitySpecificData[type].collectionName,
    id
  );

  if(!result) {
    throw new CustomError({
      status: HttpStatusCode.NotFound,
      message: `${entitySpecificData[type].entityName} not found with ID ${id}.`,
    });
  }

  return validateInput(
    result,
    entitySpecificData[type].validationSchema,
    `Received unexpected ${entitySpecificData[type].entityName} format from the database.`
  );
}

/**
 * Gets all entities of a specific type.
 * @param {EntityType} type - The type of the entity.
 * @returns {Promise<EntitySpecificReturnType<T>[]>} A list of all entities of the given type.
 */
async function getEntities<T extends EntityType>(
  type: T
): Promise<EntitySpecificReturnType<T>[]> {
  const result = await FirestoreUtil.getAll(
    entitySpecificData[type].collectionName
  );

  return validateInput(
    result,
    z.array(entitySpecificData[type].validationSchema),
    `Received unexpected ${entitySpecificData[type].entityName} format from the database.`
  );
}

/** UPDATE METHODS */

/**
 * Update an entity by ID of a specific type.
 * @param {UnknownObject} data - The data to be updated.
 * @param {string} id - The ID of the entity.
 * @param {EntityType} type - The type of the entity.
 * @returns {Promise<EntitySpecificReturnType<T>>} The updated entity.
 */
async function updateEntity<T extends EntityType>(
  data: UnknownObject,
  id: string,
  type: T
): Promise<EntitySpecificReturnType<T>> {
  const validatedInput = validateInput(
    data,
    entitySpecificData[type].validationSchema
  );

  const updatedFactor = await FirestoreUtil.updateById(
    entitySpecificData[type].collectionName,
    id,
    validatedInput
  );

  if (!updatedFactor) {
    throw new CustomError({
      status: HttpStatusCode.NotFound,
      message: `No ${entitySpecificData[type].entityName} exists with ID ${id}`,
    });
  }

  return updatedFactor;
}

/** DELETE METHODS */

/**
 * Delete an entity by ID of a specific type.
 * @param {string} id - The ID of the entity.
 * @param {EntityType} type - The type of the entity.
 * @returns {Promise<void>}
 */
async function deleteEntity<T extends EntityType>(
  id: string,
  type: T
): Promise<void> {
  const factorToDelete = await FirestoreUtil.getById(
    entitySpecificData[type].collectionName,
    id
  );

  if (!factorToDelete) {
    throw new CustomError({
      status: HttpStatusCode.NotFound,
      message: `No ${entitySpecificData[type].entityName} exists with ID ${id}`,
    });
  }

  await FirestoreUtil.deleteById(
    entitySpecificData[type].collectionName,
    id
  );
}

export const CRUDEntityService = {
  createEntity,
  createEntities,
  getEntityById,
  getEntities,
  updateEntity,
  deleteEntity,
  entitySpecificData,
};

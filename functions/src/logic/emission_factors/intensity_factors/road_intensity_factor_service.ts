import { RoadTransportDetails } from "../../../models/emission_calculations/emission_calculation_model";
import {
  RoadIntensityFactor,
  roadIntensityFactorSchema,
} from "../../../models/emission_factors/road_intensity_factors";
import { FirestoreUtil } from "../../../utils/firestore";
import { validateInput } from "../../../utils/functions";
import { z } from "zod";
import { Filter } from "firebase-admin/firestore";


const roadIntensityFactorsCollection = "intensity_factors_road";

/**
 * Function to get all road intensity factors
 * @returns {RoadIntensityFactor[]} All road intensity factors
 */
async function getAll(): Promise<RoadIntensityFactor[]> {
  const factors = await FirestoreUtil.getAll(roadIntensityFactorsCollection);
  return validateInput(
    factors,
    z.array(roadIntensityFactorSchema),
    "Received unexpected Road Intensity Factors format from the database."
  );
}

/**
 * Function to create road intensity factors
 * @param {unknown} data - Data to create road intensity factors from
 * @returns {Promise<RoadIntensityFactor[]>} - Array of created road intensity factors
 */
async function createRoadIntensityFactors(
  data: unknown
): Promise<RoadIntensityFactor[]> {
  const validatedFactors = validateInput(
    data,
    z.union([
      z.array(roadIntensityFactorSchema).nonempty(),
      roadIntensityFactorSchema,
    ]),
    "Could not create Intensity Factors for road from the given data"
  );

  const factorsToCreate = Array.isArray(validatedFactors)
    ? validatedFactors
    : [validatedFactors];

  const factors = await FirestoreUtil.createManyWithCustomId(roadIntensityFactorsCollection, factorsToCreate)
  return validateInput(
    factors,
    z.array(roadIntensityFactorSchema),
    "Received unexpected Road Intensity Factors format from the database."
  );
}

/**
 *
 * @param data
 * @returns
 */
async function getSpecificIntensityFactor(
  data: RoadTransportDetails,
  region: string ): Promise<RoadIntensityFactor>{

  const filter = Filter.and(
    Filter.where("fuel.code", "==", data.fuelCode ?? null),
    Filter.or(
      Filter.where("region", "==", region),
      Filter.where("region", "==", "INTERNATIONAL")
    ),
    Filter.or(
      Filter.where("vehicle.weight.lower", ">=", data.vehicle.weight.value),
      Filter.where("vehicle.weight.upper", "<=", data.vehicle.weight.value),
    ),
    Filter.where("vehicle.weight.unit", "==", data.vehicle.weight.unit),
    Filter.where("vehicle.code", "==", data.vehicle.code ?? null),
    Filter.where("vehicle.engineType", "==", data.vehicle.engineType ?? null),
    Filter.where("characteristics.loadCharacteristic", "==", data.characteristics.loadCharacteristic ?? null),
    Filter.where("characteristics.loadFactor", "==", data.characteristics.loadFactor ?? null),
    Filter.where("characteristics.combinedLoadFactorEmptyRunning", "==", data.characteristics.combinedLoadFactorEmptyRunning ?? null),
    Filter.where("characteristics.emptyRunning", "==", data.characteristics.emptyRunning ?? null)
  );

  const queryData = await FirestoreUtil.getByFilter(roadIntensityFactorsCollection, filter);

  const validatedQueryData = validateInput(
    queryData,
    z.array(roadIntensityFactorSchema),
    "Received unexpected Road Intensity Factors format from the database."
  )

  if(!(validatedQueryData.length > 1)){
    throw new Error("The provided data was not enough to find the correct emission factor!")
  } else if(!(queryData.length < 1)){
    throw new Error("The provided data does not corespond to any emission factor!")
  }

  return validatedQueryData[0];
}

export const RoadIntensityFactorService = {
  getAll,
  createRoadIntensityFactors,
  getSpecificIntensityFactor,
};

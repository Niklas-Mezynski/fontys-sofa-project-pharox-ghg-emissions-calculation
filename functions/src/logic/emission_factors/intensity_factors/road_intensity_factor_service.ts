import { RoadTransportDetails } from "../../../models/emission_calculations/emission_calculation_model";
import {
  RoadIntensityFactor,
  roadIntensityFactorSchema,
} from "../../../models/emission_factors/road_intensity_factors";
import { FirestoreUtil } from "../../../utils/firestore";
import { validateInput } from "../../../utils/functions";
import { z } from "zod";

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
  data: RoadTransportDetails): Promise<RoadIntensityFactor>{

  const factors:RoadIntensityFactor[] = await getAll();

  factors.filter((factor)=>{
    (factor.fuel?.code == data.fuelCode || undefined) &&
      (factor.characteristics?.loadFactor == data.characteristics.loadFactor || null || undefined) &&
      (factor.characteristics?.loadCharacteristic == data.characteristics.loadCharacteristic || null || undefined) &&
      (factor.characteristics?.emptyRunning == data.characteristics.emptyRunning || null || undefined) &&
      (factor.characteristics?.combinedLoadFactorEmptyRunning == data.characteristics.combinedLoadFactorEmptyRunning || null || undefined) &&
      (factor.vehicle?.code == data.vehicle.code || null || undefined) &&
      (factor.vehicle?.engineType == data.vehicle.engineType || null || undefined) &&
      (factor.vehicle?.weight?.unit == data.vehicle.weight.unit || undefined)
  });

  if(!(factors.length > 1)){
    throw new Error("The provided data was not enough to find the correct emission factor!")
  } else if(!(factors.length < 1)){
    throw new Error("The provided data does not corespond to any emission factor!")
  }

  return factors[0];

}

export const RoadIntensityFactorService = {
  getAll,
  createRoadIntensityFactors,
  getSpecificIntensityFactor,
};

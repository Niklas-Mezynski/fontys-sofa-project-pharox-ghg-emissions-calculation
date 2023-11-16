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
  return FirestoreUtil.getDataFromQuerySnapshot(factors);
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
  return FirestoreUtil.getDataFromDocumentReferences(factors);
}

export const RoadIntensityFactorService = {
  getAll,
  createRoadIntensityFactors,
};

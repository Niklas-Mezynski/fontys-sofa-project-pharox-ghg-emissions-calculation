import { v4 as uuid } from "uuid";
import { z } from "zod";
import { db } from "../../..";
import {
  RoadIntensityFactor,
  roadIntensityFactorSchema,
} from "../../../models/emission_factors/road_intensity_factors";
import { validateInput } from "../../../utils/functions";

const roadIntensityFactorsCollection = "intensity_factors_road";

async function getAll() {
  const factors = await db.collection(roadIntensityFactorsCollection).get();
  return factors.docs.map((doc) => doc.data());
}

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

  const factors = [];

  const batch = db.batch();

  for (const factor of factorsToCreate) {
    batch.set(
      db.collection(roadIntensityFactorsCollection).doc(uuid()),
      factor
    );
    factors.push(factor);
  }

  await batch.commit();
  return factors;
}

export const RoadIntensityFactorService = {
  getAll,
  createRoadIntensityFactors,
};

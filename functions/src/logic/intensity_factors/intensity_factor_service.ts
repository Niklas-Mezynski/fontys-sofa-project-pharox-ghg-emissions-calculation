import { HttpStatusCode } from "axios";
import { Filter } from "firebase-admin/firestore";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { db } from "../..";
import { exhaustiveMatchingGuard, validateInput } from "../../utils/functions";
import { roadIntensityFactorSchema } from "../../models/emission_factors/road_intensity_factors";

export async function createIntensityFactor(data: object) {
  const validatedInput = validateInput(data, roadIntensityFactorSchema);

  console.log("done");
}

import { Filter } from "firebase-admin/firestore";
import { z } from "zod";
import { RoadTransportDetails } from "../../../models/emission_calculations/emission_calculation_model";
import {
  RoadIntensityFactor,
  roadIntensityFactorSchema,
} from "../../../models/emission_factors/road_intensity_factors";
import { FirestoreUtil } from "../../../utils/firestore";
import { validateInput } from "../../../utils/functions";

// The Firestore collection name refering to the Road intensity factors
const roadIntensityFactorsCollection = "intensity_factors_road";

/**
 * Algorithm to get the road intensity factor to be used in the emission calculation according to the data input.
 * @param {RoadTransportDetails} data - The data input.
 * @returns {Promise<RoadIntensityFactor>} - The found Road intensity factor.
 */
async function getSpecificIntensityFactor(
  data: RoadTransportDetails,
  region: string
): Promise<RoadIntensityFactor> {
  const filter = Filter.and(
    Filter.where("fuel.code", "==", data.fuelCode ?? null),
    Filter.or(
      Filter.where("region", "==", region),
      Filter.where("region", "==", "INTERNATIONAL")
    ),
    Filter.or(
      Filter.where("vehicle.weight.lower", ">=", data.vehicle.weight.value),
      Filter.where("vehicle.weight.upper", "<=", data.vehicle.weight.value)
    ),
    Filter.where("vehicle.weight.unit", "==", data.vehicle.weight.unit),
    Filter.where("vehicle.code", "==", data.vehicle.code ?? null),
    Filter.where("vehicle.engineType", "==", data.vehicle.engineType ?? null),
    Filter.where(
      "characteristics.loadCharacteristic",
      "==",
      data.characteristics.loadCharacteristic ?? null
    ),
    Filter.where(
      "characteristics.loadFactor",
      "==",
      data.characteristics.loadFactor ?? null
    ),
    Filter.where(
      "characteristics.combinedLoadFactorEmptyRunning",
      "==",
      data.characteristics.combinedLoadFactorEmptyRunning ?? null
    ),
    Filter.where(
      "characteristics.emptyRunning",
      "==",
      data.characteristics.emptyRunning ?? null
    )
  );

  const queryData = await FirestoreUtil.getByFilter(
    roadIntensityFactorsCollection,
    filter
  );

  const validatedQueryData = validateInput(
    queryData,
    z.array(roadIntensityFactorSchema),
    "Received unexpected Road Intensity Factors format from the database."
  );

  if (!(validatedQueryData.length > 1)) {
    throw new Error(
      "The provided data was not enough to find the correct emission factor!"
    );
  } else if (!(queryData.length < 1)) {
    throw new Error(
      "The provided data does not correspond to any emission factor!"
    );
  }

  return validatedQueryData[0];
}

export const RoadIntensityFactorService = {
  getSpecificIntensityFactor,
};

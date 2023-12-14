import { Filter } from "firebase-admin/firestore";
import { z } from "zod";
import { RoadTransportDetails } from "../../../models/emission_calculations/emission_calculation_model";
import {
  RoadIntensityFactor,
  roadIntensityFactorSchema,
} from "../../../models/emission_factors/road_intensity_factors";
import { FirestoreUtil } from "../../../utils/firestore";
import { validateInput } from "../../../utils/functions";
import { CustomError } from "../../../utils/errors";
import { HttpStatusCode } from "axios";

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
  // Do a first filter on refrigereted vehicles and calculation region
  const filter = Filter.and(
    Filter.where("refrigerated", "==", data.refrigerated),
    Filter.where("region", "in", [region, "INTERNATIONAL"])
  );

  const queryData = await FirestoreUtil.getByFilter(
    roadIntensityFactorsCollection,
    filter
  );

  let validatedQueryData = validateInput(
    queryData,
    z.array(roadIntensityFactorSchema),
    "Received unexpected Road Intensity Factors format from the database."
  );

  // Indicator to know if we have to look for a default road intensity emission factor
  let useDefault = true;

  // Filter the data according to vehicle input if it exists
  const vehicleFilteredFactorsObject = filterFactorsByVehicle(
    data,
    validatedQueryData,
    useDefault
  );
  validatedQueryData = vehicleFilteredFactorsObject.factors;
  useDefault = vehicleFilteredFactorsObject.useDefault;

  // Filter the data according to characteristics input if it exists
  const characteristicsFilteredFactorsObject = filterFactorsByCharacteristics(
    data,
    validatedQueryData,
    useDefault
  );
  validatedQueryData = characteristicsFilteredFactorsObject.factors;
  useDefault = characteristicsFilteredFactorsObject.useDefault;

  // Filter the data according to fuel input if it exists
  const fuelFilteredFactorsObject = filterFactorsByFuel(
    data,
    validatedQueryData,
    useDefault
  );
  validatedQueryData = fuelFilteredFactorsObject.factors;
  useDefault = fuelFilteredFactorsObject.useDefault;

  // In case we have more than one result, check if we can use the default road intensity emission factor
  // Default factor -> only provides vehicle info (code and weight)
  if (validatedQueryData.length > 1) {
    if (useDefault && data.vehicle.code) {
      validatedQueryData = filterDefaultFactor(validatedQueryData);
    }

    if (validatedQueryData.length > 1) {
      throw new CustomError({
        message:
          "The provided data was not enough to find the correct emission factor!",
        status: HttpStatusCode.BadRequest,
      });
    }
  }

  if (queryData.length === 0) {
    throw new CustomError({
      message: "The provided data does not corespond to any emission factor!",
      status: HttpStatusCode.BadRequest,
    });
  }

  return validatedQueryData[0];
}

/**
 * Helper function to filter given factors by vehicle if exists
 * @param {RoadTransportDetails} dataInput - The user input road transport details
 * @param {RoadIntensityFactor[]} factors - The road intensity emission factors
 * @param {boolean} useDefault - The indicator to know if we have to look for a default road intensity emission factor
 * @returns {{factors: RoadIntensityFactor[], useDefault: boolean}} - Object containing the filtered road intensity emission factors and the use default emission factor indicator
 */
export function filterFactorsByVehicle(
  dataInput: RoadTransportDetails,
  factors: RoadIntensityFactor[],
  useDefault: boolean
): { factors: RoadIntensityFactor[]; useDefault: boolean } {
  const output = { factors, useDefault };
  const vehicle = dataInput.vehicle;

  // Do the filter if vehicle code and weight is provided
  if (
    vehicle.code &&
    vehicle.weight &&
    vehicle.weight.unit &&
    vehicle.weight.value
  ) {
    output.factors = output.factors.filter(
      (d) =>
        (d.vehicle?.code === vehicle.code ||
          (vehicle.code && d.vehicle?.code.includes(vehicle.code))) &&
        d.vehicle?.weight?.unit === vehicle.weight.unit &&
        ((!d.vehicle.weight.lower &&
          d.vehicle.weight.upper &&
          vehicle.weight.value < d.vehicle.weight.upper) || // Lower than upper limit
          (d.vehicle.weight.lower &&
            vehicle.weight.value >= d.vehicle.weight.lower &&
            d.vehicle.weight.upper &&
            vehicle.weight.value < d.vehicle.weight.upper) || // Greater or equal to lower limit and lower than upper limit
          (d.vehicle.weight.lower &&
            !d.vehicle.weight.upper &&
            vehicle.weight.value >= d.vehicle.weight.lower)) // Greater or equal to lower limit
    );

    // Extra filter in case engine type is provided
    if (vehicle.engineType) {
      output.factors = output.factors.filter(
        (d) => d.vehicle?.engineType === vehicle.engineType
      );
      output.useDefault = false;
    }
  }

  return output;
}

/**
 * Helper funtion to filter given factors by transport characteristics if exists
 * @param {RoadTransportDetails} dataInput - The user input road transport details
 * @param {RoadIntensityFactor[]} factors - The road intensity emission factors
 * @param {boolean} useDefault - The indicator to know if we have to look for a default road intensity emission factor
 * @returns {{factors: RoadIntensityFactor[], useDefault: boolean}} - Object containing the filtered road intensity emission factors and the use default emission factor indicator
 */
export function filterFactorsByCharacteristics(
  dataInput: RoadTransportDetails,
  factors: RoadIntensityFactor[],
  useDefault: boolean
): { factors: RoadIntensityFactor[]; useDefault: boolean } {
  const output = { factors, useDefault };
  const characteristics = dataInput.characteristics;

  if (characteristics) {
    if (characteristics.emptyRunning) {
      output.factors = output.factors.filter(
        (d) => d.characteristics?.emptyRunning === characteristics.emptyRunning
      );
      output.useDefault = false;
    }

    if (characteristics.loadFactor) {
      output.factors = output.factors.filter(
        (d) => d.characteristics?.loadFactor === characteristics.loadFactor
      );
      output.useDefault = false;
    }

    if (characteristics.combinedLoadFactorEmptyRunning) {
      output.factors = output.factors.filter(
        (d) =>
          d.characteristics?.combinedLoadFactorEmptyRunning ===
          characteristics.combinedLoadFactorEmptyRunning
      );
      output.useDefault = false;
    }

    if (characteristics.loadCharacteristic) {
      output.factors = output.factors.filter(
        (d) =>
          d.characteristics?.loadCharacteristic ===
          characteristics.loadCharacteristic
      );
      output.useDefault = false;
    }
  }

  return output;
}

/**
 * Helper function to filter given factors by fuel code if exists
 * @param {RoadTransportDetails} dataInput - The user input road transport details
 * @param {RoadIntensityFactor[]} factors - The road intensity emission factors
 * @param {boolean} useDefault - The indicator to know if we have to look for a default road intensity emission factor
 * @returns {{factors: RoadIntensityFactor[], useDefault: boolean}} - Object containing the filtered road intensity emission factors and the use default emission factor indicator
 */
export function filterFactorsByFuel(
  dataInput: RoadTransportDetails,
  factors: RoadIntensityFactor[],
  useDefault: boolean
): { factors: RoadIntensityFactor[]; useDefault: boolean } {
  const output = { factors, useDefault };
  const fuelCode = dataInput.fuelCode;

  if (fuelCode) {
    output.factors = output.factors.filter((d) => d.fuel?.code === fuelCode);
    output.useDefault = false;
  }

  return output;
}

/**
 * Helper function to try to filter given factors to the the default road intensity emission factor
 * @param {RoadIntensityFactor[]} factors - The road intensity emission factors
 * @returns {RoadIntensityFactor[]} - The filtered road intensity emission factors
 */
export function filterDefaultFactor(
  factors: RoadIntensityFactor[]
): RoadIntensityFactor[] {
  // Find factor which only provides info about the vehicle
  return factors.filter(
    (d) =>
      (d.characteristics === null ||
        (d.characteristics.combinedLoadFactorEmptyRunning === null &&
          d.characteristics.emptyRunning === null &&
          d.characteristics.loadCharacteristic === null &&
          d.characteristics.loadFactor === null)) &&
      (d.fuel === null || d.fuel.code === null)
  );
}

export const RoadIntensityFactorService = {
  getSpecificIntensityFactor,
  filterFactorsByVehicle,
  filterFactorsByCharacteristics,
  filterFactorsByFuel,
  filterDefaultFactor,
};

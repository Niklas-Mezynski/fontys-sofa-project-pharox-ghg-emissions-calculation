import { HttpStatusCode } from "axios";
import { Filter } from "firebase-admin/firestore";
import { RailTransportDetails } from "../../../models/emission_calculations/emission_calculation_model";
import { RailIntensityFactor } from "../../../models/emission_factors/rail_intensity_factors";
import { CustomError } from "../../../utils/errors";
import { CRUDEntityService } from "../../common/CRUD_entity_service";

/**
 * Algorithm to get the rail intensity factor to be used in the emission calculation according to the data input.
 * @param {RailTransportDetails} data - The data input.
 * @returns {Promise<RailIntensityFactor>} - The found rail intensity factor.
 */
async function getSpecificIntensityFactor(
  data: RailTransportDetails,
  region: string
): Promise<RailIntensityFactor> {
  // Do a first filter on refrigereted vehicles and calculation region
  const filter = Filter.and(
    Filter.where("refrigerated", "==", data.refrigerated),
    Filter.where("region", "in", [region, "INTERNATIONAL"])
  );

  let queryData = await CRUDEntityService.getEntitiesByFilter(
    filter,
    "RAIL_FACTOR"
  );

  // Indicator to know if we have to look for a default rail intensity emission factor
  let useDefault = true;

  // Filter the data according to characteristics input if it exists
  const characteristicsFilteredFactorsObject = filterFactorsByCharacteristics(
    data,
    queryData,
    useDefault
  );
  queryData = characteristicsFilteredFactorsObject.factors;
  useDefault = characteristicsFilteredFactorsObject.useDefault;

  // Filter the data according to traction type input if it exists
  const tractionFilteredFactorsObject = filterFactorsByTractionType(
    data,
    queryData,
    useDefault
  );
  queryData = tractionFilteredFactorsObject.factors;
  useDefault = tractionFilteredFactorsObject.useDefault;

  // In case we have more than one result, check if we can use the default rail intensity emission factor
  // Default factor -> only provides vehicle info (code and weight)
  if (queryData.length > 1 && useDefault) {
    queryData = filterDefaultFactor(queryData);
  }

  if (queryData.length > 1) {
    throw new CustomError({
      message:
        "The provided data was not enough to find the correct emission factor!",
      status: HttpStatusCode.BadRequest,
    });
  }

  if (queryData.length === 0) {
    throw new CustomError({
      message: "The provided data does not corespond to any emission factor!",
      status: HttpStatusCode.BadRequest,
    });
  }

  return queryData[0];
}

/**
 * Helper funtion to filter given factors by transport characteristics if exists
 * @param {RailTransportDetails} dataInput - The user input rail transport details
 * @param {RailIntensityFactor[]} factors - The rail intensity emission factors
 * @param {boolean} useDefault - The indicator to know if we have to look for a default rail intensity emission factor
 * @returns {{factors: RailIntensityFactor[], useDefault: boolean}} - Object containing the filtered rail intensity emission factors and the use default emission factor indicator
 */
function filterFactorsByCharacteristics(
  dataInput: RailTransportDetails,
  factors: RailIntensityFactor[],
  useDefault: boolean
): { factors: RailIntensityFactor[]; useDefault: boolean } {
  const output = { factors, useDefault };
  const characteristics = dataInput.characteristics;

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

  if (characteristics.loadCharacteristic) {
    output.factors = output.factors.filter(
      (d) =>
        d.characteristics?.loadCharacteristic ===
        characteristics.loadCharacteristic
    );
    output.useDefault = false;
  }

  return output;
}

/**
 * Helper function to filter given factors by traction type if exists
 * @param {RailTransportDetails} dataInput - The user input rail transport details
 * @param {RailIntensityFactor[]} factors - The rail intensity emission factors
 * @param {boolean} useDefault - The indicator to know if we have to look for a default rail intensity emission factor
 * @returns {{factors: RailIntensityFactor[], useDefault: boolean}} - Object containing the filtered rail intensity emission factors and the use default emission factor indicator
 */
function filterFactorsByTractionType(
  dataInput: RailTransportDetails,
  factors: RailIntensityFactor[],
  useDefault: boolean
): { factors: RailIntensityFactor[]; useDefault: boolean } {
  const output = { factors, useDefault };
  const tractionType = dataInput.tractionType;

  output.factors = output.factors.filter(
    (d) => d.tractionType === tractionType
  );

  return output;
}

/**
 * Helper function to try to filter given factors to the the default rail intensity emission factor
 * @param {RailIntensityFactor[]} factors - The rail intensity emission factors
 * @returns {RailIntensityFactor[]} - The filtered rail intensity emission factors
 */
function filterDefaultFactor(
  factors: RailIntensityFactor[]
): RailIntensityFactor[] {
  // Find factor which only provides info about the vehicle
  return factors.filter(
    (d) =>
      d.characteristics === null ||
      (d.characteristics.emptyRunning === null &&
        d.characteristics.loadCharacteristic === null &&
        d.characteristics.loadFactor === null)
  );
}

export const RailIntensityFactorService = {
  getSpecificIntensityFactor,
};

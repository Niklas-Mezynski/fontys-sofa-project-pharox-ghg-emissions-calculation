import { CustomError } from "../../utils/errors";
import { Filter } from "firebase-admin/firestore";
import { FirestoreUtil } from "../../utils/firestore";
import {
  FuelEmissionFactor,
  fuelEmissionFactorSchema,
} from "../../models/emission_factors/fuel_emission_factors";
import { HttpStatusCode } from "axios";
import { validateInput } from "../../utils/functions";
import { z } from "zod";

// The Firestore collection name refering to the Fuel emission factors
const fuelEmissionFactorsCollection = "fuel_emission_factors";

/**
 * Get all the Fuel emission factors with same fuel code
 * @param {string} fuelCode - The fuel code
 * @returns {Promise<FuelEmissionFactor>} - The found Fuel emission factors
 */
async function getFuelEmissionFactorByFuelCode(
  fuelCode: string
): Promise<FuelEmissionFactor[]> {
  const filter = Filter.where("fuel.code", "==", fuelCode);
  const factors = await FirestoreUtil.getByFilter(
    fuelEmissionFactorsCollection,
    filter
  );

  return validateInput(
    factors,
    z.array(fuelEmissionFactorSchema),
    "Received unexpected Fuel Emission Factors format from the database."
  );
}

/**
 * Get all the Fuel emission factors with same region
 * @param {string} region - The fuel emission factor region
 * @returns {Promise<FuelEmissionFactor>} - The found Fuel emission factors
 */
async function getFuelEmissionFactorByRegion(
  region: string
): Promise<FuelEmissionFactor[]> {
  const filter = Filter.where("region", "==", region);
  const factors = await FirestoreUtil.getByFilter(
    fuelEmissionFactorsCollection,
    filter
  );

  return validateInput(
    factors,
    z.array(fuelEmissionFactorSchema),
    "Received unexpected Fuel Emission Factor format from the database."
  );
}

/**
 * Get all the Fuel emission factors with same source
 * @param {string} source - The fuel emission factor source
 * @returns {Promise<FuelEmissionFactor>} - The found Fuel emission factors
 */
async function getFuelEmissionFactorBySource(
  source: string
): Promise<FuelEmissionFactor[]> {
  const filter = Filter.where("source", "==", source);
  const factors = await FirestoreUtil.getByFilter(
    fuelEmissionFactorsCollection,
    filter
  );

  return validateInput(
    factors,
    z.array(fuelEmissionFactorSchema),
    "Received unexpected Fuel Emission Factor format from the database."
  );
}

/**
 * Get a Fuel emission factor by fuel code and region, if not found in region, it tries to get the international one
 * Expected to only get one factor, which will be used in the emission calculation
 * @param {string} fuelCode - The fuel code
 * @param {string} region - The fuel emission factor region
 * @returns {Promise<FuelEmissionFactor>} - The found Fuel emission factor
 */
async function getFuelEmissionFactorByFuelCodeAndRegion(
  fuelCode: string,
  region: string
): Promise<FuelEmissionFactor> {
  const filter = Filter.and(
    Filter.or(
      Filter.where("fuel.code", "==", fuelCode),
      Filter.where("fuel.name", "==", fuelCode)
    ),
    Filter.or(
      Filter.where("region", "==", region),
      Filter.where("region", "==", "INTERNATIONAL")
    )
  );
  const factors = await FirestoreUtil.getByFilter(
    fuelEmissionFactorsCollection,
    filter
  );

  const validatedFactors = validateInput(
    factors,
    z.array(fuelEmissionFactorSchema),
    "Received unexpected emissionFactor format from the database."
  );

  // Find the factors with the exact region, if empty use the international factors
  const exactRegionFactors = validatedFactors.filter(
    (factor) => factor.region === region
  );
  const foundFactors = exactRegionFactors.length
    ? exactRegionFactors
    : validatedFactors.filter((factor) => factor.region === "INTERNATIONAL");

  if (foundFactors.length === 0) {
    throw new CustomError({
      status: HttpStatusCode.NotFound,
      message: `Emission factor for fuel ${fuelCode} not found.`,
    });
  }
  if (foundFactors.length > 1) {
    throw new CustomError({
      status: HttpStatusCode.InternalServerError,
      message: `Multiple emission factors for fuel ${fuelCode} found.`,
    });
  }

  return foundFactors[0];
}

export const FuelEmissionFactorService = {
  getFuelEmissionFactorByFuelCode,
  getFuelEmissionFactorByRegion,
  getFuelEmissionFactorBySource,
  getFuelEmissionFactorByFuelCodeAndRegion,
};

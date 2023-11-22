import { HttpStatusCode } from "axios";
import { FuelEmissionFactor } from "../models/emission_factors/fuel_emission_factors";
import { CustomError } from "./errors";
import { exhaustiveMatchingGuard } from "./functions";

/** INTENSITY EMISSION FACTORS */

/**
 *
 * @param emissionFactor
 * @returns
 */
function mapEmissionFactorWithUnits(emissionFactor: FuelEmissionFactor) {
  return {
    ...emissionFactor,
    factors: emissionFactor.factors.map((factor) => {
      const glecUnitString = glecUnitStringMapper(factor.unit);
      if (!glecUnitString) {
        throw new CustomError({
          status: HttpStatusCode.InternalServerError,
          message: `Could not map unit string ${factor.unit} from the GLEC fuel emission factors to the required format`,
        });
      }
      return {
        ...factor,
        producedUnit: glecUnitString.producedUnit,
        perUnit: glecUnitString.perUnit,
      };
    }),
  };
}

/**
 *
 * @param unit
 * @returns
 */
function glecUnitStringMapper(
  unit: FuelEmissionFactor["factors"][number]["unit"]
) {
  switch (unit) {
    case "KG_CO2E_PER_KG":
      return {
        producedUnit: "kg_CO2e",
        perUnit: "kg",
      };
    case "KG_CO2E_PER_L":
      return {
        producedUnit: "kg_CO2e",
        perUnit: "l",
      };
    case "KG_CO2E_PER_KWH":
      return {
        producedUnit: "kg_CO2e",
        perUnit: "kWh",
      };
    default:
      return exhaustiveMatchingGuard(
        unit,
        "Invalid unit type. This should not happen and means a unhandled unit type was added to the glecUnitStringMapper."
      );
  }
}

export const EmissionFactorUtils = {
  mapEmissionFactorWithUnits,
};

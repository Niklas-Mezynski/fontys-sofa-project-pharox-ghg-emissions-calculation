import { HttpStatusCode } from "axios";
import { FuelEmissionFactor } from "../models/emission_factors/fuel_emission_factors";
import { CustomError } from "./errors";
import { exhaustiveMatchingGuard } from "./functions";

/** INTENSITY EMISSION FACTORS */

/**
 * Helper to extract the different units from the string format stored in the database
 * @param emissionFactor The FuelEmissionFactor to map
 * @returns The FuelEmissionFactor with the units mapped.
 * The units consist of
 * - producedUnit: the unit of the produced product (e.g. kg)
 * - producedProduct: the name of the produced product (e.g. CO2e)
 * - perUnit: the unit of the per unit (e.g. kg)
 */
function mapEmissionFactorWithUnits(emissionFactor: FuelEmissionFactor) {
  return {
    ...emissionFactor,
    factors: emissionFactor.factors.map((factor) => {
      const glecUnitObj = glecUnitStringMapper(factor.unit);
      if (!glecUnitObj) {
        throw new CustomError({
          status: HttpStatusCode.InternalServerError,
          message: `Could not map unit string ${factor.unit} from the GLEC fuel emission factors to the required format`,
        });
      }
      return {
        ...factor,
        unit: {
          ...glecUnitObj,
        },
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
        producedUnit: "kg",
        producedProduct: "CO2e",
        perUnit: "kg",
      } as const;
    case "KG_CO2E_PER_L":
      return {
        producedUnit: "kg",
        producedProduct: "CO2e",
        perUnit: "l",
      } as const;
    case "KG_CO2E_PER_KWH":
      return {
        producedUnit: "kg",
        producedProduct: "CO2e",
        perUnit: "kWh",
      } as const;
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

import { HttpStatusCode } from "axios";
import {
  FreightEmissionCalculationInput,
  RailTransportDetails,
  TransportActivityReport,
} from "../../models/emission_calculations/emission_calculation_model";
import {
  ACTIVITY_BASE_UNIT,
  CO2E_WEIGHT_UNIT,
  baseEmissionReportFactory,
} from "../../utils/calculation_report";
import { CustomError } from "../../utils/errors";
import { RailIntensityFactorService } from "../emission_factors/intensity_factors/rail_intensity_factor_service";
import { UnitConversionService } from "../units/unit_conversion_service";
import { UnitService } from "../units/unit_service";

/**
 *
 * @param transportPart
 * @param transportDetails
 * @returns
 */
export async function handleCalculationForRailTransport(
  transportPart: FreightEmissionCalculationInput["transportParts"][number],
  transportDetails: RailTransportDetails
): Promise<TransportActivityReport> {
  const factor = await RailIntensityFactorService.getSpecificIntensityFactor(
    transportDetails,
    transportPart.region
  );

  // Get the factor with the same unit type as the provided unit type
  const factorToUse = factor.factor;

  if (!factorToUse) {
    throw new CustomError({
      status: HttpStatusCode.BadRequest,
      message: "No emission factor was found!",
    });
  }

  // TODO: CLEAN THIS UP
  // Convert factor units to KG_CO2E_PER_TKM
  const factorUnits = UnitService.splitComposedUnits(
    factorToUse.unit,
    "_CO2E_PER_"
  );

  factorToUse.unit = "KG_CO2E_PER_TKM";
  factorToUse.wtw = factorToUse.wtw
    ? UnitConversionService.convertUnits(
        factorUnits[0].toLowerCase(),
        CO2E_WEIGHT_UNIT,
        factorToUse.wtw
      ).value
    : factorToUse.wtw;
  factorToUse.wtt = factorToUse.wtt
    ? UnitConversionService.convertUnits(
        factorUnits[0].toLowerCase(),
        CO2E_WEIGHT_UNIT,
        factorToUse.wtt
      ).value
    : factorToUse.wtt;
  factorToUse.ttw = factorToUse.ttw
    ? UnitConversionService.convertUnits(
        factorUnits[0].toLowerCase(),
        CO2E_WEIGHT_UNIT,
        factorToUse.ttw
      ).value
    : factorToUse.ttw;

  const km = UnitConversionService.convertUnits(
    transportPart.distance.unit,
    ACTIVITY_BASE_UNIT.DISTANCE,
    transportPart.distance.value
  ).value;

  const tonnes = UnitConversionService.convertUnits(
    transportPart.weight.unit,
    ACTIVITY_BASE_UNIT.WEIGHT,
    transportPart.weight.value
  ).value;

  const tkm = tonnes * km;

  const producedEmissions = {
    tankToWheel: factorToUse.ttw ? tkm * factorToUse.ttw : 0,
    wellToTank: factorToUse.wtt ? tkm * factorToUse.wtt : 0,
    wellToWheel: factorToUse.wtw ? tkm * factorToUse.wtw : 0,
  };

  return {
    input: transportPart,
    emissionFactor: factor,
    mode: transportDetails.modeOfTransport,
    emissions: baseEmissionReportFactory({
      co2e:
        producedEmissions.wellToWheel ??
        // TODO: Is it the correct fallback to add the wellToTank and tankToWheel emissions in case the wellToWheel is not provided?
        producedEmissions.wellToTank + producedEmissions.tankToWheel,
      intensity: factorToUse.wtw,
      activity: tkm,
      distance: km,
      wtt: {
        co2e: producedEmissions.wellToTank,
        intensity: producedEmissions.wellToTank / tkm,
      },
      ttw: {
        co2e: producedEmissions.tankToWheel,
        intensity: producedEmissions.tankToWheel / tkm,
      },
    }),
  };
}

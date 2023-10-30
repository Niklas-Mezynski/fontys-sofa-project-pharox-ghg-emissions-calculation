import { HttpStatusCode } from "axios";
import { EmissionFactor } from "../../models/emission_factors/climatiq_emission_factors";
import {
  EmissionCalculatorInput,
  emissionCalculatorInput,
} from "../../models/emission_factors/emission_factors";
import { CustomError } from "../../utils/errors";
import { validateInput } from "../../utils/functions";
import { EmissionFactorService } from "../emission_factors/emission_factor_service";
import { UnitType } from "../../models/units/units";
import { classifyUnitType } from "../units/unit_classification_service";
import { UnitConversionService } from "../units/unit_conversion_service";

/**
 * Calculates the emission based on the provided fuel and emission factor.
 * @param {EmissionCalculatorInput | unknown} inputData the input object.
 * @return {object} the response object.
 */
async function performEmissionCalculation(
  inputData: EmissionCalculatorInput | unknown
) {
  // Check if emission factor and calculation input given
  // Validate calculation input
  // Validation of emission factor input to look for it in DB and check type of emission factor (custom or not)
  const { emissionDetails, calculationDetails } = validateInput(
    inputData,
    emissionCalculatorInput
  );

  // Unit classification
  const unitClass = classifyUnitType(calculationDetails.unit);

  if (unitClass === "UNKNOWN") {
    throw new CustomError({
      status: HttpStatusCode.BadRequest,
      message: `Unit '${calculationDetails.unit}' is not supported. Could not determine unit class`,
    });
  }

  // Get emission factor
  const emissionFactor = await getEmissionFactor(unitClass, emissionDetails);

  if (!emissionFactor) {
    throw new CustomError({
      status: HttpStatusCode.BadRequest,
      message: "Could not find emission factor for given input",
      emissionFactorInput: emissionDetails,
    });
  }

  // Check calculation input units - Not good -> do conversion
  const convertedCalculationDetails = {
    ...calculationDetails,
    resourceAmount: UnitConversionService.convertUnits(
      calculationDetails.unit,
      emissionFactor.unit,
      calculationDetails.resourceAmount,
    ),
    unit: emissionFactor.unit,
  };

  // Calculate emission
  return {
    result: convertedCalculationDetails.resourceAmount * emissionFactor.factor,
    calculationData: {
      usedResourceAmount: convertedCalculationDetails.resourceAmount,
      usedUnit: convertedCalculationDetails.unit,
      emissionFactor: emissionFactor.factor,
    },
  };
}

/**
 * Gets the emission factor based on the provided emission details.
 * This function has to take care of the different types of user input it may receive
 * TODO: Add more ways to get emission factors
 * @async
 * @param unitType The type of unit. E.g. VolumeUnit, MassUnit, LengthUnit
 * @param emissionDetails The emission details. E.g. activityId, activityType, vehicleType, fuelType.
 * @returns {Promise<EmissionFactor | null>} The emission factor if available.
 */
async function getEmissionFactor(
  unitType: UnitType,
  emissionDetails: EmissionCalculatorInput["emissionDetails"]
): Promise<EmissionFactor | null> {
  if ("activityId" in emissionDetails) {
    // getEmissionFactorByID
    return EmissionFactorService.getByActivityId(emissionDetails.activityId);
  } else {
    // getEmissionFactorByOtherFields
  }

  return null;
}

export const EmissionCalculatorService = {
  getEmissionFactor,
  performEmissionCalculation,
};

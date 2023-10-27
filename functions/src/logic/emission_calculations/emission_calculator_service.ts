import { HttpStatusCode } from "axios";
import { SimpleEmissionCalculationInput } from "../../models/emission_calculations/simple_emission_calculation_model";
import { EmissionFactor } from "../../models/emission_factors/climatiq_emission_factors";
import {
  EmissionCalculatorInput,
  emissionCalculatorInput,
} from "../../models/emission_factors/emission_factors";
import { CustomError } from "../../utils/errors";
import { validateInput } from "../../utils/functions";
import { logger } from "../../utils/logger";
import { EmissionFactorService } from "../emission_factors/emission_factor_service";
import { UnitType } from "../../models/units/unit_types";
import { classifyUnitType } from "../units/unit_classification_service";
import { UnitConversionService } from "../units/unit_conversion_service";

/**
 * Calculates the emission based on the provided fuel and emission factor.
 * @param {unknown} inputData the input object.
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
    resourceAmount: convertUnits(
      calculationDetails.resourceAmount,
      calculationDetails.unit,
      emissionFactor.unit
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
 * @param unitType The type of unit. E.g. VolumeUnit, MassUnit, LengthUnit
 * @param emissionDetails The emission details. E.g. activityId, activityType, vehicleType, fuelType.
 * @returns The emission factor if available.
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

/**
 * Converts supported units from one to another
 * @returns The value in the unit required by the GLEC-emission-factor
 */
function convertUnits(value: number, originalUnit: string, targetUnit: string) {
  if (originalUnit === targetUnit) {
    return value;
  }

  if (!UnitConversionService.verifyIfUnitIsSupporter(originalUnit)) {
    throw new CustomError({
      status: HttpStatusCode.BadRequest,
      message: `Unit '${originalUnit}' is not supported. It cannot be converted to '${targetUnit}'`,
    });
  }

  if (!UnitConversionService.verifyIfUnitIsSupporter(targetUnit)) {
    throw new CustomError({
      status: HttpStatusCode.BadRequest,
      message: `Unit '${targetUnit}' is not supported. It cannot be converted from '${originalUnit}'`,
    });
  }

  return UnitConversionService.convertUnit(originalUnit, targetUnit, value);
}

/**
 * Calculates the emission based on the provided fuel and emission factor.
 * @param {SimpleEmissionCalculationInput} input the input object.
 * @return {object} the response object.
 */
function simpleEmissionCalculation(input: SimpleEmissionCalculationInput) {
  const emission = input.usedFuel * input.emissionFactor;

  logger.info(
    "Calculated Emission: " +
      emission +
      "\n Provided Fuel: " +
      input.usedFuel +
      "\n Provided Emissions Factor: " +
      input.emissionFactor
  );

  return {
    status: 200,
    result: emission,
    calculationData: {
      usedFuel: input.usedFuel,
      emissionFactor: input.emissionFactor,
    },
  };
}

export const SimpleCalculationService = {
  simpleEmissionCalculation,
  getEmissionFactor,
  performEmissionCalculation,
};

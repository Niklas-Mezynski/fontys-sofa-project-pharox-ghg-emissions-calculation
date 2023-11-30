import { HttpStatusCode } from "axios";
import {
  CalculationReport,
  FreightEmissionCalculationInput,
  TransportActivityReport,
  freightEmissionCalculationInputSchema,
} from "../../models/emission_calculations/emission_calculation_model";
import {
  addReportPartToOverallReport,
  calculationReportFactory,
} from "../../utils/calculation_report";
import { CustomError } from "../../utils/errors";
import { exhaustiveMatchingGuard, validateInput } from "../../utils/functions";
import { handleCalculationWithGivenFuelConsumption } from "./fuel_based_calculation";
import { handleCalculationForRoadTransport } from "./road_intensity_calculation";

/**
 * Calculates the emission based on the provided fuel and emission factor.
 * @param {FreightEmissionCalculationInput | unknown} inputData - the input object.
 * @return {Promise<CalculationReport>} The result of the emission calculation.
 */
async function performEmissionCalculation(
  inputData: FreightEmissionCalculationInput | unknown
): Promise<CalculationReport> {
  // Validate calculation input
  const calculationInput = validateInput(
    inputData,
    freightEmissionCalculationInputSchema
  );

  const calculationReport: CalculationReport = {
    ...calculationReportFactory(),
    metadata: calculationInput.metadata ?? undefined,
  };

  await Promise.all(
    calculationInput.transportParts.map(async (transportPart, index) => {
      try {
        // Get the emission factor
        const reportPart = await calculateTransportActivity(transportPart);

        // Add the emission to the report
        calculationReport.transportActivities[index] = reportPart;

        addReportPartToOverallReport(
          calculationReport,
          reportPart,
          transportPart.scope
        );
      } catch (error) {
        throw new CustomError({
          status: HttpStatusCode.BadRequest,
          message: `Error while calculating emission for transport part ${index}`,
          details: error,
        });
      }
    })
  );

  return calculationReport;
}

// eslint-disable-next-line require-jsdoc
async function performBatchEmissionCalculation(
  inputData: FreightEmissionCalculationInput[]
): Promise<CalculationReport[]> {
  const arrayOfReports = [];

  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < inputData.length; i++) {
    arrayOfReports.push(await performEmissionCalculation(inputData[i]));
  }

  return arrayOfReports;
}

/**
 * Calculates the emission for a single transport activity.
 * @param transportPart The transport activity to calculate the emission for.
 * @returns The report part for the transport activity.
 */
async function calculateTransportActivity(
  transportPart: FreightEmissionCalculationInput["transportParts"][number]
): Promise<TransportActivityReport> {
  if ("modeOfTransport" in transportPart.transportDetails) {
    switch (transportPart.transportDetails.modeOfTransport) {
      case "ROAD":
        return handleCalculationForRoadTransport(
          transportPart,
          transportPart.transportDetails
        );
      default:
        throw exhaustiveMatchingGuard(
          transportPart.transportDetails.modeOfTransport
        );
    }
  } else {
    return handleCalculationWithGivenFuelConsumption(
      transportPart,
      transportPart.transportDetails
    );
  }
}

export const EmissionCalculatorService = {
  performEmissionCalculation,
  performBatchEmissionCalculation,
};

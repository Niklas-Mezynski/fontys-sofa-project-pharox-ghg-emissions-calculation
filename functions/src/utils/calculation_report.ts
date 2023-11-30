import { number } from "zod";
import {
  CalculationReport,
  EmissionReportBase,
  TotalEmissionReport,
  TransportActivityReport,
} from "../models/emission_calculations/emission_calculation_model";
import { DistanceUnit, WeightUnit } from "../models/units/units";
import { GLECScope } from "../models/common";

export const CO2E_WEIGHT_UNIT = "kg" as const;
export const ACTIVITY_BASE_UNIT = {
  DISTANCE: "km",
  WEIGHT: "t",
} as const;

const co2e = (value?: number | null) => ({
  value: value ?? 0,
  unit: CO2E_WEIGHT_UNIT,
});

const intensity = (value?: number | null) => ({
  value: value ?? 0,
  unit: `${CO2E_WEIGHT_UNIT}/${ACTIVITY_BASE_UNIT.WEIGHT}${ACTIVITY_BASE_UNIT.DISTANCE}`,
});

/**
 * Creates the base for emission report of one transport part.
 * It assumes that the values are in the base units of the activity
 * @param input The values to construct the base report
 */
export function baseEmissionReportFactory(input?: {
  co2e?: number | null;
  intensity?: number | null;
  activity?: number | null;
  distance?: number | null;
  wtt?: {
    co2e?: number | null;
    intensity?: number | null;
  };
  ttw?: {
    co2e?: number | null;
    intensity?: number | null;
  };
}): EmissionReportBase {
  return {
    co2e: co2e(input?.co2e),
    intensity: intensity(input?.intensity),
    activity: {
      value: input?.activity ?? 0,
      unit: `${ACTIVITY_BASE_UNIT.WEIGHT}${ACTIVITY_BASE_UNIT.DISTANCE}`,
    },
    distance: {
      value: input?.distance ?? 0,
      unit: ACTIVITY_BASE_UNIT.DISTANCE,
    },
    breakdown: {
      wtt: {
        co2e: co2e(input?.wtt?.co2e),
        intensity: intensity(input?.wtt?.intensity),
      },
      ttw: {
        co2e: co2e(input?.ttw?.co2e),
        intensity: intensity(input?.ttw?.intensity),
      },
    },
  };
}

/**
 * Creates the initial calculation report
 */
export function calculationReportFactory(): CalculationReport {
  const emissionReportBase = baseEmissionReportFactory();
  return {
    emissions: {
      ...emissionReportBase,
      breakdown: {
        scope1: {
          co2e: co2e(),
          intensity: intensity(),
        },
        scope2: {
          co2e: co2e(),
          intensity: intensity(),
        },
        scope3: {
          co2e: co2e(),
          intensity: intensity(),
        },
        unknownScope: {
          co2e: co2e(),
          intensity: intensity(),
        },
        ...emissionReportBase.breakdown,
      },
    },
    transportActivities: [],
    date: new Date(),
  };
}

/**
 * Adds the report part to the total report
 */
export function addReportPartToOverallReport(
  calculationReport: CalculationReport,
  reportPart: TransportActivityReport,
  scope?: GLECScope | null
) {
  calculationReport.emissions.co2e.value += reportPart.emissions.co2e.value;
  calculationReport.emissions.intensity.value +=
    reportPart.emissions.intensity.value;
  calculationReport.emissions.activity.value +=
    reportPart.emissions.activity.value;
  calculationReport.emissions.distance.value +=
    reportPart.emissions.distance.value;
  calculationReport.emissions.breakdown.wtt.co2e.value +=
    reportPart.emissions.breakdown.wtt.co2e.value;
  calculationReport.emissions.breakdown.wtt.intensity.value +=
    reportPart.emissions.breakdown.wtt.intensity.value;
  calculationReport.emissions.breakdown.ttw.co2e.value +=
    reportPart.emissions.breakdown.ttw.co2e.value;
  calculationReport.emissions.breakdown.ttw.intensity.value +=
    reportPart.emissions.breakdown.ttw.intensity.value;

  switch (scope) {
    case "SCOPE1":
      calculationReport.emissions.breakdown.scope1.co2e.value +=
        reportPart.emissions.co2e.value;
      calculationReport.emissions.breakdown.scope1.intensity.value +=
        reportPart.emissions.intensity.value;
      break;
    case "SCOPE2":
      calculationReport.emissions.breakdown.scope2.co2e.value +=
        reportPart.emissions.co2e.value;
      calculationReport.emissions.breakdown.scope2.intensity.value +=
        reportPart.emissions.intensity.value;
      break;
    case "SCOPE3":
      calculationReport.emissions.breakdown.scope3.co2e.value +=
        reportPart.emissions.co2e.value;
      calculationReport.emissions.breakdown.scope3.intensity.value +=
        reportPart.emissions.intensity.value;
      break;
    default:
      calculationReport.emissions.breakdown.unknownScope.co2e.value +=
        reportPart.emissions.co2e.value;
      calculationReport.emissions.breakdown.unknownScope.intensity.value +=
        reportPart.emissions.intensity.value;
      break;
  }
}

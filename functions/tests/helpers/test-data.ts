import { CalculationReport } from "../../src/models/emission_calculations/emission_calculation_model";
import { FuelEmissionFactor } from "../../src/models/emission_factors/fuel_emission_factors";
import { RoadIntensityFactor } from "../../src/models/emission_factors/road_intensity_factors";

/* FUEL EMISSION FACTORS */

export const fuelEmissionFactors: (FuelEmissionFactor & { id: string })[] = [
  {
    id: "142f2af5-ee30-42b6-b18c-e94e6b411baf",
    source: "GLEC",
    fuel: {
      code: "MARINE_GAS_OIL",
      name: "Marine gas oil",
    },
    factors: [
      {
        unit: "KG_CO2E_PER_KG",
        wtt: 0.68,
        ttw: 3.24,
        wtw: 3.92,
      },
      {
        unit: "KG_CO2E_PER_L",
        wtt: 0.61,
        ttw: 2.88,
        wtw: 3.49,
      },
    ],
    region: "EU",
  },
  {
    id: "d03d2296-66b7-4e83-9740-253b811c2a1f",
    source: "GLEC",
    fuel: {
      code: "GASOLINE",
      name: "Gasoline",
    },
    factors: [
      {
        unit: "KG_CO2E_PER_KG",
        wtt: 0.61,
        ttw: 3.25,
        wtw: 3.86,
      },
      {
        unit: "KG_CO2E_PER_L",
        wtt: 0.45,
        ttw: 2.42,
        wtw: 2.88,
      },
    ],
    region: "EU",
  },
  {
    id: "4f399ccd-380d-4047-becf-4cf4d83edaa9",
    source: "GLEC",
    fuel: {
      code: "BIOETHANOL",
      name: "Bioethanol",
    },
    factors: [
      {
        unit: "KG_CO2E_PER_KG",
        wtt: 1.56,
        ttw: 0.0,
        wtw: 1.56,
      },
      {
        unit: "KG_CO2E_PER_L",
        wtt: 1.24,
        ttw: 0.0,
        wtw: 1.24,
      },
    ],
    region: "EU",
  },
  {
    id: "e226789b-cbe2-4719-a743-30ad66b45451",
    source: "GLEC",
    fuel: {
      code: "GASOLINE_E5",
      name: "Gasoline, 5% bioethanol blend",
    },
    factors: [
      {
        unit: "KG_CO2E_PER_KG",
        wtt: 0.66,
        ttw: 3.08,
        wtw: 3.74,
      },
      {
        unit: "KG_CO2E_PER_L",
        wtt: 0.5,
        ttw: 2.3,
        wtw: 2.8,
      },
    ],
    region: "EU",
  },
  {
    id: "42cc609d-212d-438f-9855-8411e695c841",
    source: "GLEC",
    fuel: {
      code: "DIESEL",
      name: "Diesel",
    },
    factors: [
      {
        unit: "KG_CO2E_PER_KG",
        wtt: 0.69,
        ttw: 3.21,
        wtw: 3.9,
      },
      {
        unit: "KG_CO2E_PER_L",
        wtt: 0.57,
        ttw: 2.67,
        wtw: 3.24,
      },
    ],
    region: "EU",
  },
];


/* ROAD INTENSITY FACTORS */

export const roadIntensityFactors: (RoadIntensityFactor & { id: string })[] = [
  {
    "id": "7ceae7d4-1320-4a96-877b-2010916a9923",
    "vehicle": {
      "code": "VAN_LT_3.5_T",
      "name": "Van <- 3.5 t",
      "weight": {
        "lower": null,
        "upper": 3.5,
        "unit": "t",
      },
      "engineType": null,
    },
    "characteristics": {
      "loadFactor": null,
      "emptyRunning": null,
      "loadCharacteristic": null,
      "combinedLoadFactorEmptyRunning": 0.36,
    },
    "fuel": {
      "name": "Diesel, 5% biodiesel blend",
      "code": "DIESEL_B5",
    },
    "fuelConsumption": [
      {
        "value": 0.18,
        "unit": "KG_PER_TKM",
      },
      {
        "value": 0.215,
        "unit": "L_PER_TKM",
      },
    ],
    "factor": {
      "unit": "G_CO2E_PER_TKM",
      "wtt": 140,
      "ttw": 550,
      "wtw": 680,
    },
    "region": "EU",
    "source": "GLEC",
    "refrigerated": false,
  },
  {
    "id": "da52fa5c-211b-403a-835b-23eeaaa57f7c",
    "vehicle": {
      "code": "VAN_LT_3.5_T",
      "name": "Van <- 3.5 t",
      "weight": {
        "lower": null,
        "upper": 3.5,
        "unit": "t",
      },
      "engineType": null,
    },
    "characteristics": {
      "loadFactor": null,
      "emptyRunning": null,
      "loadCharacteristic": null,
      "combinedLoadFactorEmptyRunning": 0.24,
    },
    "fuel": {
      "name": "Petrol",
      "code": "PETROL",
    },
    "fuelConsumption": [
      {
        "value": 0.263,
        "unit": "KG_PER_TKM",
      },
      {
        "value": 0.353,
        "unit": "L_PER_TKM",
      },
    ],
    "factor": {
      "unit": "G_CO2E_PER_TKM",
      "wtt": 160,
      "ttw": 850,
      "wtw": 1000,
    },
    "region": "AS",
    "source": "GLEC",
    "refrigerated": false,
  },
  {
    "id": "cc273c6f-b61c-4a6d-92a1-7e9d5bd54943",
    "vehicle": {
      "code": "VAN_LT_3.5_T",
      "name": "Van <- 3.5 t",
      "weight": {
        "lower": null,
        "upper": 3.5,
        "unit": "t",
      },
      "engineType": null,
    },
    "characteristics": {
      "loadFactor": null,
      "emptyRunning": null,
      "loadCharacteristic": null,
      "combinedLoadFactorEmptyRunning": 0.36,
    },
    "fuel": {
      "name": "CNG",
      "code": "CNG",
    },
    "fuelConsumption": [
      {
        "value": 0.2,
        "unit": "KG_PER_TKM",
      },
    ],
    "factor": {
      "unit": "G_CO2E_PER_TKM",
      "wtt": 80,
      "ttw": 540,
      "wtw": 620,
    },
    "region": "NA",
    "source": "GLEC",
    "refrigerated": false,
  },
];

/* EMISSION CALCULATION REPORTS */

export const calculationReports: (CalculationReport & { id: string })[] = [];

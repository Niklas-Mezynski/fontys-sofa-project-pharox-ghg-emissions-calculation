import { FuelEmissionFactor } from "../../src/models/emission_factors/emission_factors";

/* FUEL EMISSION FACTORS */

export const fuelEmissionFactors: FuelEmissionFactor[] = [
  {
    "source": "GLEC",
    "fuel": {
      "code": "MARINE_GAS_OIL",
      "description": "Marine gas oil",
    },
    "factors": [{
      "unit": "KG_CO2E_PER_KG",
      "factor": {
        "WTT": 0.68,
        "TTW": 3.24,
        "WTW": 3.92,
      },
    }, {
      "unit": "KG_CO2E_PER_L",
      "factor": {
        "WTT": 0.61,
        "TTW": 2.88,
        "WTW": 3.49,
      },
    },
    ],
    "region": "EU",
  },
];

import { FuelEmissionFactor } from "../../src/models/emission_factors/fuel_emission_factors";

/* FUEL EMISSION FACTORS */

export const fuelEmissionFactors: FuelEmissionFactor[] = [
  {
    "source": "GLEC",
    "fuel": {
      "code": "MARINE_GAS_OIL",
      "name": "Marine gas oil",
    },
    "factors": [{
      "unit": "KG_CO2E_PER_KG",
      "factor": {
        "wtt": 0.68,
        "ttw": 3.24,
        "wtw": 3.92,
      },
    }, {
      "unit": "KG_CO2E_PER_L",
      "factor": {
        "wtt": 0.61,
        "ttw": 2.88,
        "wtw": 3.49,
      },
    },
    ],
    "region": "EU",
  },
];

import { FuelEmissionFactor } from "../../src/models/emission_factors/fuel_emission_factors";

/* FUEL EMISSION FACTORS */

export const fuelEmissionFactors: (FuelEmissionFactor & { id: string })[] = [
  {
    id: "some-id-1",
    source: "GLEC",
    fuel: {
      code: "MARINE_GAS_OIL",
      name: "Marine gas oil",
    },
    factors: [
      {
        unit: "KG_CO2E_PER_KG",
        factor: {
          wtt: 0.68,
          ttw: 3.24,
          wtw: 3.92,
        },
      },
      {
        unit: "KG_CO2E_PER_L",
        factor: {
          wtt: 0.61,
          ttw: 2.88,
          wtw: 3.49,
        },
      },
    ],
    region: "EU",
  },
  {
    id: "some-id-2",
    source: "GLEC",
    fuel: {
      code: "GASOLINE",
      name: "Gasoline",
    },
    factors: [
      {
        unit: "KG_CO2E_PER_KG",
        factor: {
          wtt: 0.61,
          ttw: 3.25,
          wtw: 3.86,
        },
      },
      {
        unit: "KG_CO2E_PER_L",
        factor: {
          wtt: 0.45,
          ttw: 2.42,
          wtw: 2.88,
        },
      },
    ],
    region: "EU",
  },
  {
    id: "some-id-3",
    source: "GLEC",
    fuel: {
      code: "BIOETHANOL",
      name: "Bioethanol",
    },
    factors: [
      {
        unit: "KG_CO2E_PER_KG",
        factor: {
          wtt: 1.56,
          ttw: 0.0,
          wtw: 1.56,
        },
      },
      {
        unit: "KG_CO2E_PER_L",
        factor: {
          wtt: 1.24,
          ttw: 0.0,
          wtw: 1.24,
        },
      },
    ],
    region: "EU",
  },
  {
    id: "some-id-4",
    source: "GLEC",
    fuel: {
      code: "GASOLINE_E5",
      name: "Gasoline, 5% bioethanol blend",
    },
    factors: [
      {
        unit: "KG_CO2E_PER_KG",
        factor: {
          wtt: 0.66,
          ttw: 3.08,
          wtw: 3.74,
        },
      },
      {
        unit: "KG_CO2E_PER_L",
        factor: {
          wtt: 0.5,
          ttw: 2.3,
          wtw: 2.8,
        },
      },
    ],
    region: "EU",
  },
  {
    id: "some-id-5",
    source: "GLEC",
    fuel: {
      code: "DIESEL",
      name: "Diesel",
    },
    factors: [
      {
        unit: "KG_CO2E_PER_KG",
        factor: {
          wtt: 0.69,
          ttw: 3.21,
          wtw: 3.9,
        },
      },
      {
        unit: "KG_CO2E_PER_L",
        factor: {
          wtt: 0.57,
          ttw: 2.67,
          wtw: 3.24,
        },
      },
    ],
    region: "EU",
  },
];

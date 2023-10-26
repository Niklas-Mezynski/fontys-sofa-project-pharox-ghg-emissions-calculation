const volumeUnits = ["ml", "l", "tsp", "tbsp"] as const;
export type VolumeUnit = (typeof volumeUnits)[number];

const massUnits = ["g", "kg", "oz", "lb"] as const;
export type MassUnit = (typeof massUnits)[number];

const lengthUnits = ["km", "cm", "m", "in", "ft"] as const;
export type LengthUnit = (typeof lengthUnits)[number];

export type Unit = "VolumeUnit" | "MassUnit" | "LengthUnit";

export const classifyUnit = (unit: string): Unit | null => {
  if (volumeUnits.includes(unit as VolumeUnit)) return "VolumeUnit";
  if (massUnits.includes(unit as MassUnit)) return "MassUnit";
  if (lengthUnits.includes(unit as LengthUnit)) return "LengthUnit";
  return null;
};

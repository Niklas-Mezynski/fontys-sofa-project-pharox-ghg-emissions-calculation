export const unitTypes = ["DISTANCE", "WEIGHT", "VOLUME", "UNKNOWN"] as const;
export type UnitType = (typeof unitTypes)[number];

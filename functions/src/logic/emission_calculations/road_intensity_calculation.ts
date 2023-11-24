import {
  FreightEmissionCalculationInput,
  RoadTransportDetails,
  TransportActivityReport,
} from "../../models/emission_calculations/emission_calculation_model";

export async function handleCalculationForRoadTransport(
  transportPart: FreightEmissionCalculationInput["transportParts"][number],
  transportDetails: RoadTransportDetails
): Promise<TransportActivityReport> {
  throw new Error("Not implemented, TODO: Logic for road transport");
}

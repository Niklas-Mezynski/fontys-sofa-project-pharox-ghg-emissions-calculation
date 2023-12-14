/* eslint-disable indent */
import { z } from "zod";
import {
  RoadIntensityFactor,
  roadIntensityFactorSchema,
} from "../../models/emission_factors/road_intensity_factors";
import { validateInput } from "../../utils/functions";
import { onErrorHandledRequest } from "../../utils/request_handler";
import { CustomError } from "../../utils/errors";
import { HttpStatusCode } from "axios";

/**
 * Conversion factors for the different regions and vehicles types
 * "EU", "AF",  "AS",  "SA"
 */
const conversionFactors = {
  AF: {
    small: 1.13,
    big: 1.22,
  },
  AS: {
    small: 1.13,
    big: 1.22,
  },
};

/**
 * Helper function to map the road intensity factors values to a specific region
 */
export const mapRoadIntensityFactors = onErrorHandledRequest(
  async (request, response) => {
    const body = request.body as any[];

    const regionToMapTo = request.query
      .region as keyof typeof conversionFactors;

    const mappedFactors = mapToSpecificRegion(body, regionToMapTo);

    validateInput(mappedFactors, z.array(roadIntensityFactorSchema.strict()));

    response.status(200).json(mappedFactors);
  }
);

/**
 * Helper function to convert the given road intensity factors values to a specific region
 */
function mapToSpecificRegion(
  body: any[],
  regionToMapTo: keyof typeof conversionFactors
) {
  const conversionFactor = conversionFactors[regionToMapTo];

  return body.map((factor) => {
    let multiplier = 1;

    if (conversionFactor) {
      if (factor.vehicle.weight.upper <= 3.5) {
        // choose conversion multiplier for vehicles below 3.5 tonnes
        multiplier = conversionFactor.small;
      } else if (
        // Conversion for vehicles above 3.5 tonnes for vehicles above 3.5 tonnes
        factor.vehicle.weight.lower >= 3.5 ||
        factor.vehicle.weight.upper >= 3.5
      ) {
        multiplier = conversionFactor.big;
      } else {
        throw new CustomError({
          status: HttpStatusCode.BadRequest,
          message: `Weight ${JSON.stringify(
            factor.vehicle.weight
          )} is not supported, cannot determine the multiplier for region ${regionToMapTo}`,
        });
      }
    }

    // Return the new converted factor
    return {
      ...factor,
      region: regionToMapTo,
      factor: factor.factor
        ? {
            ...factor.factor,
            wtt: factor.factor.wtt ? factor.factor.wtt * multiplier : null,
            ttw: factor.factor.ttw ? factor.factor.ttw * multiplier : null,
            wtw: factor.factor.wtw ? factor.factor.wtw * multiplier : null,
          }
        : null,
      fuelConsumption: factor.fuelConsumption
        ? factor.fuelConsumption.map((c: any) => ({
            ...c,
            value: c.value ? c.value * multiplier : null,
          }))
        : null,
    };
  });
}

/**
 * Helper function to map given road intensity factors values to for refrigerated vehicles
 */
export const mapRoadIntensityFactorsToRefrigerated = onErrorHandledRequest(
  async (request, response) => {
    const body = request.body as RoadIntensityFactor[];

    // Map factor to the proper refrigerated factor values according to the region
    const mappedFactors = body.map((factor) => {
      let multiplier = 1;
      if (["EU", "SA", "AS", "AF"].includes(factor.region)) {
        if (factor.vehicle?.weight && factor.vehicle.weight.upper! <= 3.5) {
          // choose conversion multiplier for vehicles below 3.5 tonnes
          multiplier = 1.15;
        } else if (
          // Conversion for vehicles above 3.5 tonnes for vehicles above 3.5 tonnes
          (factor.vehicle?.weight && factor.vehicle.weight.lower! >= 3.5) ||
          (factor.vehicle?.weight && factor.vehicle.weight.upper! >= 3.5)
        ) {
          multiplier = 1.12;
        } else {
          throw new CustomError({
            status: HttpStatusCode.BadRequest,
            message: `Weight ${JSON.stringify(
              factor.vehicle?.weight
            )} is not supported`,
          });
        }
      }

      // Return the new converted factor
      return {
        ...factor,
        factor: factor.factor
          ? {
              ...factor.factor,
              wtt: factor.factor.wtt ? factor.factor.wtt * multiplier : null,
              ttw: factor.factor.ttw ? factor.factor.ttw * multiplier : null,
              wtw: factor.factor.wtw ? factor.factor.wtw * multiplier : null,
            }
          : null,
        fuelConsumption: factor.fuelConsumption
          ? factor.fuelConsumption.map((c) => ({
              ...c,
              value: c.value ? c.value * multiplier : null,
            }))
          : null,
        refrigerated: multiplier !== 1,
      };
    });

    validateInput(mappedFactors, z.array(roadIntensityFactorSchema.strict()));

    response.status(200).json(mappedFactors.filter((f) => f.refrigerated));
  }
);

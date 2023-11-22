/* eslint-disable indent */
import { z } from "zod";
import {
  RoadIntensityFactor,
  roadIntensityFactorSchema,
} from "../../../models/emission_factors/road_intensity_factors";
import { validateInput } from "../../../utils/functions";
import { onErrorHandledRequest } from "../../../utils/request_handler";
import { CustomError } from "../../../utils/errors";
import { HttpStatusCode } from "axios";

// "EU", "AF",  "AS",  "SA"
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

export const mapRoadIntensityFactors = onErrorHandledRequest(
  async (request, response) => {
    const body = request.body as any[];

    const regionToMapTo = request.query
      .region as keyof typeof conversionFactors;

    const mappedFactors = mapToSPecificRegion(body, regionToMapTo);

    validateInput(mappedFactors, z.array(roadIntensityFactorSchema.strict()));

    response.status(200).json(mappedFactors);
  }
);

function mapToSPecificRegion(
  body: any[],
  regionToMapTo: keyof typeof conversionFactors
) {
  const conversionFactor = conversionFactors[regionToMapTo];

  return body.map((factor) => {
    let multiplier = 1;

    if (conversionFactor) {
      if (factor.vehicle.weight.upper <= 3.5) {
        multiplier = conversionFactor.small;
      } else if (
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

export const mapRoadIntensityFactorsToRefrigerated = onErrorHandledRequest(
  async (request, response) => {
    const body = request.body as RoadIntensityFactor[];

    const mappedFactors = body.map((factor) => {
      let multiplier = 1;
      if (["EU", "SA", "AS", "AF"].includes(factor.region)) {
        if (factor.vehicle?.weight && factor.vehicle.weight.upper! <= 3.5) {
          multiplier = 1.15;
        } else if (
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

import { Filter } from "firebase-admin/firestore";
import { z } from "zod";
import { RoadTransportDetails } from "../../../models/emission_calculations/emission_calculation_model";
import {
  RoadIntensityFactor,
  roadIntensityFactorSchema,
} from "../../../models/emission_factors/road_intensity_factors";
import { FirestoreUtil } from "../../../utils/firestore";
import { validateInput } from "../../../utils/functions";
import { CustomError } from "../../../utils/errors";
import { HttpStatusCode } from "axios";

// The Firestore collection name refering to the Road intensity factors
const roadIntensityFactorsCollection = "intensity_factors_road";

/**
 *
 * @param data
 * @returns
 */
async function getSpecificIntensityFactor(
  data: RoadTransportDetails,
  region: string
): Promise<RoadIntensityFactor> {

  
  const filter = Filter.and(
    Filter.where("refrigerated", "==", data.refrigerated),
    Filter.where("region", "in", [region, "INTERNATIONAL"])
  );


  const queryData = await FirestoreUtil.getByFilter(
    roadIntensityFactorsCollection,
    filter
  );

  let validatedQueryData = validateInput(
    queryData,
    z.array(roadIntensityFactorSchema),
    "Received unexpected Road Intensity Factors format from the database."
  );

  let useDefault = true;

  const vehicle = data.vehicle
  if(vehicle){
    if(vehicle.code && vehicle.weight && vehicle.weight.unit && vehicle.weight.value){
      validatedQueryData = validatedQueryData.filter(d => 
        (d.vehicle?.code === vehicle.code || vehicle.code && d.vehicle?.code.includes(vehicle.code)) 
        && d.vehicle?.weight?.unit === vehicle.weight.unit
        && (
          (d.vehicle.weight.upper && vehicle.weight.value < d.vehicle.weight.upper)
          || ((d.vehicle.weight.lower && vehicle.weight.value >= d.vehicle.weight.lower && d.vehicle.weight.upper && vehicle.weight.value < d.vehicle.weight.upper)
          || (d.vehicle.weight.lower && vehicle.weight.value >= d.vehicle.weight.lower))
        )
      );

      if(vehicle.engineType){
        validatedQueryData = validatedQueryData.filter(d => 
          d.vehicle?.engineType === vehicle.engineType
        );
        useDefault = false;
      }
    }
  }
  
  const characteristics = data.characteristics
  if(characteristics){
    if(characteristics.emptyRunning){
      validatedQueryData = validatedQueryData.filter( d => d.characteristics?.emptyRunning === characteristics.emptyRunning);
      useDefault = false;
    }

    if(characteristics.loadFactor){
      validatedQueryData = validatedQueryData.filter( d => d.characteristics?.loadFactor === characteristics.loadFactor);
      useDefault = false;
    }

    if(characteristics.combinedLoadFactorEmptyRunning){
      validatedQueryData = validatedQueryData.filter( d => d.characteristics?.combinedLoadFactorEmptyRunning === characteristics.combinedLoadFactorEmptyRunning);
      useDefault = false;
    }

    if(characteristics.loadCharacteristic){
      validatedQueryData = validatedQueryData.filter( d => d.characteristics?.loadCharacteristic === characteristics.loadCharacteristic);
      useDefault = false;
    }
  }

  const fuelCode = data.fuelCode
  if(fuelCode){
    validatedQueryData = validatedQueryData.filter( d => d.fuel?.code === fuelCode);
    useDefault = false;
  }

  if ((validatedQueryData.length > 1)) {
    if(useDefault && vehicle.code){
      validatedQueryData = validatedQueryData.filter( d => 
        (d.characteristics === null
        || (d.characteristics.combinedLoadFactorEmptyRunning === null
        && d.characteristics.emptyRunning === null
        && d.characteristics.loadCharacteristic === null
        && d.characteristics.loadFactor === null))
        && (d.fuel === null || d.fuel.code === null)
      )
    }

    if(validatedQueryData.length > 1){
      throw new CustomError(
        {
          message: "The provided data was not enough to find the correct emission factor!",
          status: HttpStatusCode.BadRequest
        });
    }

  } 
  
  if ((queryData.length === 0)) {
    throw new CustomError(
      {
        message: "The provided data does not corespond to any emission factor!",
        status: HttpStatusCode.BadRequest
      }
    );
  }

  return validatedQueryData[0];
}

export const RoadIntensityFactorService = {
  getSpecificIntensityFactor,
};

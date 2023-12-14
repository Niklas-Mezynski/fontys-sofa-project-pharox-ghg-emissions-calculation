import { HttpStatusCode } from "axios";
import { CustomError } from "../../utils/errors";
import { validateInput } from "../../utils/functions";
import { onErrorHandledRequest } from "../../utils/request_handler";
import { CRUDEntityService } from "../../logic/common/CRUD_entity_service";
import { z } from "zod";

/** CREATE METHODS */

/**
 * Cloud function to add a Vehicle
 */
export const createVehicle = onErrorHandledRequest(
  async (request, response) => {
    const vehicle = await CRUDEntityService.createEntity(
      request.body,
      "VEHICLE"
    );
    response.status(200).json(vehicle);
  }
);

/**
 * Cloud function to add multiple Vehicles
 */
export const createVehicles = onErrorHandledRequest(
  async (request, response) => {
    const Vehicles = await CRUDEntityService.createEntities(
      request.body,
      "VEHICLE"
    );

    response.status(200).json(Vehicles);
  }
);

/** READ METHODS */

/**
 * Cloud function to fetch all the Vehicles
 */
export const getVehicles = onErrorHandledRequest(async (request, response) => {
  const vehicles = await CRUDEntityService.getEntities("VEHICLE");
  response.json(vehicles);
});

/**
 * Cloud function to fetch a Vehicle by ID
 */
export const getVehicleById = onErrorHandledRequest(
  async (request, response) => {
    const { id } = validateInput(
      request.query,
      z.object({ id: z.string() }),
      "Vehicle ID not Found"
    );

    if (!id) {
      throw new CustomError({
        status: HttpStatusCode.NotFound,
        message: "Vehicle ID not Found",
      });
    }

    const vehicle = await CRUDEntityService.getEntityById(id, "VEHICLE");
    response.json(vehicle);
  }
);

// /**
//  * Cloud function to fetch all the Vehicles with a certain Vehicle code
//  */
// export const getFuelEmissionFactorByFuelCode = onErrorHandledRequest(
//   async (request, response) => {
//     const { code } = validateInput(
//       request.query,
//       fuelSchema.partial(),
//       "Fuel Code not Found"
//     );

//     if (!code) {
//       throw new CustomError({
//         status: HttpStatusCode.NotFound,
//         message: "Fuel Code not Found",
//       });
//     }

//     const factors =
//       await FuelEmissionFactorService.getFuelEmissionFactorByFuelCode(code);
//     response.json(factors);
//   }
// );

/** UPDATE METHODS */

/**
 * Cloud function to update a Vehicle by ID
 */
export const updateVehicle = onErrorHandledRequest(
  async (request, response) => {
    const { id } = validateInput(
      request.query,
      z.object({ id: z.string() }),
      "Vehicle ID not Found"
    );

    if (!id) {
      throw new CustomError({
        status: HttpStatusCode.NotFound,
        message: "Vehicle ID not Found",
      });
    }

    const vehicle = await CRUDEntityService.updateEntity(
      request.body,
      id,
      "VEHICLE"
    );
    response.json(vehicle);
  }
);

/** DELETE METHODS */

/**
 * Cloud function to delete a Vehicle by ID
 */
export const deleteVehicle = onErrorHandledRequest(
  async (request, response) => {
    const { id } = validateInput(
      request.query,
      z.object({ id: z.string() }),
      "Vehicle ID not Found"
    );

    if (!id) {
      throw new CustomError({
        status: HttpStatusCode.NotFound,
        message: "Vehicle ID not Found",
      });
    }

    await CRUDEntityService.deleteEntity(id, "VEHICLE");
    response.status(200).send("Vehicle deleted.");
  }
);

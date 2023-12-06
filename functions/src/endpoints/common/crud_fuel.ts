import { HttpStatusCode } from "axios";
import { CustomError } from "../../utils/errors";
import { validateInput } from "../../utils/functions";
import { onErrorHandledRequest } from "../../utils/request_handler";
import { CRUDEntityService } from "../../logic/common/CRUD_entity_service";
import { z } from "zod";

/** CREATE METHODS */

/**
 * Cloud function to add a Fuel
 */
export const createFuel = onErrorHandledRequest(
  async (request, response) => {
    const fuel = await CRUDEntityService.createEntity(
      request.body,
      "FUEL"
    );
    response.status(200).json(fuel);
  }
);

/**
 * Cloud function to add multiple Fuels
 */
export const createFuels = onErrorHandledRequest(
  async (request, response) => {
    const fuels =
      await CRUDEntityService.createEntities(
        request.body,
        "FUEL"
      );

    response.status(200).json(fuels);
  }
);

/** READ METHODS */

/**
 * Cloud function to fetch all the Fuels
 */
export const getFuels = onErrorHandledRequest(
  async (request, response) => {
    const fuels = await CRUDEntityService.getEntities("FUEL");
    response.json(fuels);
  }
);

/**
 * Cloud function to fetch a Fuel by ID
 */
export const getFuelById = onErrorHandledRequest(
  async (request, response) => {
    const { id } = validateInput(
      request.query,
      z.object({ id: z.string() }),
      "Fuel ID not Found"
    );

    if (!id) {
      throw new CustomError({
        status: HttpStatusCode.NotFound,
        message: "Fuel ID not Found",
      });
    }

    const fuel = await CRUDEntityService.getEntityById(
      id,
      "FUEL"
    );
    response.json(fuel);
  }
);

// /**
//  * Cloud function to fetch all the Fuels with a certain Fuel code
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
 * Cloud function to update a Fuel by ID
 */
export const updateFuel = onErrorHandledRequest(
  async (request, response) => {
    const { id } = validateInput(
      request.query,
      z.object({ id: z.string() }),
      "Fuel ID not Found"
    );

    if (!id) {
      throw new CustomError({
        status: HttpStatusCode.NotFound,
        message: "Fuel ID not Found",
      });
    }

    const fuel = await CRUDEntityService.updateEntity(
      request.body,
      id,
      "FUEL"
    );
    response.json(fuel);
  }
);

/** DELETE METHODS */

/**
 * Cloud function to delete a Fuel by ID
 */
export const deleteFuel = onErrorHandledRequest(
  async (request, response) => {
    const { id } = validateInput(
      request.query,
      z.object({ id: z.string() }),
      "Fuel ID not Found"
    );

    if (!id) {
      throw new CustomError({
        status: HttpStatusCode.NotFound,
        message: "Fuel ID not Found",
      });
    }

    await CRUDEntityService.deleteEntity(
      id,
      "FUEL"
    );
    response.status(200).send("Fuel deleted.");
  }
);

import { HttpStatusCode } from "axios";
import { CRUDEntityService } from "../../logic/common/CRUD_entity_service";
import { calculationReportSchema } from "../../models/emission_calculations/emission_calculation_model";
import { validateInput } from "../../utils/functions";
import { onErrorHandledRequest } from "../../utils/request_handler";
import { CustomError } from "../../utils/errors";

/** CREATE METHODS */



/** READ METHODS */

/**
 * Cloud function to fetch all the emission calculation reports
 */
export const getEmissionCalculationReports = onErrorHandledRequest(
  async (request, response) => {
    const factors = await CRUDEntityService.getEntities("REPORT");
    response.json(factors);
  }
);

/**
 * Cloud function to fetch an emission calculation report by ID
 */
export const getEmissionCalculationReportById = onErrorHandledRequest(
  async (request, response) => {
    const { id } = validateInput(
      request.query,
      calculationReportSchema.partial(),
      "Emission Calculation Report ID not Found"
    );

    if (!id) {
      throw new CustomError({
        status: HttpStatusCode.NotFound,
        message: "Emission Calculation Report ID not Found",
      });
    }

    const factor = await CRUDEntityService.getEntityById(
      id,
      "REPORT"
    );
    response.json(factor);
  }
);

/** UPDATE METHODS */

/**
 * Cloud function to update an emission calculation report by ID
 */
export const updateEmissionCalculationReport = onErrorHandledRequest(
  async (request, response) => {
    const { id } = validateInput(
      request.query,
      calculationReportSchema.partial(),
      "Emission Calculation Report ID not Found"
    );

    if (!id) {
      throw new CustomError({
        status: HttpStatusCode.NotFound,
        message: "Emission Calculation Report ID not Found",
      });
    }

    const updatedFactor = await CRUDEntityService.updateEntity(
      request.body,
      id,
      "REPORT"
    );
    response.status(200).send(updatedFactor);
  }
);

/** DELETE METHODS */

/**
 * Cloud function to delete a emission calculation report by ID
 */
export const deleteEmissionCalculationReport = onErrorHandledRequest(
  async (request, response) => {
    const { id } = validateInput(
      request.query,
      calculationReportSchema.partial(),
      "Emission Calculation Report ID not Found"
    );

    if (!id) {
      throw new CustomError({
        status: HttpStatusCode.NotFound,
        message: "Emission Calculation Report ID not Found",
      });
    }

    await CRUDEntityService.deleteEntity(
      id,
      "REPORT"
    );
    response.status(200).send("Emission Calculation Report deleted.");
  }
);

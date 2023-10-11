import { HttpStatusCode } from "axios";
import { Response, Request } from "express";
import { logger } from "./logger";
import { HttpsFunction, onRequest } from "firebase-functions/v2/https";

/**
 * Custom error class for HTTP errors
 */
export class CustomError extends Error {
  /**
   * @param {number} status
   * @param {object} payload
   */
  constructor(
    private payload: {
      status: HttpStatusCode;
      message: string;
      [key: string]: unknown;
    }
  ) {
    super(payload.message);
  }

  /**
   * Returns the status code of the error
   */
  public get status() {
    return this.payload.status;
  }

  /**
   * Returns the message of the error
   */
  public get message() {
    return this.payload.message;
  }

  /**
   * Converts the error to a response object
   * @return {object} The error as a response object
   */
  public toResponseObject() {
    return { ...this.payload };
  }
}

/**
 * Handles an error by logging it and sending it to the client
 * @param {Response} response The response object to send the error to
 * @param {unknown} error The error to handle
 */
export function handleError(response: Response, error: unknown) {
  if (error instanceof CustomError) {
    const errorObject = error.toResponseObject();
    logger.error("Handled Error", errorObject);
    response.status(error.status).json(errorObject);
  } else {
    logger.error("Unhandled Error", error);
    response.status(500).send("Internal Server Error");
  }
}

/**
 * Handles an HTTP request by catching errors and sending them to the client
 * @param {function} handler The request handler to wrap
 * @return {HttpsFunction} The firebase request handler
 */
export function onErrorHandledRequest(
  handler: (req: Request, resp: Response) => void | Promise<void>
): HttpsFunction {
  return onRequest(async (request, response) => {
    try {
      await handler(request, response);
    } catch (error) {
      handleError(response, error);
    }
  });
}

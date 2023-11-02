import { HttpStatusCode } from "axios";
import { Response } from "express";
import { logger } from "./logger";

/**
 * Custom error class for providing a consistent error handling.
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
 * Error handler that sends the error to the client.
 * **CustomError**s will be added with their payload and other errors will be sent with a *500 Internal Server Error*.
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

import { Request, Response } from "express";
import { HttpsFunction, onRequest } from "firebase-functions/v2/https";
import { authenticate } from "./authentication";
import { handleError } from "./errors";

/**
 * A wrapper for the firebase request handler that handles errors in a consistent way.
 * It also makes sure that the request is authenticated and adds the CORS header.
 * Throw a **CustomError** anywhere in the handler to send it to the client.
 * @param {function} handler The request handler to wrap
 * @return {HttpsFunction} The firebase request handler
 */
export function onErrorHandledRequest(
  handler: (req: Request, resp: Response) => void | Promise<void>
): HttpsFunction {
  return onRequest(async (request, response) => {
    try {
      authenticate(request.headers.authorization);
      response.setHeader("Access-Control-Allow-Origin", "*");

      await handler(request, response);
    } catch (error) {
      handleError(response, error);
    }
  });
}

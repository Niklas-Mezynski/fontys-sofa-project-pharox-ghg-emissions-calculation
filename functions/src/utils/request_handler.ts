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
      // Set CORS headers for preflight requests
      // Allows GETs from all origins with Authorization header

      response.set("Access-Control-Allow-Origin", "*");
      response.set("Access-Control-Allow-Credentials", "true");
      response.set("Access-Control-Allow-Headers", "*");
      response.set("Access-Control-Allow-Methods", "GET, POST");

      if (request.method === "OPTIONS") {
        // Send response to OPTIONS requests
        response.set("Access-Control-Max-Age", "3600");
        response.status(204).send("");
        return;
      }

      authenticate(request.headers.authorization);

      await handler(request, response);
    } catch (error) {
      handleError(response, error);
    }
  });
}

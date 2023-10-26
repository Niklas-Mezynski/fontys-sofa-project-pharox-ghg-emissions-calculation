import { CustomError } from "./errors";
import { HttpStatusCode } from "axios";

/**
   * Function to determinate whether the provided token is valid
   * @param {string} token - the provided authentication token
   */
export function authenticate(token: string): void {
  if (!process.env.AUTH_TOKEN) {
    throw new CustomError({
      status: HttpStatusCode.NotFound,
      message: "No authentication token found",
    });
  }

  if (process.env.AUTH_TOKEN !== token) {
    throw new CustomError({
      status: HttpStatusCode.Forbidden,
      message: "Wrong authentication token",
    });
  }
}
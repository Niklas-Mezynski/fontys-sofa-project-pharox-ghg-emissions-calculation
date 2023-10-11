import { z } from "zod";
import { CustomError } from "./errors";
import { HttpStatusCode } from "axios";

/**
 * Throws a custom error with the parsed Zod error.
 * @param {z.ZodIssue[]} issues the issues from the Zod safe parser.
 * @param {string} message the message of the custom error.
 * @return {CustomError} the custom error.
 */
export function parseZodError(issues: z.ZodIssue[], message?: string) {
  const parsedIssues = issues.map((issue) => {
    return {
      inputField: issue.path.join("."),
      error: issue.message,
    };
  });

  return new CustomError({
    status: HttpStatusCode.BadRequest,
    message: message ?? "Invalid input data",
    errors: parsedIssues,
  });
}

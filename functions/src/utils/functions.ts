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

/**
 * Utility function that validates the input against the given schema or throws a CustomError.
 * @param {unknown} input The input to validate
 * @param {z.Schema<T>} schema The zod schema to validate the input against
 * @param {string} message The error message to use if the input is invalid
 * @return {T} The validated data that is guaranteed to be of type T
 * @throws {CustomError} containing the validation error
 */
export function validateInput<T>(
  input: unknown,
  schema: z.Schema<T>,
  message?: string
) {
  const parseResult = schema.safeParse(input);

  if (!parseResult.success) {
    throw parseZodError(
      parseResult.error.issues,
      message ?? "Invalid input data"
    );
  }

  return parseResult.data;
}
import { ZodTypeDef, z } from "zod";
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
    if (issue.code === "invalid_type") {
      return {
        inputField: issue.path.join("."),
        error: issue.message,
      };
    }
    return issue;
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
export function validateInput<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Output = any,
  Def extends ZodTypeDef = ZodTypeDef,
  Input = Output,
>(input: unknown, schema: z.Schema<Output, Def, Input>, message?: string) {
  const parseResult = schema.safeParse(input);

  if (!parseResult.success) {
    throw parseZodError(
      parseResult.error.issues,
      message ?? "Invalid input data"
    );
  }

  return parseResult.data;
}

/**
 * Utility function to use in a switch statement to ensure that all cases are handled. (for exhaustive matching)
 * @throws A CustomError in case the function is called anyways.
 */
export function exhaustiveMatchingGuard(
  _: never,
  errorMessage?: string
): never {
  throw new CustomError({
    status: HttpStatusCode.InternalServerError,
    message:
      errorMessage ??
      "This statement should never be reached. This is a bug and means there is a unhandled case in an exhaustive matching guard",
  });
}

type EntityWithReport<T> = {
  report: unknown[];
} & T;

function runWithReport<I, O>(
  input: EntityWithReport<I>,
  transform: (_: I) => EntityWithReport<O>
): EntityWithReport<O> {
  const result = transform(input);
  result.report = input.report.concat(result.report);
  return result;
}

function getEmissionFactor(input: {
  fuelType: string;
  fuelCode: string;
}): EntityWithReport<{ emissionFactor: number }> {
  const { fuelType, fuelCode } = input;
  const emissionFactor = 1;
  return {
    emissionFactor,
    report: [
      `Emission factor for ${fuelType} ${fuelCode} is ${emissionFactor}`,
    ],
  };
}

// const factorWithReport = runWithReport(
//   { fuelType: "Diesel", fuelCode: "D1", report: [] },
//   getEmissionFactor
// );

runWithReport(
  { fuelType: "Diesel", fuelCode: "D1", report: [] },
  getEmissionFactor
);

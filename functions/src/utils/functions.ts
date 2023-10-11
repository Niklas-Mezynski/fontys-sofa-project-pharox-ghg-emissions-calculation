import { z } from "zod";
/**
 * Parses the Zod error into a more readable format.
 * @param {z.ZodIssue[]} issues the issues from the Zod safe parser.
 * @return {object[]} an array of objects with the input field and the error.
 */
export function parseZodError(issues: z.ZodIssue[]) {
  return issues.map((issue) => {
    return {
      inputField: issue.path.join("."),
      error: issue.message,
    };
  });
}

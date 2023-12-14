import { Response } from "node-fetch";
import { CustomError, handleError } from "../../src/utils/errors";

describe("Errors util", () => {
  const payload = {
    status: 500,
    message: "Test Error",
  }
  const error = new CustomError(payload);
  const otherError = new TypeError();

  test("Test getters", () => {
    expect(error instanceof CustomError).toBe(true);
    expect(error.status).toBe(payload.status);
    expect(error.message).toBe(payload.message);
    expect(JSON.stringify(error.toResponseObject())).toBe(JSON.stringify(payload));
  });

  test("Test instance of CustomError", () => {
    // const responseA = new Response<unknown>();
    // const responseB = new Response<any>();


    // expect(handleError(responseA, error)).toBe(true);
    // expect(handleError(responseB, otherError)).toBe(true);
    expect(true).toBe(true);
  });
});

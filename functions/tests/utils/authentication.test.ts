import { HttpStatusCode } from "axios";
import { authenticate } from "../../src/utils/authentication";
import { CustomError } from "../../src/utils/errors";

describe("Utils - Authentication", () => {
  beforeAll( () => {
    process.env.AUTH_TOKEN = "P95SfxvCPO8T2jC2tLCGK8MepjpiOVE00qI5k4MJIwYfKrray7J4zEq0fPLa7Z2k";
  });

  test("User is authenticated", async () => {
    const userToken = "P95SfxvCPO8T2jC2tLCGK8MepjpiOVE00qI5k4MJIwYfKrray7J4zEq0fPLa7Z2k";

    expect((() => {
      authenticate(userToken);
    })).not.toThrowError();
  });

  test("User is not authenticated throws error'", async () => {
    const userToken = "5GJqmDbyYb9VCIP1JRlbGRBYJcUOjBUdwzKO7RzxKdE0Co3aaAPJpa10lq7IxCPe";
    const error = new CustomError({
      status: HttpStatusCode.Forbidden,
      message: "Wrong authentication token",
    });

    try {
      authenticate(userToken);
    } catch (err) {
      expect(err).toBeInstanceOf(CustomError);
      expect((<CustomError>err).message).toBe(error.message);
      expect((<CustomError>err).status).toBe(error.status);
    }
  });

  test("No availble authentication token throws error'", async () => {
    const userToken = "5GJqmDbyYb9VCIP1JRlbGRBYJcUOjBUdwzKO7RzxKdE0Co3aaAPJpa10lq7IxCPe";
    delete process.env.AUTH_TOKEN;

    const error = new CustomError({
      status: HttpStatusCode.NotFound,
      message: "No authentication token found",
    });

    try {
      authenticate(userToken);
    } catch (err) {
      expect(err).toBeInstanceOf(CustomError);
      expect((<CustomError>err).message).toBe(error.message);
      expect((<CustomError>err).status).toBe(error.status);
    }
  });
});

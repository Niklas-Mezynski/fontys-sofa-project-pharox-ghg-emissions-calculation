import * as indexFunctions from "../src/index";

describe("Index - Hello World", () => {
  test("Hello World function returns 'Hello world!'", async () => {
    // A fake request object, with req.query.text set to 'input'
    const req = {body: {}};

    // A fake response object, with a stubbed redirect function which asserts that it is called
    // with parameters 303, 'new_ref'.
    const res = {
      send: (payload: string) => {
        expect(payload).toBe("Hello world!");
      },
    };

    // Invoke addMessage with our fake request and response objects. This will cause the
    // assertions in the response object to be evaluated.
    await indexFunctions.helloWorld(req as any, res as any);
  });
});

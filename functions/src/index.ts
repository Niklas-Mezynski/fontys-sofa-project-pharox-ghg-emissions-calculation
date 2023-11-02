import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { generateAndSaveOpenApiYaml } from "./documentation/open_api_generator";
import { authenticate } from "./utils/authentication";
import { onErrorHandledRequest } from "./utils/errors";

initializeApp();

export const db = getFirestore();

export const helloWorld = onErrorHandledRequest((request, response) => {
  authenticate(request.headers.authorization);
  response.json({ message: "Hello World" });

  // if (Math.random() > 0.5) {
  //   throw new CustomError({
  //     status: HttpStatusCode.BadRequest,
  //     message: "Test error",
  //     someOtherData: 1,
  //     someOtherDat2: {
  //       a: [1, 2],
  //       b: ["a", "b"],
  //     },
  //   });
  // } else {
  //   response.json({ message: "Hello World" });
  // }
});

if (process.env.GENERATE_OPENAPI === "true") {
  generateAndSaveOpenApiYaml();
  console.log("OpenAPI YAML generated");
  process.exit(0);
}

export * from "./endpoints";

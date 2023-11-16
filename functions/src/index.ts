import { generateAndSaveOpenApiYaml } from "./documentation/open_api_generator";
import { onErrorHandledRequest } from "./utils/request_handler";

export const helloWorld = onErrorHandledRequest((request, response) => {
  response.json({ message: "Hello World" });
});

if (process.env.GENERATE_OPENAPI === "true") {
  generateAndSaveOpenApiYaml();
  console.log("OpenAPI YAML generated");
  process.exit(0);
}

export * from "./endpoints";

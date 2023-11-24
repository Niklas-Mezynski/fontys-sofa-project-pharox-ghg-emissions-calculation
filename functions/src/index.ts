import { generateAndSaveOpenApiYaml } from "./documentation/open_api_generator";

if (process.env.GENERATE_OPENAPI === "true") {
  generateAndSaveOpenApiYaml();
  console.log("OpenAPI YAML generated");
  process.exit(0);
}

export * from "./endpoints";

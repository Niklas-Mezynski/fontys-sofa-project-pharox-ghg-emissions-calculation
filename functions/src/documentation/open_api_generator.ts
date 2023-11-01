import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import * as fs from "fs";
import * as path from "path";
import * as YAML from "yaml";
import { freightEmissionCalculationInputSchema } from "../models/emission_calculations/emission_calculation_model";
import { openApiDocumentConfig } from "./open_api_document_config";

const registry = new OpenAPIRegistry();

// Register definitions here
registry.register(
  "EmissionCalculationInput",
  freightEmissionCalculationInputSchema
);

// Register paths here
registry.registerPath({
  method: "post",
  path: "/emissionCalculator",
  summary: "Calculate GHG emissions",
  description: "Cloud function to perform an emission calculation",
  tags: ["Emission calculations"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: freightEmissionCalculationInputSchema,
        },
      },
      description: "The calculation input",
      required: true,
    },
  },
  responses: {
    "200": {
      description: "The emission calculation overview/report",
    },
  },
});

const generator = new OpenApiGeneratorV3(registry.definitions);

export function getOpenApiYaml() {
  return generator.generateDocument(openApiDocumentConfig);
}

export function generateAndSaveOpenApiYaml() {
  const openApiDocs = getOpenApiYaml();

  // Save to file in ../swagger2.yaml
  fs.writeFileSync(
    path.join(__dirname, "../../../..", "swagger-auto.yaml"),
    YAML.stringify(openApiDocs)
  );
}

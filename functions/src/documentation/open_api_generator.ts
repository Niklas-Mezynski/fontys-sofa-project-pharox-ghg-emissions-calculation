import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import * as fs from "fs";
import * as path from "path";
import * as YAML from "yaml";
import { freightEmissionCalculationInputSchema } from "../models/emission_calculations/emission_calculation_model";
import { openApiDocumentConfig } from "./open_api_document_config";
import { emissionCalculationOpenApiPaths } from "./paths/emission_calculations";
import { emissionFactorsOpenApiPaths } from "./paths/emission_factors";
import {
  fuelEmissionFactorSchema,
  fuelFactorSchema,
  fuelSchema,
} from "../models/emission_factors/fuel_emission_factors";
import { unitsOpenApiPaths } from "./paths/units";
import { z } from "zod";
import { allUnits, unitTypes } from "../models/units/units";

export function getOpenApiYaml() {
  const registry = new OpenAPIRegistry();

  // -- Register definitions here --
  registry.register(
    "EmissionCalculationInput",
    freightEmissionCalculationInputSchema
  );
  registry.register("FuelEmissionFactor", fuelEmissionFactorSchema);
  registry.register("Fuel", fuelSchema);
  registry.register("FuelFactor", fuelFactorSchema);
  registry.register("UnitTypes", z.enum(unitTypes));
  registry.register("Units", z.enum(allUnits));

  // -- Register paths here --
  emissionCalculationOpenApiPaths.forEach((path) =>
    registry.registerPath(path)
  );
  emissionFactorsOpenApiPaths.forEach((path) => registry.registerPath(path));
  unitsOpenApiPaths.forEach((path) => registry.registerPath(path));

  const generator = new OpenApiGeneratorV3(registry.definitions);

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

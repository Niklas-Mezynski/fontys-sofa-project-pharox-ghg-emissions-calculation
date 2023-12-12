import { CRUDEntityService } from "../../../src/logic/common/CRUD_entity_service";
import { calculationReportSchema } from "../../../src/models/emission_calculations/emission_calculation_model";
import { fuelEmissionFactorSchema } from "../../../src/models/emission_factors/fuel_emission_factors";
import { roadIntensityFactorSchema } from "../../../src/models/emission_factors/road_intensity_factors";
import { FirestoreUtil } from "../../../src/utils/firestore";
import { UnknownObject } from "../../../src/utils/types";
import { calculationReports, fuelEmissionFactors, roadIntensityFactors } from "../../helpers/test-data";

type EntityType = keyof typeof CRUDEntityService.entitySpecificData;

describe("Emission factors - CRUD operations", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test.each([
    {type: "FUEL_FACTOR", entityName: "Fuel Emission Factor", collectionName: "fuel_emission_factors", validationSchema: fuelEmissionFactorSchema, testData: fuelEmissionFactors},
    {type: "ROAD_FACTOR", entityName: "Road Intensity Emission Factor", collectionName: "intensity_factors_road", validationSchema: roadIntensityFactorSchema, testData: roadIntensityFactors},
    // {type: "REPORT", entityName: "Emission Calculation Report", collectionName: "emission_calculation_reports", validationSchema: calculationReportSchema, testData: calculationReports},
    // {type: "FUEL", entityName: "Fuel", collectionName: "fuels", validationSchema: fuelSchema, testData: fuels},
    // {type: "VEHICLE", entityName: "Vehicle", collectionName: "vehicles", validationSchema: vehicleSchema, testData: vehicles},
  ])("Create an entity of type $entityName", async ({type, entityName, collectionName, validationSchema, testData}) => {
    jest.spyOn(FirestoreUtil, "createWithCustomId").mockResolvedValue(testData[0]);
    const result = await CRUDEntityService.createEntity(testData[0], type as EntityType);

    expect(result).toStrictEqual(testData[0]);
    // expect(result).toBeInstanceOf(type as EntityType);
  });

  test.each([
    {type: "FUEL_FACTOR", entityName: "Fuel Emission Factor", collectionName: "fuel_emission_factors", validationSchema: fuelEmissionFactorSchema, testData: fuelEmissionFactors},
    {type: "ROAD_FACTOR", entityName: "Road Intensity Emission Factor", collectionName: "intensity_factors_road", validationSchema: roadIntensityFactorSchema, testData: roadIntensityFactors},
    // {type: "REPORT", entityName: "Emission Calculation Report", collectionName: "emission_calculation_reports", validationSchema: calculationReportSchema, testData: calculationReports},
    // {type: "FUEL", entityName: "Fuel", collectionName: "fuels", validationSchema: fuelSchema, testData: fuels},
    // {type: "VEHICLE", entityName: "Vehicle", collectionName: "vehicles", validationSchema: vehicleSchema, testData: vehicles},
  ])("Create multiple entities of type $entityName", async ({type, entityName, collectionName, validationSchema, testData}) => {
    jest.spyOn(FirestoreUtil, "createManyWithCustomId").mockResolvedValue(testData);
    const result = await CRUDEntityService.createEntities(testData, type as EntityType);

    expect(result).toStrictEqual(testData);
    expect(result.length).toBe(testData.length);
  });

  test.each([
    {type: "FUEL_FACTOR", entityName: "Fuel Emission Factor", collectionName: "fuel_emission_factors", validationSchema: fuelEmissionFactorSchema, testData: fuelEmissionFactors},
    {type: "ROAD_FACTOR", entityName: "Road Intensity Emission Factor", collectionName: "intensity_factors_road", validationSchema: roadIntensityFactorSchema, testData: roadIntensityFactors},
    // {type: "REPORT", entityName: "Emission Calculation Report", collectionName: "emission_calculation_reports", validationSchema: calculationReportSchema, testData: calculationReports},
    // {type: "FUEL", entityName: "Fuel", collectionName: "fuels", validationSchema: fuelSchema, testData: fuels},
    // {type: "VEHICLE", entityName: "Vehicle", collectionName: "vehicles", validationSchema: vehicleSchema, testData: vehicles},
  ])("Get an entity of type $entityName by id", async ({type, entityName, collectionName, validationSchema, testData}) => {
    jest.spyOn(FirestoreUtil, "getById").mockResolvedValue(testData[0]);
    const result = await CRUDEntityService.getEntityById(testData[0].id, type as EntityType);

    expect(result).toStrictEqual(testData[0]);
  });

  test.each([
    {type: "FUEL_FACTOR", entityName: "Fuel Emission Factor", collectionName: "fuel_emission_factors", validationSchema: fuelEmissionFactorSchema, testData: fuelEmissionFactors},
    {type: "ROAD_FACTOR", entityName: "Road Intensity Emission Factor", collectionName: "intensity_factors_road", validationSchema: roadIntensityFactorSchema, testData: roadIntensityFactors},
    // {type: "REPORT", entityName: "Emission Calculation Report", collectionName: "emission_calculation_reports", validationSchema: calculationReportSchema, testData: calculationReports},
    // {type: "FUEL", entityName: "Fuel", collectionName: "fuels", validationSchema: fuelSchema, testData: fuels},
    // {type: "VEHICLE", entityName: "Vehicle", collectionName: "vehicles", validationSchema: vehicleSchema, testData: vehicles},
  ])("Get all entities of type $entityName", async ({type, entityName, collectionName, validationSchema, testData}) => {
    jest.spyOn(FirestoreUtil, "getAll").mockResolvedValue(testData);
    const result = await CRUDEntityService.getEntities(type as EntityType);

    expect(result).toStrictEqual(testData);
    expect(result.length).toBe(testData.length);
  });

  test.each([
    {type: "FUEL_FACTOR", entityName: "Fuel Emission Factor", collectionName: "fuel_emission_factors", validationSchema: fuelEmissionFactorSchema, testData: fuelEmissionFactors},
    {type: "ROAD_FACTOR", entityName: "Road Intensity Emission Factor", collectionName: "intensity_factors_road", validationSchema: roadIntensityFactorSchema, testData: roadIntensityFactors},
    // {type: "REPORT", entityName: "Emission Calculation Report", collectionName: "emission_calculation_reports", validationSchema: calculationReportSchema, testData: calculationReports},
    // {type: "FUEL", entityName: "Fuel", collectionName: "fuels", validationSchema: fuelSchema, testData: fuels},
    // {type: "VEHICLE", entityName: "Vehicle", collectionName: "vehicles", validationSchema: vehicleSchema, testData: vehicles},
  ])("Update an entity of type $entityName", async ({type, entityName, collectionName, validationSchema, testData}) => {
    jest.spyOn(FirestoreUtil, "updateById").mockResolvedValue(testData[0]);

    expect(await CRUDEntityService.updateEntity(testData[0], testData[0].id, type as EntityType)).toStrictEqual(testData[0]);
  });

  test.each([
    {type: "FUEL_FACTOR", entityName: "Fuel Emission Factor", collectionName: "fuel_emission_factors", validationSchema: fuelEmissionFactorSchema, testData: fuelEmissionFactors},
    {type: "ROAD_FACTOR", entityName: "Road Intensity Emission Factor", collectionName: "intensity_factors_road", validationSchema: roadIntensityFactorSchema, testData: roadIntensityFactors},
    // {type: "REPORT", entityName: "Emission Calculation Report", collectionName: "emission_calculation_reports", validationSchema: calculationReportSchema, testData: calculationReports},
    // {type: "FUEL", entityName: "Fuel", collectionName: "fuels", validationSchema: fuelSchema, testData: fuels},
    // {type: "VEHICLE", entityName: "Vehicle", collectionName: "vehicles", validationSchema: vehicleSchema, testData: vehicles},
  ])("Delete an entity of type $entityName", async ({type, entityName, collectionName, validationSchema, testData}) => {
    jest.spyOn(FirestoreUtil, "getById").mockResolvedValue(testData[0]);
    jest.spyOn(FirestoreUtil, "deleteById").mockResolvedValue();

    // expect(await CRUDEntityService.deleteEntity(testData[0].id, type as EntityType)).toBeVoid();
  });

});

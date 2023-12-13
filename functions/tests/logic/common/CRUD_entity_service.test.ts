import { Filter } from "firebase-admin/firestore";
import { CRUDEntityService } from "../../../src/logic/common/CRUD_entity_service";
import { fuelEmissionFactorSchema } from "../../../src/models/emission_factors/fuel_emission_factors";
import { roadIntensityFactorSchema } from "../../../src/models/emission_factors/road_intensity_factors";
import { CustomError } from "../../../src/utils/errors";
import { FirestoreUtil } from "../../../src/utils/firestore";
import { fuelEmissionFactors, roadIntensityFactors } from "../../helpers/test-data";

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
  ])("Create an entity of type $entityName throws validation error", async ({type, entityName, collectionName, validationSchema, testData}) => {
    jest.spyOn(FirestoreUtil, "createWithCustomId").mockResolvedValue(testData[0]);

    const data = {
      id: "12345",
      value: 25,
    };

    await expect(CRUDEntityService.createEntity(data, type as EntityType)).rejects.toThrow(CustomError);
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
  ])("Create multiple entities of type $entityName throws validation error", async ({type, entityName, collectionName, validationSchema, testData}) => {
    jest.spyOn(FirestoreUtil, "createManyWithCustomId").mockResolvedValue(testData);

    const data = [{
      id: "12345",
      value: 25,
    }];

    await expect(CRUDEntityService.createEntities(data, type as EntityType)).rejects.toThrow(CustomError);
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
  ])("Get an entity of type $entityName by id - Throws validation error", async ({type, entityName, collectionName, validationSchema, testData}) => {
    const data = {
      id: "12345",
      value: 25,
    };
    jest.spyOn(FirestoreUtil, "getById").mockResolvedValue(data);

    await expect(CRUDEntityService.getEntityById(testData[0].id, type as EntityType)).rejects.toThrow(CustomError);
  });

  test.each([
    {type: "FUEL_FACTOR", entityName: "Fuel Emission Factor", collectionName: "fuel_emission_factors", validationSchema: fuelEmissionFactorSchema, testData: fuelEmissionFactors},
    {type: "ROAD_FACTOR", entityName: "Road Intensity Emission Factor", collectionName: "intensity_factors_road", validationSchema: roadIntensityFactorSchema, testData: roadIntensityFactors},
    // {type: "REPORT", entityName: "Emission Calculation Report", collectionName: "emission_calculation_reports", validationSchema: calculationReportSchema, testData: calculationReports},
    // {type: "FUEL", entityName: "Fuel", collectionName: "fuels", validationSchema: fuelSchema, testData: fuels},
    // {type: "VEHICLE", entityName: "Vehicle", collectionName: "vehicles", validationSchema: vehicleSchema, testData: vehicles},
  ])("Get an entity of type $entityName by id - Doesn't find any value", async ({type, entityName, collectionName, validationSchema, testData}) => {
    jest.spyOn(FirestoreUtil, "getById").mockResolvedValue(undefined);

    await expect(CRUDEntityService.getEntityById("12345", type as EntityType)).rejects.toThrow(CustomError);
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
  ])("Get all entities of type $entityName throws validation error", async ({type, entityName, collectionName, validationSchema, testData}) => {
    const data = [{
      id: "12345",
      value: 25,
    }];
    jest.spyOn(FirestoreUtil, "getAll").mockResolvedValue(data);

    await expect(CRUDEntityService.getEntities(type as EntityType)).rejects.toThrow(CustomError);
  });

  test.each([
    {type: "FUEL_FACTOR", entityName: "Fuel Emission Factor", collectionName: "fuel_emission_factors", validationSchema: fuelEmissionFactorSchema, testData: fuelEmissionFactors},
    {type: "ROAD_FACTOR", entityName: "Road Intensity Emission Factor", collectionName: "intensity_factors_road", validationSchema: roadIntensityFactorSchema, testData: roadIntensityFactors},
    // {type: "REPORT", entityName: "Emission Calculation Report", collectionName: "emission_calculation_reports", validationSchema: calculationReportSchema, testData: calculationReports},
    // {type: "FUEL", entityName: "Fuel", collectionName: "fuels", validationSchema: fuelSchema, testData: fuels},
    // {type: "VEHICLE", entityName: "Vehicle", collectionName: "vehicles", validationSchema: vehicleSchema, testData: vehicles},
  ])("Get all entities by filter of type $entityName", async ({type, entityName, collectionName, validationSchema, testData}) => {
    const filter = Filter.where("id", "in", testData.map((item) => item.id));

    jest.spyOn(FirestoreUtil, "getByFilter").mockResolvedValue(testData);
    const result = await CRUDEntityService.getEntitiesByFilter(filter, type as EntityType);

    expect(result).toStrictEqual(testData);
    expect(result.length).toBe(testData.length);
  });

  test.each([
    {type: "FUEL_FACTOR", entityName: "Fuel Emission Factor", collectionName: "fuel_emission_factors", validationSchema: fuelEmissionFactorSchema, testData: fuelEmissionFactors},
    {type: "ROAD_FACTOR", entityName: "Road Intensity Emission Factor", collectionName: "intensity_factors_road", validationSchema: roadIntensityFactorSchema, testData: roadIntensityFactors},
    // {type: "REPORT", entityName: "Emission Calculation Report", collectionName: "emission_calculation_reports", validationSchema: calculationReportSchema, testData: calculationReports},
    // {type: "FUEL", entityName: "Fuel", collectionName: "fuels", validationSchema: fuelSchema, testData: fuels},
    // {type: "VEHICLE", entityName: "Vehicle", collectionName: "vehicles", validationSchema: vehicleSchema, testData: vehicles},
  ])("Get all entities by filter of type $entityName throws validation error", async ({type, entityName, collectionName, validationSchema, testData}) => {
    const data = [{
      id: "12345",
      value: 25,
    }];
    const filter = Filter.where("id", "==", "12345");
    jest.spyOn(FirestoreUtil, "getByFilter").mockResolvedValue(data);

    await expect(CRUDEntityService.getEntitiesByFilter(filter, type as EntityType)).rejects.toThrow(CustomError);
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
  ])("Update an entity of type $entityName - Doesn't find entity to be updated", async ({type, entityName, collectionName, validationSchema, testData}) => {
    jest.spyOn(FirestoreUtil, "updateById").mockResolvedValue(undefined);

    await expect(CRUDEntityService.updateEntity(testData[0], testData[0].id, type as EntityType)).rejects.toThrow(CustomError);
  });

  test.each([
    {type: "FUEL_FACTOR", entityName: "Fuel Emission Factor", collectionName: "fuel_emission_factors", validationSchema: fuelEmissionFactorSchema, testData: fuelEmissionFactors},
    {type: "ROAD_FACTOR", entityName: "Road Intensity Emission Factor", collectionName: "intensity_factors_road", validationSchema: roadIntensityFactorSchema, testData: roadIntensityFactors},
    // {type: "REPORT", entityName: "Emission Calculation Report", collectionName: "emission_calculation_reports", validationSchema: calculationReportSchema, testData: calculationReports},
    // {type: "FUEL", entityName: "Fuel", collectionName: "fuels", validationSchema: fuelSchema, testData: fuels},
    // {type: "VEHICLE", entityName: "Vehicle", collectionName: "vehicles", validationSchema: vehicleSchema, testData: vehicles},
  ])("Update an entity of type $entityName throws validation error", async ({type, entityName, collectionName, validationSchema, testData}) => {
    const data = {
      id: "12345",
      value: 25,
    };
    jest.spyOn(FirestoreUtil, "updateById").mockResolvedValue(testData[0]);

    await expect(CRUDEntityService.updateEntity(data, testData[0].id, type as EntityType)).rejects.toThrow(CustomError);
  });

  test.each([
    {type: "FUEL_FACTOR", entityName: "Fuel Emission Factor", collectionName: "fuel_emission_factors", validationSchema: fuelEmissionFactorSchema, testData: fuelEmissionFactors},
    {type: "ROAD_FACTOR", entityName: "Road Intensity Emission Factor", collectionName: "intensity_factors_road", validationSchema: roadIntensityFactorSchema, testData: roadIntensityFactors},
    // {type: "REPORT", entityName: "Emission Calculation Report", collectionName: "emission_calculation_reports", validationSchema: calculationReportSchema, testData: calculationReports},
    // {type: "FUEL", entityName: "Fuel", collectionName: "fuels", validationSchema: fuelSchema, testData: fuels},
    // {type: "VEHICLE", entityName: "Vehicle", collectionName: "vehicles", validationSchema: vehicleSchema, testData: vehicles},
  ])("Delete an entity of type $entityName", async ({type, entityName, collectionName, validationSchema, testData}) => {
    jest.spyOn(FirestoreUtil, "getById").mockResolvedValue(testData[0]);
    const deleteByIdMock = jest.spyOn(FirestoreUtil, "deleteById").mockResolvedValue();

    await CRUDEntityService.deleteEntity(testData[0].id, type as EntityType);

    expect(deleteByIdMock).toHaveBeenCalled();
  });

  test.each([
    {type: "FUEL_FACTOR", entityName: "Fuel Emission Factor", collectionName: "fuel_emission_factors", validationSchema: fuelEmissionFactorSchema, testData: fuelEmissionFactors},
    {type: "ROAD_FACTOR", entityName: "Road Intensity Emission Factor", collectionName: "intensity_factors_road", validationSchema: roadIntensityFactorSchema, testData: roadIntensityFactors},
    // {type: "REPORT", entityName: "Emission Calculation Report", collectionName: "emission_calculation_reports", validationSchema: calculationReportSchema, testData: calculationReports},
    // {type: "FUEL", entityName: "Fuel", collectionName: "fuels", validationSchema: fuelSchema, testData: fuels},
    // {type: "VEHICLE", entityName: "Vehicle", collectionName: "vehicles", validationSchema: vehicleSchema, testData: vehicles},
  ])("Delete an entity of type $entityName throws error", async ({type, entityName, collectionName, validationSchema, testData}) => {
    jest.spyOn(FirestoreUtil, "getById").mockResolvedValue(undefined);
    jest.spyOn(FirestoreUtil, "deleteById").mockResolvedValue();

    await expect(CRUDEntityService.deleteEntity(testData[0].id, type as EntityType)).rejects.toThrow(CustomError);
  });

});

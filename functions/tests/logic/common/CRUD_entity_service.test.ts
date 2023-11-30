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
    {type: "FUEL", entityName: "Fuel Emission Factor", collectionName: "fuel_emission_factors", validationSchema: fuelEmissionFactorSchema, testData: fuelEmissionFactors},
    {type: "ROAD", entityName: "Road Intensity Emission Factor", collectionName: "intensity_factors_road", validationSchema: roadIntensityFactorSchema, testData: roadIntensityFactors},
    // {type: "REPORT", entityName: "Emission Calculation Report", collectionName: "emission_calculation_reports", validationSchema: calculationReportSchema, testData: calculationReports},
  ])("Create an entity of type $entityName", async ({type, entityName, collectionName, validationSchema, testData}) => {
    jest.spyOn(FirestoreUtil, "createWithCustomId").mockResolvedValue(testData[0]);

    const response = await CRUDEntityService.createEntity(testData[0], type as EntityType)
    expect(response).toStrictEqual(testData[0]);
    // expect(response).toBeInstanceOf(type as EntityType);
  });

  // test.each([
  //   ["FUEL", "Fuel Emission Factor", "fuel_emission_factors", fuelEmissionFactorSchema, fuelEmissionFactors],
  //   ["ROAD", "Road Intensity Emission Factor", "intensity_factors_road", roadIntensityFactorSchema, roadIntensityFactors],
  //   ["REPORT", "Emission Calculation Report", "emission_calculation_reports", calculationReportSchema, calculationReports],
  // ])("Create multiple entities of type %s", async (type, entityName, collectionName, validationSchema, testData) => {
  //   jest.spyOn(FirestoreUtil, "createManyWithCustomId").mockResolvedValue(testData);

  //   expect(await CRUDEntityService.createEntities(testData, type as EntityType)).toStrictEqual(testData);
  // });

  // test.each([
  //   ["FUEL", "Fuel Emission Factor", "fuel_emission_factors", fuelEmissionFactorSchema, fuelEmissionFactors],
  //   ["ROAD", "Road Intensity Emission Factor", "intensity_factors_road", roadIntensityFactorSchema, roadIntensityFactors],
  //   ["REPORT", "Emission Calculation Report", "emission_calculation_reports", calculationReportSchema, calculationReports],
  // ])("Get an entity of type %s by id", async (type, entityName: string, collectionName: string, validationSchema, testData) => {
  //   jest.spyOn(FirestoreUtil, "getById").mockResolvedValue(testData[0]);

  //   expect(await CRUDEntityService.getEntityById(testData[0].id, type as EntityType)).toStrictEqual(testData[0]);
  // });

  // test.each([
  //   ["FUEL", "Fuel Emission Factor", "fuel_emission_factors", fuelEmissionFactorSchema, fuelEmissionFactors],
  //   ["ROAD", "Road Intensity Emission Factor", "intensity_factors_road", roadIntensityFactorSchema, roadIntensityFactors],
  //   ["REPORT", "Emission Calculation Report", "emission_calculation_reports", calculationReportSchema, calculationReports],
  // ])("Get all entities of type %s", async (type, entityName, collectionName, validationSchema, testData) => {
  //   jest.spyOn(FirestoreUtil, "getAll").mockResolvedValue(testData);

  //   expect(await CRUDEntityService.getEntities(type as EntityType)).toStrictEqual(testData);
  // });

  // test.each([
  //   ["FUEL", "Fuel Emission Factor", "fuel_emission_factors", fuelEmissionFactorSchema, fuelEmissionFactors],
  //   ["ROAD", "Road Intensity Emission Factor", "intensity_factors_road", roadIntensityFactorSchema, roadIntensityFactors],
  //   ["REPORT", "Emission Calculation Report", "emission_calculation_reports", calculationReportSchema, calculationReports],
  // ])("Update an entity of type %s", async (type, entityName, collectionName, validationSchema, testData) => {
  //   jest.spyOn(FirestoreUtil, "updateById").mockResolvedValue(testData[0]);

  //   expect(await CRUDEntityService.updateEntity(testData[0], testData[0].id, type as EntityType)).toStrictEqual(testData[0]);
  // });

  // test.each([
  //   ["FUEL", "Fuel Emission Factor", "fuel_emission_factors", fuelEmissionFactorSchema, fuelEmissionFactors],
  //   ["ROAD", "Road Intensity Emission Factor", "intensity_factors_road", roadIntensityFactorSchema, roadIntensityFactors],
  //   ["REPORT", "Emission Calculation Report", "emission_calculation_reports", calculationReportSchema, calculationReports],
  // ])("Delete an entity of type %s", async (type, entityName, collectionName, validationSchema, testData) => {
  //   jest.spyOn(FirestoreUtil, "deleteById").mockResolvedValue();

  //   expect(await CRUDEntityService.deleteEntity(testData[0].id, type as EntityType)).toStrictEqual(testData[0]);
  // });

});

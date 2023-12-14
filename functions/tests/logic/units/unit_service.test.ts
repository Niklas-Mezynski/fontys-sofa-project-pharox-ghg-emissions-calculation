import { UnitService } from "../../../src/logic/units/unit_service";

describe("Unit service", () => {

  const unitToSplit1 = "KG_CO2E_PER_KG";
  const unitToSplit2 = "KG_CO2EPER_KG";
  const unitToSplit3 = "KG";

  const unitsToJoin1 = ["KG", "KG"];
  const unitsToJoin2 = ["KG"];

  test("Split composed units - returns list of units", () => {
    expect(UnitService.splitComposedUnits(unitToSplit1)).toEqual(["KG", "KG"]);
    expect(UnitService.splitComposedUnits(unitToSplit2)).toEqual(["KG_CO2EPER_KG"]);
    expect(UnitService.splitComposedUnits(unitToSplit3)).toEqual(["KG"]);
  });

  test("Split composed units - returns list of units using different splitter", () => {
    expect(UnitService.splitComposedUnits(unitToSplit1, "CO2E_PER")).toEqual(["KG_", "_KG"]);
    expect(UnitService.splitComposedUnits(unitToSplit2, "_CO2EPER_")).toEqual(["KG", "KG"]);
    expect(UnitService.splitComposedUnits(unitToSplit3, "_CO2EPER_")).toEqual(["KG"]);
  });

  test("Create composed units - returns composed unit", () => {
    expect(UnitService.createComposedUnits(unitsToJoin1)).toEqual(unitToSplit1);
    expect(UnitService.createComposedUnits(unitsToJoin2)).toEqual("KG");
  });

  test("Create composed units - returns composed unit using different join string", () => {
    expect(UnitService.createComposedUnits(unitsToJoin1, "_CO2EPER_")).toEqual(unitToSplit2);
    expect(UnitService.createComposedUnits(unitsToJoin2, "_CO2EPER_")).toEqual("KG");
  });
});

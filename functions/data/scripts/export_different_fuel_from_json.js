const fs = require("fs");

const filePaths = [
  "../emission_intensity_factors/road/road_emission_intensity_factors.json",
  "../fuel_emission_factors/fuel_emission_factors.json"
];
const fuelFilePath = "../fuel/fuel.json";

(async () => {
  const fuelData = fs.readFileSync(fuelFilePath, "utf8");
  const parsedFuelData = (fuelData) ? JSON.parse(fuelData) : [];

  for (const filePath of filePaths) {
    const data = fs.readFileSync(filePath, "utf8");
    const parsedData = JSON.parse(data);

    for (const item of parsedData) {
      if(!item.fuel) continue;

      const index = parsedFuelData.findIndex((fuel) => fuel.code === item.fuel.code);

      if(index < 0) {
        parsedFuelData.push(item.fuel);
      }
    }
  }

  console.log("Fuels: ", parsedFuelData);
  fs.writeFileSync(fuelFilePath, JSON.stringify(parsedFuelData.sort((a, b) => a.code.localeCompare(b.code))));
})();

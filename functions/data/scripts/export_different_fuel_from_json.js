const fs = require("fs");

// const filePath = "../emission_intensity_factors/road/road_emission_intensity_factors.json";
const filePath = "../fuel_emission_factors/fuel_emission_factors.json";
const fuelFilePath = "../fuel/fuel.json";

(async () => {
  const data = fs.readFileSync(filePath, "utf8");
  const parsedData = JSON.parse(data);

  const fuelData = fs.readFileSync(fuelFilePath, "utf8");
  const parsedFuelData = (fuelData) ? JSON.parse(fuelData) : [];

  for (const item of parsedData) {
    if(!item.fuel) continue;

    const index = parsedFuelData.findIndex((fuel) => fuel.code === item.fuel.code);

    if(index < 0) {
      parsedFuelData.push(item.fuel);
    }
  }

  console.log("Fuels: ", parsedFuelData);
  fs.writeFileSync(fuelFilePath, JSON.stringify(parsedFuelData));
})();

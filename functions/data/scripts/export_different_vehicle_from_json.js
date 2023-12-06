const fs = require("fs");

const filePaths = [
  "../emission_intensity_factors/road/road_emission_intensity_factors.json",
  "../fuel_emission_factors/fuel_emission_factors.json"
];
const vehicleFilePath = "../vehicle/vehicle.json";

(async () => {
  const vehicleData = fs.readFileSync(vehicleFilePath, "utf8");
  const parsedVehicleData = (vehicleData) ? JSON.parse(vehicleData) : [];

  for (const filePath of filePaths) {
    const data = fs.readFileSync(filePath, "utf8");
    const parsedData = JSON.parse(data);


    for (const item of parsedData) {
      if(!item.vehicle) continue;

      const index = parsedVehicleData.findIndex((vehicle) => vehicle.code === item.vehicle.code);

      if(index < 0) {
        parsedVehicleData.push(item.vehicle);
      }
    }
  }

  console.log("Vehicles: ", parsedVehicleData);
  fs.writeFileSync(vehicleFilePath, JSON.stringify(parsedVehicleData));
})();

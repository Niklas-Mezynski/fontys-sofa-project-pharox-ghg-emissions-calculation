const fs = require("fs");

const fieldsToAdd = {
  source: "GLEC"
};
const filePath = "../emission_intensity_factors/road/road_emission_intensity_factors.json";
// const filePath = "../fuel_emission_factors/fuel_emission_factors.json";

(async () => {
  const data = fs.readFileSync(filePath, "utf8");
  const parsedData = JSON.parse(data);

  const newFileContent = [];

  for (const item of parsedData) {
    newFileContent.push(Object.assign(item, fieldsToAdd));
  }

  fs.writeFileSync(filePath, JSON.stringify(newFileContent));
})();

import axios from "axios";
import { defineSecret } from "firebase-functions/params";
import { onRequest } from "firebase-functions/v2/https";
import { db } from "..";
import {
  ClimatiqEmissionFactorResponse,
  climatiqEmissionFactorResponseSchema,
} from "./utils";

const climatiqApiKey = defineSecret("CLIMATIQ_API_KEY");

const dataVersion = "^0";
const source = "GLEC";
const resultsPage = "100";

export const fetchClimatiq = onRequest(async (request, response) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${climatiqApiKey.value()}`,
  };
  let queryPage = 1;

  const pagesNum = await fetchClimatiqPages(headers);

  const data: ClimatiqEmissionFactorResponse = [];

  while (queryPage <= pagesNum) {
    const uri = `https://beta4.api.climatiq.io/search?source=${source}&data_version=${dataVersion}&page=${queryPage}&results_per_page=${resultsPage}`;

    const climatiqResponse = await axios.get(uri, { headers });
    const json = climatiqResponse.data;

    const parsed = climatiqEmissionFactorResponseSchema.parse(json.results);

    data.push(...parsed);

    queryPage++;
  }

  await saveInDatabase(data);

  response.json({
    status: "success",
    message: `Saved ${data.length} emission factors to the database.`,
  });
});

async function fetchClimatiqPages(headers: any) {
  const initialUri = `https://beta4.api.climatiq.io/search?source=${source}&data_version=${dataVersion}&results_per_page=${resultsPage}`;
  const response = await axios.get(initialUri, { headers });
  const json = response.data;
  return json.last_page as number;
}

async function saveInDatabase(emissionFactors: ClimatiqEmissionFactorResponse) {
  await Promise.all(
    emissionFactors.map(async (factor) => {
      const docRef = db.collection("emission_factors").doc(factor.activity_id);

      await docRef.set(factor);
    })
  );
}

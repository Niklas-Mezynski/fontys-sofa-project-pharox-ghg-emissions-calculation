import axios from "axios";
import { db } from "../..";
import {
  ClimatiqEmissionFactorResponse,
  climatiqEmissionFactorResponseSchema,
} from "../../models/emission_factors";
import { logger } from "../../utils/logger";
import { parseZodError } from "../../utils/functions";

const dataVersion = "^0";
const source = "GLEC";
const resultsPage = "100";

/**
 * Fetches the emission factors from the Climatiq API and saves them in the database.
 */
async function fetchClimatiqApi() {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.CLIMATIQ_API_KEY}`,
  };
  let queryPage = 1;

  const pagesNum = await getTotalPageNum(headers);

  const data = [];

  while (queryPage <= pagesNum) {
    const uri = `https://beta4.api.climatiq.io/search?source=${source}&data_version=${dataVersion}&page=${queryPage}&results_per_page=${resultsPage}`;

    const climatiqResponse = await axios.get(uri, { headers });
    const json = climatiqResponse.data;

    data.push(...json.results);

    queryPage++;
  }
  const parsed = climatiqEmissionFactorResponseSchema.safeParse(data);

  if (!parsed.success) {
    throw parseZodError(
      parsed.error.issues,
      "Invalid response from Climatiq API."
    );
  }

  await saveInDatabase(parsed.data);

  logger.info("Saved emission factors from the Climatiq API to the database.", {
    count: data.length,
  });

  return data;
}

/**
 * Fetches the number of pages from the Climatiq API.
 * @param {object} headers to be used in the request.
 * @return {number} the number of pages.
 */
async function getTotalPageNum(headers: object) {
  const initialUri = `https://beta4.api.climatiq.io/search?source=${source}&data_version=${dataVersion}&results_per_page=${resultsPage}`;
  const response = await axios.get(initialUri, { headers });
  const json = response.data;
  return json.last_page as number;
}

/**
 * Saves the emission factors in the database.
 * @param {ClimatiqEmissionFactorResponse} emissionFactors to be saved.
 */
async function saveInDatabase(emissionFactors: ClimatiqEmissionFactorResponse) {
  await Promise.all(
    emissionFactors.map(async (factor) => {
      const docRef = db.collection("emission_factors").doc(factor.activity_id);

      await docRef.set(factor);
    })
  );
}

export const ClimatiqService = {
  fetchClimatiqApi,
};

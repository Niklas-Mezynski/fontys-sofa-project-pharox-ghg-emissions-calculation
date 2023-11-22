import axios from "axios";
import {
  ClimatiqEmissionFactorResponse,
  EmissionFactor,
  climatiqEmissionFactorResponseSchema,
} from "../../models/emission_factors/climatiq_emission_factors";
import { parseZodError } from "../../utils/functions";
import { logger } from "../../utils/logger";
import { EmissionFactorService } from "./emission_factor_service";

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
      const mappedEmissionFactor: EmissionFactor = {
        activityId: factor.activity_id,
        id: factor.id,
        name: factor.name,
        category: factor.category,
        sector: factor.sector,
        source: factor.source,
        sourceLink: factor.source_link,
        sourceDataset: factor.source_dataset,
        year: factor.year,
        yearReleased: factor.year_released,
        region: factor.region,
        regionName: factor.region_name,
        description: factor.description,
        unitType: factor.unit_type,
        unit: factor.unit,
        sourceLcaActivity: factor.source_lca_activity,
        dataQualityFlags: factor.data_quality_flags,
        accessType: factor.access_type,
        supportedCalculationMethods: factor.supported_calculation_methods,
        factor: factor.factor,
        factorCalculationMethod: factor.factor_calculation_method,
        factorCalculationOrigin: factor.factor_calculation_origin,
        constituentGases: {
          co2eTotal: factor.constituent_gases.co2e_total,
          co2eOther: factor.constituent_gases.co2e_other,
          co2: factor.constituent_gases.co2,
          ch4: factor.constituent_gases.ch4,
          n2o: factor.constituent_gases.n2o,
        },
      };

      await EmissionFactorService.saveEmissionFactor(mappedEmissionFactor);
    })
  );
}

/**
 * @deprecated
 */
export const ClimatiqService = {
  fetchClimatiqApi,
};

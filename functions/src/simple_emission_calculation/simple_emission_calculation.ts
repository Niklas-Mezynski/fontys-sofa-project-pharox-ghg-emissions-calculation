import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";


export const emission_calculation_simple = onRequest((request, response) => {

    // Fetch request body
    let httpRequestBody = request.body;

    // Validate that the necessary properties are present within the body
    if(httpRequestBody.usedFuel == null || httpRequestBody.emissionFactor == null){
        response.status(400).send("Not all necessary body properties are present.")
    }

    let emission = httpRequestBody.usedFuel * httpRequestBody.emissionFactor

    logger.info("Calculated Emission: " + emission + "\n Provided Fuel: " + httpRequestBody.usedFuel + "\n Provided Emissions Factor: " + httpRequestBody.emissionFactor);


    const responseObject = {
        status: 200,
        result: emission,
        calculationData: {
            usedFuel: httpRequestBody.usedFuel,
            emissionFactor: httpRequestBody.emissionFactor
        }
    }

    response.status(200).send(responseObject);
});



import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";
import { onRequest } from "firebase-functions/v2/https";

initializeApp();

export const db = getFirestore();

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {
    someObjectKey: {
      withAnotherKey: "text",
    },
  });

  response.send("Hello world!");
});

export * from "./endpoints";

import { HttpStatusCode } from "axios";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, Query } from "firebase-admin/firestore";
import { CustomError, onErrorHandledRequest } from "./utils/errors";

initializeApp();

export const db = getFirestore();

export const helloWorld = onErrorHandledRequest((request, response) => {
  if (Math.random() > 0.5) {
    throw new CustomError({
      status: HttpStatusCode.BadRequest,
      message: "Test error",
      someOtherData: 1,
      someOtherDat2: {
        a: [1, 2],
        b: ["a", "b"],
      },
    });
  } else {
    response.json({ message: "Hello World" });
  }
});

export * from "./endpoints";

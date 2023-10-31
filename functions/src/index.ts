import { authenticate } from "./utils/authentication";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp } from "firebase-admin/app";
import { onErrorHandledRequest } from "./utils/errors";

initializeApp();

export const db = getFirestore();

export const helloWorld = onErrorHandledRequest((request, response) => {
  authenticate(request.headers.authorization);
  response.json({ message: "Hello World" });

  // if (Math.random() > 0.5) {
  //   throw new CustomError({
  //     status: HttpStatusCode.BadRequest,
  //     message: "Test error",
  //     someOtherData: 1,
  //     someOtherDat2: {
  //       a: [1, 2],
  //       b: ["a", "b"],
  //     },
  //   });
  // } else {
  //   response.json({ message: "Hello World" });
  // }
});

export * from "./endpoints";

import {defineSecret} from "firebase-functions/params";

export const env = {
  climatiqApiKey: defineSecret("CLIMATIQ_API_KEY"),
};

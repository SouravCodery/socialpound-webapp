import { IG_SDK } from "./ig-sdk";

const baseURL = process.env.API_BASE_URL ?? "";

export const apiSDKInstance = new IG_SDK(baseURL);

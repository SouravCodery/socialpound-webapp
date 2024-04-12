import { IG_SDK } from "./IG-SDK";

const baseURL = process.env.API_BASE_URL ?? "";

export const apiSDKInstance = new IG_SDK(baseURL);

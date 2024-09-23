import { API_SDK } from "./api-sdk";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export const apiSDKInstance = new API_SDK(baseURL);

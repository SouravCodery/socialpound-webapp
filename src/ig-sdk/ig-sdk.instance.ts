import { IG_SDK } from "./ig-sdk";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export const apiSDKInstance = new IG_SDK(baseURL);

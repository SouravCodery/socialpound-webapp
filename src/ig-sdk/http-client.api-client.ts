import { logger } from "@/logger/index.logger";

import { FetchResponseInterface } from "./../models/interfaces/fetch-response.interface";
import { getServerToken } from "@/actions/user.actions";
import { bakeToast } from "@/components/toasts/toasts";

export class HttpClient {
  private readonly baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private buildQueryString = (
    params: Record<string, string | number | boolean>
  ) => {
    return Object.entries(params)
      .filter(([_, value]) => Boolean(value))
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
  };

  async getToken() {
    if (this.token) {
      return this.token;
    }

    this.token = (await getServerToken()) ?? "";
    return this.token;
  }

  async request<T>({
    endpoint,
    options,
    token,
    queryParams,
    body,
  }: {
    endpoint: string;
    options: RequestInit;
    token?: string | null;
    queryParams?: Record<string, string | number | boolean>;
    body?: Record<string, string | number | boolean | object | null>;
  }): Promise<FetchResponseInterface<T>> {
    try {
      const { method = "GET" } = options || {};

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const queryString = queryParams && this.buildQueryString(queryParams);

      const url = queryString
        ? `${this.baseURL}${endpoint}?${queryString}`
        : `${this.baseURL}${endpoint}`;

      const response = await fetch(url, {
        method,
        headers,
        body: method !== "GET" ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const responseLog = response?.json ? await response.json() : response;

        if (responseLog?.toastMessage && typeof window !== "undefined") {
          bakeToast({ type: "error", message: responseLog.toastMessage });
        }

        throw new Error(`Network response was not ok: ${responseLog?.message}`);
      }

      const responseJson: FetchResponseInterface<T> = await response.json();

      if (responseJson?.toastMessage && typeof window !== "undefined") {
        bakeToast({ message: responseJson.toastMessage });
      }

      return responseJson;
    } catch (error) {
      logger.error(
        "Error in request in HttpClient",
        // { endpoint, options, token, queryParams, body },
        { error }
      );

      throw error;
    }
  }
}

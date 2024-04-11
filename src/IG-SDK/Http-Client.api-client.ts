import { logger } from "@/logger/index.logger";

export class HttpClient {
  private readonly baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private buildQueryString = (
    params: Record<string, string | number | boolean>
  ) => {
    return Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
  };

  async request<T>({
    endpoint,
    options,
    token,
    queryParams,
    body,
  }: {
    endpoint: string;
    options: RequestInit;
    token?: string;
    queryParams?: Record<string, string | number | boolean>;
    body?: Record<string, string | number | boolean>;
  }): Promise<T> {
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

    const responseJson = await response.json();

    if (!response.ok) {
      logger.error("Error in request: Non 2XX", responseJson);
      throw new Error("Network response was not ok", responseJson);
    }

    return responseJson;
  }
}

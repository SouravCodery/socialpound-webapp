import { HttpClient } from "../http-client.api-client";
import { AWSPresignedUrlResponseInterface } from "../../models/interfaces/aws-presigned-url.interface";

import { API_ROUTES } from "../api-routes";

export class AWSPresignedUrlModule {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getAWSPresignedUrl({ size, type }: { size: number; type: string }) {
    const result =
      await this.httpClient.request<AWSPresignedUrlResponseInterface>({
        endpoint: API_ROUTES.awsPresignedUrl.getPresignedUrl,
        options: {
          method: "POST",
        },
        body: {
          size,
          type,
        },
        token: await this.httpClient.getToken(),
      });

    return result.data;
  }
}

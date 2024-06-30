import { HttpClient } from "../http-client.api-client";
import { LoginResponseInterface } from "../../models/interfaces/user.interface";

import { API_ROUTES } from "../api-routes";

export class UserModule {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async signIn({
    token,
    signedUserDataJWT,
  }: {
    token: string;
    signedUserDataJWT: string;
  }): Promise<Object> {
    return this.httpClient.request<LoginResponseInterface>({
      endpoint: API_ROUTES.user.signIn,
      options: {
        method: "POST",
      },
      body: { signedUserDataJWT },
      token,
    });
  }
}

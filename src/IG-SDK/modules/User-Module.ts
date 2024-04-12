import { HttpClient } from "../Http-Client.api-client";
import { LoginResponseInterface } from "../../models/interfaces/User.interface";

import { API_ROUTES } from "../API-Routes";

export class UserModule {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async login({
    token,
    signedUserDataJWT,
  }: {
    token: string;
    signedUserDataJWT: string;
  }): Promise<Object> {
    return this.httpClient.request<LoginResponseInterface>({
      endpoint: API_ROUTES.user.login,
      options: {
        method: "POST",
      },
      body: { signedUserDataJWT },
      token,
    });
  }
}

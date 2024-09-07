import { HttpClient } from "../http-client.api-client";
import { LoginResponseInterface } from "../../models/interfaces/user.interface";

import { API_ROUTES } from "../api-routes";
import { getDecodedToken } from "@/helpers/jwt-client-side.helpers";

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
  }) {
    return this.httpClient.request<LoginResponseInterface>({
      endpoint: API_ROUTES.user.signIn,
      options: {
        method: "POST",
      },
      body: { signedUserDataJWT },
      token,
    });
  }

  async getDecodedUserToken() {
    try {
      const token = await this.httpClient.getToken();
      const decodedToken = getDecodedToken({ token });

      return decodedToken;
    } catch (error) {
      return null;
    }
  }
}

import { HttpClient } from "../Http-Client.api-client";
import {
  CredentialsInterface,
  LoginResponseInterface,
} from "../../models/interfaces/User.interface";

export class UserModule {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async login(
    credentials: CredentialsInterface
  ): Promise<LoginResponseInterface> {
    return this.httpClient.request<LoginResponseInterface>({
      endpoint: "/login",
      options: {
        method: "POST",
      },
      body: { userName: credentials.username, password: credentials.password },
    });
  }
}

import { HttpClient } from "../http-client.api-client";
import {
  LoginResponseInterface,
  UserResponseInterface,
} from "../../models/interfaces/user.interface";

import { API_ROUTES } from "../api-routes";
import { getDecodedToken } from "@/helpers/jwt-client-side.helpers";
import { localStorageHelpers } from "@/helpers/local-storage.helpers";
import { cookieFlushAfterLogout } from "@/actions/user.actions";
import { logger } from "@/logger/index.logger";

export class UserModule {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async signIn({ googleToken }: { googleToken: string }) {
    return this.httpClient.request<LoginResponseInterface>({
      endpoint: API_ROUTES.user.signIn,
      options: {
        method: "POST",
      },
      body: { googleToken },
    });
  }

  async getDecodedUserToken() {
    try {
      const token = await this.httpClient.getToken();
      const decodedToken = getDecodedToken({ token });

      return decodedToken;
    } catch (error) {
      logger.error("Error in getDecodedUserToken", error);
      return null;
    }
  }

  async getUserByUsername({ username }: { username: string }) {
    return this.httpClient.request<UserResponseInterface>({
      endpoint: API_ROUTES.user.getUserByUsername({ username }),
      options: {
        method: "GET",
      },
      token: await this.httpClient.getToken(),
    });
  }

  async signOut() {
    try {
      localStorageHelpers.removeItem({ key: "post-likes" });
      localStorageHelpers.removeItem({ key: "pound" });

      this.httpClient.flushToken();
      await cookieFlushAfterLogout();
    } catch (error) {
      logger.error("Error while signing out", error);
    }
  }

  async deleteUser() {
    const response = await this.httpClient.request<UserResponseInterface>({
      endpoint: API_ROUTES.user.deleteUser,
      options: {
        method: "DELETE",
      },
      token: await this.httpClient.getToken(),
    });

    await this.signOut();

    return response;
  }
}

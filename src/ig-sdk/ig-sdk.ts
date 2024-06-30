import { HttpClient } from "./http-client.api-client";
import { UserModule } from "./modules/user-module";

export class IG_SDK {
  public user: UserModule;
  public baseUrl: string;

  constructor(baseURL: string) {
    const httpClient = new HttpClient(baseURL);

    this.baseUrl = baseURL;
    this.user = new UserModule(httpClient);
  }
}

import { logger } from "@/logger/index.logger";
import { HttpClient } from "./Http-Client.api-client";

import { UserModule } from "./modules/User-Module";

export class IG_SDK {
  public user: UserModule;
  public baseUrl: string;

  constructor(baseURL: string) {
    logger.info("Initializing IG_SDK", { baseURL });

    const httpClient = new HttpClient(baseURL);

    this.baseUrl = baseURL;
    this.user = new UserModule(httpClient);
  }
}

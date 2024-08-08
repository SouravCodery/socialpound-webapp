import { HttpClient } from "./http-client.api-client";

import { UserModule } from "./modules/user-module";
import { PostModule } from "./modules/post-module";

export class IG_SDK {
  public baseUrl: string;

  public user: UserModule;
  public post: PostModule;

  constructor(baseURL: string) {
    this.baseUrl = baseURL;
    const httpClient = new HttpClient(baseURL);

    this.user = new UserModule(httpClient);
    this.post = new PostModule(httpClient);
  }
}

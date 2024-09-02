import { HttpClient } from "./http-client.api-client";

import { UserModule } from "./modules/user-module";
import { PostModule } from "./modules/post-module";
import { CommentModule } from "./modules/comment-module";

export class IG_SDK {
  public baseUrl: string;

  public user: UserModule;
  public post: PostModule;
  public comment: CommentModule;

  constructor(baseURL: string) {
    this.baseUrl = baseURL;
    const httpClient = new HttpClient(baseURL);

    this.user = new UserModule(httpClient);
    this.post = new PostModule(httpClient);
    this.comment = new CommentModule(httpClient);
  }
}

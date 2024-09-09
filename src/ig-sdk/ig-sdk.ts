import { HttpClient } from "./http-client.api-client";

import { UserModule } from "./modules/user-module";
import { PostModule } from "./modules/post-module";
import { LikeModule } from "./modules/like-module";
import { CommentModule } from "./modules/comment-module";
import { AWSPresignedUrlModule } from "./modules/aws-presigned-url-module";

export class IG_SDK {
  public baseUrl: string;

  public user: UserModule;
  public post: PostModule;
  public like: LikeModule;
  public comment: CommentModule;
  public awsPresignedUrl: AWSPresignedUrlModule;

  constructor(baseURL: string) {
    this.baseUrl = baseURL;
    const httpClient = new HttpClient(baseURL);

    this.user = new UserModule(httpClient);
    this.post = new PostModule(httpClient);
    this.like = new LikeModule(httpClient);
    this.comment = new CommentModule(httpClient);
    this.awsPresignedUrl = new AWSPresignedUrlModule(httpClient);
  }
}

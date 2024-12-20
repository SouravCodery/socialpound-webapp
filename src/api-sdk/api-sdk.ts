import { HttpClient } from "./http-client.api-client";

import { UserModule } from "./modules/user.module";
import { PostModule } from "./modules/post.module";
import { LikeModule } from "./modules/like.module";
import { CommentModule } from "./modules/comment.module";
import { NotificationModule } from "./modules/notification.module";
import { AWSPresignedUrlModule } from "./modules/aws-presigned-url.module";
import { FriendshipModule } from "./modules/friendship.module";

export class API_SDK {
  public baseUrl: string;
  public httpClient: HttpClient;

  public user: UserModule;
  public post: PostModule;
  public like: LikeModule;
  public comment: CommentModule;
  public notification: NotificationModule;
  public awsPresignedUrl: AWSPresignedUrlModule;
  public friendship: FriendshipModule;

  constructor(baseURL: string) {
    this.baseUrl = baseURL;
    this.httpClient = new HttpClient(baseURL);

    this.user = new UserModule(this.httpClient);
    this.post = new PostModule(this.httpClient);
    this.like = new LikeModule(this.httpClient);
    this.comment = new CommentModule(this.httpClient);
    this.notification = new NotificationModule(this.httpClient);
    this.awsPresignedUrl = new AWSPresignedUrlModule(this.httpClient);
    this.friendship = new FriendshipModule(this.httpClient);
  }
}

import { HttpClient } from "../http-client.api-client";
import { API_ROUTES } from "../api-routes";

import {
  PostInterface,
  PostResponseInterface,
} from "../../models/interfaces/post.interface";

export class PostModule {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getUserFeed({ cursor }: { cursor: string }) {
    const getUserFeedResponse =
      await this.httpClient.request<PostResponseInterface>({
        endpoint: API_ROUTES.post.getUserFeed,
        options: {
          method: "GET",
        },
        body: {},
        queryParams: { cursor },
        token: await this.httpClient.getToken(),
      });

    return getUserFeedResponse.data;
  }

  async getPostsByUserId({
    userId,
    cursor,
  }: {
    userId: string;
    cursor: string;
  }) {
    const getUserFeedResponse =
      await this.httpClient.request<PostResponseInterface>({
        endpoint: API_ROUTES.post.getPostsByUserId({ userId }),
        options: {
          method: "GET",
        },
        body: {},
        queryParams: { cursor },
        token: await this.httpClient.getToken(),
      });

    return getUserFeedResponse.data;
  }

  async createPost({
    content,
    caption,
  }: {
    content: PostInterface["content"];
    caption: PostInterface["caption"];
  }) {
    return this.httpClient.request<Object>({
      endpoint: API_ROUTES.post.createPost,
      options: {
        method: "POST",
      },
      body: { content, caption },
      token: await this.httpClient.getToken(),
    });
  }

  async deletePostById({ postId }: { postId: string }) {
    return this.httpClient.request<Object>({
      endpoint: API_ROUTES.post.deletePostById({ postId }),
      options: {
        method: "DELETE",
      },
      token: await this.httpClient.getToken(),
    });
  }
}

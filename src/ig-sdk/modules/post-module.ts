import { HttpClient } from "../http-client.api-client";
import { API_ROUTES } from "../api-routes";

import { PostInterface } from "./../../models/interfaces/post.interface";

export class PostModule {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async fetchPosts({}: {}) {
    return this.httpClient.request<Object>({
      endpoint: API_ROUTES.post.fetchPosts,
      options: {
        method: "GET",
      },
      body: {},
      token: this.httpClient.serverToken,
    });
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
      token: this.httpClient.serverToken,
    });
  }
}

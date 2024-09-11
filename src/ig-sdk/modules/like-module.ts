import { HttpClient } from "../http-client.api-client";
import { API_ROUTES } from "../api-routes";

import {
  LikeInterface,
  LikeResponseInterface,
  PostsLikedByUserResponseInterface,
} from "@/models/interfaces/like.interface";

export class LikeModule {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getLikesByPostId({
    postId,
    cursor,
  }: {
    postId: string;
    cursor: string;
  }) {
    const fetchLikesResponse =
      await this.httpClient.request<LikeResponseInterface>({
        endpoint: API_ROUTES.like.getLikesByPostId({ postId }),
        options: {
          method: "GET",
        },
        body: {},
        queryParams: { cursor },
        token: await this.httpClient.getToken(),
      });

    return fetchLikesResponse.data;
  }

  async likePost({
    likeOn,
    post,
  }: {
    likeOn: LikeInterface["likeOn"];
    post: LikeInterface["post"];
  }) {
    return this.httpClient.request<Object>({
      endpoint: API_ROUTES.like.likePost,
      options: {
        method: "POST",
      },
      body: {
        likeOn,
        post,
      },
      token: await this.httpClient.getToken(),
    });
  }

  async getPostsLikedByUser() {
    const fetchLikesResponse =
      await this.httpClient.request<PostsLikedByUserResponseInterface>({
        endpoint: API_ROUTES.like.getPostsLikedByUser,
        options: {
          method: "GET",
        },
        body: {},
        token: await this.httpClient.getToken(),
      });

    return fetchLikesResponse.data;
  }
}

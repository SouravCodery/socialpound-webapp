import { HttpClient } from "../http-client.api-client";
import { API_ROUTES } from "../api-routes";

import {
  LikeInterface,
  LikeResponseInterface,
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

  async addLike({
    likeOn,
    post,
    comment,
  }: {
    likeOn: LikeInterface["likeOn"];
    post: LikeInterface["post"];
    comment: LikeInterface["comment"];
  }) {
    return this.httpClient.request<Object>({
      endpoint: API_ROUTES.like.likePost,
      options: {
        method: "POST",
      },
      body: {
        likeOn,
        post,
        parentLike: comment ?? null,
      },
      token: await this.httpClient.getToken(),
    });
  }
}

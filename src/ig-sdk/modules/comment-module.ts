import { HttpClient } from "../http-client.api-client";
import { API_ROUTES } from "../api-routes";

import { CommentResponseInterface } from "@/models/interfaces/comment.interface";

export class CommentModule {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getCommentsByPostId({
    postId,
    cursor,
  }: {
    postId: string;
    cursor: string;
  }) {
    const fetchCommentsResponse =
      await this.httpClient.request<CommentResponseInterface>({
        endpoint: API_ROUTES.comment.getCommentsByPostId({ postId }),
        options: {
          method: "GET",
        },
        body: {},
        queryParams: { cursor },
        token: this.httpClient.serverToken,
      });

    return fetchCommentsResponse.data;
  }
}

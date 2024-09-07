import { HttpClient } from "../http-client.api-client";
import { API_ROUTES } from "../api-routes";

import {
  CommentInterface,
  CommentResponseInterface,
} from "@/models/interfaces/comment.interface";

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
        token: await this.httpClient.getToken(),
      });

    return fetchCommentsResponse.data;
  }

  async addComment({
    commentOn,
    post,
    parentComment,
    text,
  }: {
    commentOn: CommentInterface["commentOn"];
    post: CommentInterface["post"];
    parentComment: CommentInterface["parentComment"];
    text: CommentInterface["text"];
  }) {
    return this.httpClient.request<Object>({
      endpoint: API_ROUTES.comment.addComment,
      options: {
        method: "POST",
      },
      body: {
        commentOn,
        post,
        parentComment: parentComment ?? null,
        text,
      },
      token: await this.httpClient.getToken(),
    });
  }
}

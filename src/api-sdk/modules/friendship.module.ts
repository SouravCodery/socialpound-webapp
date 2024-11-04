import { HttpClient } from "../http-client.api-client";
import { API_ROUTES } from "../api-routes";

import {
  FriendshipInterface,
  FriendshipResponseInterface,
} from "../../models/interfaces/friendship.interface";

export class FriendshipModule {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async sendFriendRequest({ receiverId }: { receiverId: string }) {
    return this.httpClient.request<Object>({
      endpoint: API_ROUTES.friendship.sendFriendRequest,
      options: {
        method: "POST",
      },
      body: { receiverId },
      token: await this.httpClient.getToken(),
    });
  }

  async respondToFriendRequest({
    requestId,
    status,
  }: {
    requestId: string;
    status: FriendshipInterface["status"];
  }) {
    return this.httpClient.request<Object>({
      endpoint: API_ROUTES.friendship.respondToFriendRequest,
      options: {
        method: "PATCH",
      },
      body: { requestId, status },
      token: await this.httpClient.getToken(),
    });
  }

  async getFriendsList({ cursor }: { cursor: string }) {
    const response = await this.httpClient.request<FriendshipResponseInterface>(
      {
        endpoint: API_ROUTES.friendship.getFriendsList,
        options: {
          method: "GET",
        },
        queryParams: { cursor },
        token: await this.httpClient.getToken(),
      }
    );

    return response.data;
  }

  async getPendingFriendRequests({ cursor }: { cursor: string }) {
    const response = await this.httpClient.request<FriendshipResponseInterface>(
      {
        endpoint: API_ROUTES.friendship.getPendingFriendRequests,
        options: {
          method: "GET",
        },
        queryParams: { cursor },
        token: await this.httpClient.getToken(),
      }
    );

    return response.data;
  }

  async checkFriendshipStatus({ otherUserId }: { otherUserId: string }) {
    const response = await this.httpClient.request<FriendshipInterface>({
      endpoint: API_ROUTES.friendship.friendshipStatus({
        otherUser: otherUserId,
      }),
      options: {
        method: "GET",
      },
      token: await this.httpClient.getToken(),
    });

    return response.data;
  }

  async cancelFriendRequest({ userId }: { userId: string }) {
    return this.httpClient.request<Object>({
      endpoint: API_ROUTES.friendship.cancelFriendRequest({ userId }),
      options: {
        method: "DELETE",
      },
      token: await this.httpClient.getToken(),
    });
  }

  async unfriend({ userId }: { userId: string }) {
    return this.httpClient.request<Object>({
      endpoint: API_ROUTES.friendship.unfriend({ userId }),
      options: {
        method: "DELETE",
      },
      token: await this.httpClient.getToken(),
    });
  }
}

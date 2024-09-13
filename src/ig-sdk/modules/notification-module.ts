import { HttpClient } from "../http-client.api-client";
import { API_ROUTES } from "../api-routes";

import { NotificationResponseInterface } from "@/models/interfaces/notification.interface";

export class NotificationModule {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getNotificationsByUser({ cursor }: { cursor: string }) {
    const fetchNotificationsResponse =
      await this.httpClient.request<NotificationResponseInterface>({
        endpoint: API_ROUTES.notification.getNotificationsByUser,
        options: {
          method: "GET",
        },
        body: {},
        queryParams: { cursor },
        token: await this.httpClient.getToken(),
      });

    return fetchNotificationsResponse.data;
  }
}

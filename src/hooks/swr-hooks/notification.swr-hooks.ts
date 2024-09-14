import useSWRInfinite from "swr/infinite";

import { API_ROUTES } from "@/ig-sdk/api-routes";
import { apiSDKInstance } from "@/ig-sdk/ig-sdk.instance";

import { NotificationResponseInterface } from "@/models/interfaces/notification.interface";

export const useSWRGetNotificationsByUser = () => {
  const getKey = (
    pageIndex: number,
    previousPageData: NotificationResponseInterface
  ) => {
    if (pageIndex === 0) {
      return API_ROUTES.notification.getNotificationsByUser;
    }

    if (!previousPageData || !previousPageData?.nextCursor) {
      return null;
    }

    return (
      API_ROUTES.notification.getNotificationsByUser +
      `?cursor=${previousPageData.nextCursor}`
    );
  };

  const { data, error, isLoading, size, setSize, mutate } = useSWRInfinite(
    getKey,
    (key) => {
      const cursor = key.split("?cursor=")[1] || "";

      return apiSDKInstance.notification.getNotificationsByUser({
        cursor,
      });
    },
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  const isNextPageAvailable = data?.[size - 1]?.nextCursor !== null;
  const isNextPageLoading = data?.[size - 1]?.notifications === undefined;

  return {
    data,
    error,
    isLoading,
    setSize,
    isNextPageAvailable,
    isNextPageLoading,
    updateNotifications: mutate,
  };
};

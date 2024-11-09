import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import useSWRMutation from "swr/mutation";

import { API_ROUTES } from "@/api-sdk/api-routes";
import { apiSDKInstance } from "@/api-sdk/api-sdk.instance";
import {
  FriendshipStatus,
  FriendshipResponseInterface,
} from "@/models/interfaces/friendship.interface";

export const useSWRGetFriendsList = () => {
  const getKey = (
    pageIndex: number,
    previousPageData: FriendshipResponseInterface
  ) => {
    if (pageIndex === 0) {
      return API_ROUTES.friendship.getFriendsList;
    }

    if (!previousPageData || !previousPageData?.nextCursor) {
      return null;
    }

    return (
      API_ROUTES.friendship.getFriendsList +
      `?cursor=${previousPageData.nextCursor}`
    );
  };

  const { data, error, isLoading, size, setSize, mutate } = useSWRInfinite(
    getKey,
    (key) => {
      const cursor = key.split("?cursor=")[1] || "";
      return apiSDKInstance.friendship.getFriendsList({ cursor });
    },
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  const isNextPageAvailable = !error && data?.[size - 1]?.nextCursor !== null;
  const isNextPageLoading = !error && data?.[size - 1]?.friends === undefined;

  return {
    data,
    error,
    isLoading,
    setSize,
    isNextPageAvailable,
    isNextPageLoading,
    updateFriendsList: mutate,
  };
};

export const useSWRGetPendingFriendRequests = () => {
  const getKey = (
    pageIndex: number,
    previousPageData: FriendshipResponseInterface
  ) => {
    if (pageIndex === 0) {
      return API_ROUTES.friendship.getPendingFriendRequests;
    }

    if (!previousPageData || !previousPageData?.nextCursor) {
      return null;
    }

    return (
      API_ROUTES.friendship.getPendingFriendRequests +
      `?cursor=${previousPageData.nextCursor}`
    );
  };

  const { data, error, isLoading, size, setSize, mutate } = useSWRInfinite(
    getKey,
    (key) => {
      const cursor = key.split("?cursor=")[1] || "";
      return apiSDKInstance.friendship.getPendingFriendRequests({ cursor });
    },
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  const isNextPageAvailable = !error && data?.[size - 1]?.nextCursor !== null;
  const isNextPageLoading = !error && data?.[size - 1]?.requests === undefined;

  return {
    data,
    error,
    isLoading,
    setSize,
    isNextPageAvailable,
    isNextPageLoading,
    updatePendingRequests: mutate,
  };
};

export const useSWRSendFriendRequest = () => {
  const { trigger, error, isMutating, data } = useSWRMutation(
    API_ROUTES.friendship.sendFriendRequest,
    (
      _,
      {
        arg,
      }: {
        arg: { receiverId: string };
      }
    ) => {
      return apiSDKInstance.friendship.sendFriendRequest({
        receiverId: arg.receiverId,
      });
    }
  );

  return { isMutating, trigger, error, data };
};

export const useSWRRespondToFriendRequest = () => {
  const { trigger, error, isMutating, data } = useSWRMutation(
    API_ROUTES.friendship.respondToFriendRequest,
    (
      _,
      {
        arg,
      }: {
        arg: { requesterId: string; status: FriendshipStatus };
      }
    ) => {
      return apiSDKInstance.friendship.respondToFriendRequest({
        requesterId: arg.requesterId,
        status: arg.status,
      });
    }
  );

  return { isMutating, trigger, error, data };
};

export const useSWRCheckFriendshipStatus = ({
  otherUserId,
}: {
  otherUserId: string;
}) => {
  const getKey = () =>
    API_ROUTES.friendship.friendshipStatus({ otherUser: otherUserId });

  const { data, error, isLoading, mutate } = useSWR(
    getKey(),
    () => apiSDKInstance.friendship.checkFriendshipStatus({ otherUserId }),
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  return { data, error, isLoading, updateFriendshipStatus: mutate };
};

export const useSWRCancelFriendRequest = ({ userId }: { userId: string }) => {
  const { trigger, error, isMutating, data } = useSWRMutation(
    API_ROUTES.friendship.cancelFriendRequest({ userId }),
    () => {
      return apiSDKInstance.friendship.cancelFriendRequest({ userId });
    }
  );

  return { isMutating, trigger, error, data };
};

export const useSWRUnfriend = ({ userId }: { userId: string }) => {
  const { trigger, error, isMutating, data } = useSWRMutation(
    API_ROUTES.friendship.unfriend({ userId }),
    () => {
      return apiSDKInstance.friendship.unfriend({ userId });
    }
  );

  return { isMutating, trigger, error, data };
};

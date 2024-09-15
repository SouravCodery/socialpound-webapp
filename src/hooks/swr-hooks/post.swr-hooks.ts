import useSWRInfinite from "swr/infinite";
import useSWRMutation from "swr/mutation";

import { API_ROUTES } from "@/ig-sdk/api-routes";
import { apiSDKInstance } from "@/ig-sdk/ig-sdk.instance";
import {
  PostInterface,
  PostResponseInterface,
} from "@/models/interfaces/post.interface";

export const useSWRGetUserFeed = () => {
  const getKey = (
    pageIndex: number,
    previousPageData: PostResponseInterface
  ) => {
    if (pageIndex === 0) {
      return API_ROUTES.post.getUserFeed;
    }

    if (!previousPageData || !previousPageData?.nextCursor) {
      return null;
    }

    return (
      API_ROUTES.post.getUserFeed + `?cursor=${previousPageData.nextCursor}`
    );
  };

  const { data, error, isLoading, size, setSize, mutate } = useSWRInfinite(
    getKey,
    (key) => {
      const cursor = key.split("?cursor=")[1] || "";

      return apiSDKInstance.post.getUserFeed({
        cursor,
      });
    },
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  const isNextPageAvailable = !error && data?.[size - 1]?.nextCursor !== null;
  const isNextPageLoading = !error && data?.[size - 1]?.posts === undefined;

  return {
    data,
    error,
    isLoading,
    setSize,
    isNextPageAvailable,
    isNextPageLoading,
    updatePosts: mutate,
  };
};

export const useSWRGetPostsByUserId = ({ userId }: { userId: string }) => {
  const getKey = (
    pageIndex: number,
    previousPageData: PostResponseInterface
  ) => {
    if (pageIndex === 0) {
      return API_ROUTES.post.getPostsByUserId({ userId });
    }

    if (!previousPageData || !previousPageData?.nextCursor) {
      return null;
    }

    return (
      API_ROUTES.post.getPostsByUserId({ userId }) +
      `?cursor=${previousPageData.nextCursor}`
    );
  };

  const { data, error, isLoading, size, setSize, mutate } = useSWRInfinite(
    getKey,
    (key) => {
      const cursor = key.split("?cursor=")[1] || "";

      return apiSDKInstance.post.getPostsByUserId({
        userId,
        cursor,
      });
    },
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  const isNextPageAvailable = !error && data?.[size - 1]?.nextCursor !== null;
  const isNextPageLoading = !error && data?.[size - 1]?.posts === undefined;

  return {
    data,
    error,
    isLoading,
    setSize,
    isNextPageAvailable,
    isNextPageLoading,
    updatePosts: mutate,
  };
};

export const useSWRAddPost = () => {
  const { trigger, error, isMutating, data } = useSWRMutation(
    API_ROUTES.post.createPost,
    (
      _,
      {
        arg,
      }: {
        arg: {
          content: PostInterface["content"];
          caption: PostInterface["caption"];
        };
      }
    ) => {
      const { content, caption } = arg;
      return apiSDKInstance.post.createPost({ content, caption });
    }
  );

  return { isMutating, trigger, error, data };
};

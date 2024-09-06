import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import useSWRMutation from "swr/mutation";

import { API_ROUTES } from "@/ig-sdk/api-routes";
import { apiSDKInstance } from "@/ig-sdk/ig-sdk.instance";
import { PostInterface } from "@/models/interfaces/post.interface";

export const useSWRGetUserFeed = () => {
  const getKey = (pageIndex: number, previousPageData: any) => {
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
    }
  );

  const isNextPageAvailable = data?.[size - 1]?.nextCursor !== null;
  const isNextPageLoading = data?.[size - 1]?.posts === undefined;

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

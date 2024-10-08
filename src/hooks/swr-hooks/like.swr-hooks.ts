import useSWRInfinite from "swr/infinite";

import { API_ROUTES } from "@/api-sdk/api-routes";
import { apiSDKInstance } from "@/api-sdk/api-sdk.instance";

import { LikeResponseInterface } from "@/models/interfaces/like.interface";

export const useSWRGetLikesByPostId = ({ postId }: { postId: string }) => {
  const getKey = (
    pageIndex: number,
    previousPageData: LikeResponseInterface
  ) => {
    if (pageIndex === 0) {
      return API_ROUTES.like.getLikesByPostId({ postId });
    }

    if (!previousPageData || !previousPageData?.nextCursor) {
      return null;
    }

    return (
      API_ROUTES.like.getLikesByPostId({
        postId,
      }) + `?cursor=${previousPageData.nextCursor}`
    );
  };

  const { data, error, isLoading, size, setSize, mutate } = useSWRInfinite(
    getKey,
    (key) => {
      const cursor = key.split("?cursor=")[1] || "";

      return apiSDKInstance.like.getLikesByPostId({
        postId,
        cursor,
      });
    },
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  const isNextPageAvailable = !error && data?.[size - 1]?.nextCursor !== null;
  const isNextPageLoading = !error && data?.[size - 1]?.likes === undefined;

  return {
    data,
    error,
    isLoading,
    setSize,
    isNextPageAvailable,
    isNextPageLoading,
    updateLikes: mutate,
  };
};

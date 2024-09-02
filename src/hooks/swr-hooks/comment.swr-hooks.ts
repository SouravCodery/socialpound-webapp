import useSWRInfinite from "swr/infinite";

import { API_ROUTES } from "@/ig-sdk/api-routes";
import { apiSDKInstance } from "@/ig-sdk/ig-sdk.instance";

export const useSWRGetCommentsByPostId = ({ postId }: { postId: string }) => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (pageIndex === 0) {
      return API_ROUTES.comment.getCommentsByPostId({ postId });
    }

    if (!previousPageData || !previousPageData?.nextCursor) {
      return null;
    }

    return (
      API_ROUTES.comment.getCommentsByPostId({
        postId,
      }) + `?cursor=${previousPageData.nextCursor}`
    );
  };

  const { data, error, isLoading, size, setSize } = useSWRInfinite(
    getKey,
    (key) => {
      const cursor = key.split("?cursor=")[1] || "";

      return apiSDKInstance.comment.getCommentsByPostId({
        postId,
        cursor,
      });
    }
  );

  const isNextPageAvailable = data?.[size - 1]?.nextCursor;

  return { data, error, isLoading, size, setSize, isNextPageAvailable };
};

import useSWR from "swr";

import { API_ROUTES } from "@/ig-sdk/api-routes";
import { apiSDKInstance } from "@/ig-sdk/ig-sdk.instance";

export const useSWRGetCommentsByPostId = ({ postId }: { postId: string }) => {
  const { data, error, isLoading } = useSWR(
    API_ROUTES.comment.getCommentsByPostId({ postId }),
    () => apiSDKInstance.comment.getCommentsByPostId({ postId })
  );

  return {
    comments: data?.comments,
    cursor: data?.cursor,

    error,
    isLoading,
  };
};

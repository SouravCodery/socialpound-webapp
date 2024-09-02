import useSWRInfinite from "swr/infinite";
import useSWRMutation from "swr/mutation";

import { API_ROUTES } from "@/ig-sdk/api-routes";
import { apiSDKInstance } from "@/ig-sdk/ig-sdk.instance";

import { CommentInterface } from "@/models/interfaces/comment.interface";

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

  const { data, error, isLoading, size, setSize, mutate } = useSWRInfinite(
    getKey,
    (key) => {
      const cursor = key.split("?cursor=")[1] || "";

      return apiSDKInstance.comment.getCommentsByPostId({
        postId,
        cursor,
      });
    }
  );

  const isNextPageAvailable = data?.[size - 1]?.nextCursor !== null;
  const isNextPageLoading = data?.[size - 1]?.comments === undefined;

  return {
    data,
    error,
    isLoading,
    setSize,
    isNextPageAvailable,
    isNextPageLoading,
    updateComments: mutate,
  };
};

export const useSWRAddComment = () => {
  const { trigger, error, isMutating, data } = useSWRMutation(
    API_ROUTES.post.createPost,
    (
      _,
      {
        arg,
      }: {
        arg: {
          commentOn: CommentInterface["commentOn"];
          post: CommentInterface["post"];
          parentComment: CommentInterface["parentComment"];
          text: CommentInterface["text"];
        };
      }
    ) => {
      const { commentOn, post, parentComment, text } = arg;
      return apiSDKInstance.comment.addComment({
        commentOn,
        post,
        parentComment,
        text,
      });
    }
  );

  return { isMutating, trigger, error, data };
};

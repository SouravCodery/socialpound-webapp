import useSWRInfinite from "swr/infinite";
import useSWRMutation from "swr/mutation";

import { API_ROUTES } from "@/ig-sdk/api-routes";
import { apiSDKInstance } from "@/ig-sdk/ig-sdk.instance";

import {
  LikeInterface,
  LikeResponseInterface,
} from "@/models/interfaces/like.interface";

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
    }
  );

  const isNextPageAvailable = data?.[size - 1]?.nextCursor !== null;
  const isNextPageLoading = data?.[size - 1]?.likes === undefined;

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

export const useSWRAddLike = () => {
  const { trigger, error, isMutating, data } = useSWRMutation(
    API_ROUTES.post.createPost,
    (
      _,
      {
        arg,
      }: {
        arg: {
          likeOn: LikeInterface["likeOn"];
          post: LikeInterface["post"];
          comment: LikeInterface["comment"];
        };
      }
    ) => {
      const { likeOn, post, comment } = arg;
      return apiSDKInstance.like.addLike({
        likeOn,
        post,
        comment,
      });
    }
  );

  return { isMutating, trigger, error, data };
};

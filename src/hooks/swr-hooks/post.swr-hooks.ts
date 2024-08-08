import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { API_ROUTES } from "@/ig-sdk/api-routes";
import { apiSDKInstance } from "@/ig-sdk/ig-sdk.instance";
import { PostInterface } from "@/models/interfaces/post.interface";

export const useSWRFetchPosts = () => {
  const { data, error, isLoading } = useSWR(API_ROUTES.post.createPost, () =>
    apiSDKInstance.post.fetchPosts()
  );

  return {
    posts: data,
    error,
    isLoading,
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

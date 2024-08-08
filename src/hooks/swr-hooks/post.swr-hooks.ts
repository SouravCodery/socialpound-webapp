import useSWR from "swr";

import { API_ROUTES } from "@/ig-sdk/api-routes";
import { apiSDKInstance } from "@/ig-sdk/ig-sdk.instance";

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

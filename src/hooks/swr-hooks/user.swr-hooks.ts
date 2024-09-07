import useSWR from "swr";

import { apiSDKInstance } from "@/ig-sdk/ig-sdk.instance";
import { API_ROUTES } from "@/ig-sdk/api-routes";

export const useSWRGetDecodedUserToken = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "user-decoded-from-token",
    () => {
      return apiSDKInstance.user.getDecodedUserToken();
    }
  );

  return {
    userDecodedToken: data,
    error,
    isLoading,
    mutate,
  };
};

export const useSWRGetUserByUsername = ({ username }: { username: string }) => {
  const { data, error, isLoading, mutate } = useSWR(
    API_ROUTES.user.getUserByUsername({ username }),
    () => {
      return apiSDKInstance.user.getUserByUsername({ username });
    }
  );

  return {
    user: data?.data?.user,
    error,
    isLoading,
    mutate,
  };
};

import useSWR from "swr";

import { apiSDKInstance } from "@/api-sdk/api-sdk.instance";
import { API_ROUTES } from "@/api-sdk/api-routes";

export const useSWRGetDecodedUserToken = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "user-decoded-from-token",
    () => {
      return apiSDKInstance.user.getDecodedUserToken();
    },
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
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
    },
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  return {
    user: data?.data?.user,
    error,
    isLoading,
    mutate,
  };
};

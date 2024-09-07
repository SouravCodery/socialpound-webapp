import useSWR from "swr";

import { apiSDKInstance } from "@/ig-sdk/ig-sdk.instance";

export const useSWRGetDecodedUserToken = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "user-decoded-from-token",
    () => {
      return apiSDKInstance.user.getDecodedUserToken();
    }
  );

  return {
    user: data,
    error,
    isLoading,
    mutate,
  };
};

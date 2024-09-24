import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { apiSDKInstance } from "@/api-sdk/api-sdk.instance";
import { API_ROUTES } from "@/api-sdk/api-routes";

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

export const useSWRLogin = () => {
  const { trigger, error, isMutating, data } = useSWRMutation(
    API_ROUTES.post.createPost,
    (
      _,
      {
        arg,
      }: {
        arg: {
          googleToken: string;
        };
      }
    ) => {
      const { googleToken } = arg;
      return apiSDKInstance.user.signIn({ googleToken });
    }
  );

  return { trigger, data, error, isMutating };
};

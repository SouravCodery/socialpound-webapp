import { useSWRGetDecodedUserToken } from "./swr-hooks/user.swr-hooks";

export const useGetUserFromDecodedToken = () => {
  const { userDecodedToken } = useSWRGetDecodedUserToken();

  return {
    username: userDecodedToken?.email ?? "",
    name: userDecodedToken?.name ?? "",
    profilePicture: userDecodedToken?.image ?? "",
  };
};

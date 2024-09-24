import { DELETED_USER } from "@/constants/deleted-user";
import { localStorageHelpers } from "@/helpers/local-storage.helpers";
import { UserTokenPayloadInterface } from "@/models/interfaces/user.interface";
import { useEffect, useState } from "react";

export const useGetAuthenticatedUserFromLocalStorage = () => {
  const [authenticatedUser, setAuthenticatedUser] =
    useState<UserTokenPayloadInterface>({ ...DELETED_USER, _id: "" });

  useEffect(() => {
    const user = localStorageHelpers.getItem<UserTokenPayloadInterface>({
      key: "user",
    });

    if (user) setAuthenticatedUser(user);
  }, []);

  return authenticatedUser;
};

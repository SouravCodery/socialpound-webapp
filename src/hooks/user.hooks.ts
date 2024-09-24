import { DELETED_USER } from "@/constants/deleted-user";
import { localStorageHelpers } from "@/helpers/local-storage.helpers";
import { UserTokenPayloadInterface } from "@/models/interfaces/user.interface";
import { useEffect, useState } from "react";

export const useGetAuthenticatedUserFromLocalStorage = () => {
  const [authenticatedUser, setAuthenticatedUser] =
    useState<UserTokenPayloadInterface>({ ...DELETED_USER, _id: "" });

  useEffect(() => {
    const userBase64 = localStorageHelpers.getItem<string>({
      key: "pound",
    });

    try {
      if (userBase64) {
        const user = JSON.parse(atob(atob(userBase64)));
        setAuthenticatedUser(user);
      }
    } catch (error) {
      console.error("Error in useGetAuthenticatedUserFromLocalStorage", error);
    }
  }, []);

  return authenticatedUser;
};

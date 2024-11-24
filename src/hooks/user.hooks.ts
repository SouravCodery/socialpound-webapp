import { useEffect, useState } from "react";
import { UserTokenPayloadInterface } from "@/models/interfaces/user.interface";
import { DELETED_USER } from "@/constants/deleted-user";
import { localStorageHelpers } from "@/helpers/local-storage.helpers";
import { logger } from "@/logger/index.logger";

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
      logger.error("Error in useGetAuthenticatedUserFromLocalStorage", error);
    }
  }, []);

  return authenticatedUser;
};

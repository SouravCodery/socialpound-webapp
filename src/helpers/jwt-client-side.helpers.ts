import { jwtDecode } from "jwt-decode";

import { logger } from "@/logger/index.logger";
import { UserDecodedTokenInterface } from "./../models/interfaces/user.interface";

export const getDecodedToken = ({ token }: { token: string }) => {
  try {
    return jwtDecode<UserDecodedTokenInterface>(token);
  } catch (error) {
    logger.error("Error in getDecodedToken", error);
    return null;
  }
};

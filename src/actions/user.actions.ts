"use server";

import { cookies } from "next/headers";
import { convertStringDaysToSeconds } from "@/helpers/misc.helpers";
import { logger } from "@/logger/index.logger";

export async function setServerToken({ token }: { token: string }) {
  try {
    const AUTH_JWT_EXPIRES_IN = process.env.AUTH_JWT_EXPIRES_IN || "30d";
    const maxAgeInSeconds = convertStringDaysToSeconds({
      key: AUTH_JWT_EXPIRES_IN,
    });

    cookies().set("server-token", token, {
      maxAge: maxAgeInSeconds,
      httpOnly: true,
      sameSite: "lax",
    });

    return true;
  } catch (error) {
    logger.error("Error in setServerToken", { error });

    return false;
  }
}

export async function getServerToken() {
  try {
    const serverToken = cookies().get("server-token")?.value;

    if (!serverToken) {
      throw new Error("Server token not found!");
    }

    return serverToken;
  } catch (error) {
    logger.error("Error in getServerToken", { error });

    return null;
  }
}

export async function cookieFlushAfterLogout() {
  try {
    const cookiesToFlush = ["server-token"];
    cookiesToFlush.forEach((name) => {
      cookies().delete(name);
    });

    return true;
  } catch (error) {
    logger.error("Error in cookieFlushAfterLogout", { error });
    return false;
  }
}

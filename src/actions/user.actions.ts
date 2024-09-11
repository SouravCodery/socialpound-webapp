"use server";

import { cookies } from "next/headers";
import { Account, Profile, User } from "next-auth";

import { logger } from "@/logger/index.logger";
import { apiSDKInstance } from "@/ig-sdk/ig-sdk.instance";

import * as jwtHelpers from "@/helpers/jwt-server-side.helpers";

export async function signInServerSide({
  user,
  account,
  profile,
}: {
  user: User;
  account: Account | null;
  profile?: Profile;
}) {
  try {
    const signedServerJWT = jwtHelpers.signServerJWT({
      user,
    });

    const signedUserDataJWT = jwtHelpers.signUserDataJWT({
      user,
      account,
      profile,
    });

    const AUTH_JWT_EXPIRES_IN = process.env.AUTH_JWT_EXPIRES_IN || "365d";
    const maxAgeInSeconds = jwtHelpers.convertStringDaysToSeconds({
      key: AUTH_JWT_EXPIRES_IN,
    });

    cookies().set("server-token", signedServerJWT, {
      maxAge: maxAgeInSeconds,
      httpOnly: true,
      sameSite: "lax",
    });

    await apiSDKInstance.user.signIn({
      token: signedServerJWT,
      signedUserDataJWT,
    });
  } catch (error) {
    logger.error("Error in signInServerSide", { error });
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

"use server";

import { cookies } from "next/headers";
import { Account, Profile } from "next-auth";

import { logger } from "@/logger/index.logger";
import { apiSDKInstance } from "@/ig-sdk/ig-sdk.instance";

import * as jwtHelpers from "@/helpers/jwt.helpers";

export async function signInServerSide({
  user,
  account,
  profile,
}: {
  user: Object;
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

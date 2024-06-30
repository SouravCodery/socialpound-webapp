"use server";

import { cookies } from "next/headers";
import { Account, Profile } from "next-auth";

import { signServerJWT, signUserDataJWT } from "@/helpers/jwt.helpers";
import { logger } from "@/logger/index.logger";
import { apiSDKInstance } from "@/ig-sdk/ig-sdk.instance";

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
    const signedServerJWT = signServerJWT({
      user,
    });

    const signedUserDataJWT = signUserDataJWT({ user, account, profile });

    cookies().set("server-token", signedServerJWT);

    await apiSDKInstance.user.signIn({
      token: signedServerJWT,
      signedUserDataJWT,
    });
  } catch (error) {
    logger.error("Error in signInServerSide", { error });
  }
}

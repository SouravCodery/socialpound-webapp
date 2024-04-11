"use server";

import { signJwt } from "@/helpers/jwt.helpers";
import { logger } from "@/logger/index.logger";
import { cookies } from "next/headers";

export async function signInServerSide({
  user,
  other,
}: {
  user: Object;
  other: Object;
}) {
  try {
    const token = signJwt({ user });

    cookies().set("token", JSON.stringify(token));
  } catch (error) {
    logger.error("Error in signInServerSide", { error });
  }
}

"use server";

import { signJwt } from "@/helpers/jwt.helpers";
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
    console.error(error);
  }
}

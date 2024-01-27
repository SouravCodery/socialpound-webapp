"use server";

import { signJwt } from "@/helpers/jwt.helper";
import { cookies } from "next/headers";

export async function signInServerSide({ user }: { user: Object }) {
  try {
    const token = signJwt({ user });

    cookies().set("token", JSON.stringify(token));
  } catch (error) {
    console.error(error);
  }
}

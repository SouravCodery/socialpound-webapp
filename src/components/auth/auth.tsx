"use client";

import { signIn } from "next-auth/react";
import classes from "./auth.module.css";

export const LoginButton = ({
  provider,
}: {
  provider: "google" | "github";
}) => {
  return (
    <button
      className={classes.button}
      onClick={() => signIn(provider, { callbackUrl: "/" })}
    >
      Log in with <span className={classes.provider}>{provider}</span>
    </button>
  );
};

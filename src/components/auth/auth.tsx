"use client";

import { signIn, signOut } from "next-auth/react";
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

export const LogoutButton = () => {
  return <button onClick={() => signOut()}>Sign Out</button>;
};

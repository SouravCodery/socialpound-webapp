"use client";

import { signIn, signOut } from "next-auth/react";
import classes from "./auth.module.css";
import { useState } from "react";
import { cookieFlushAfterLogout } from "@/actions/user.actions";
import { localStorageHelpers } from "@/helpers/local-storage.helpers";

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

export const SignOutButton = ({ className }: { className: string }) => {
  const [signingOut, setSigningOut] = useState(false);

  const signOutUser = async () => {
    setSigningOut(true);
    try {
      localStorageHelpers.removeItem({ key: "post-likes" });

      await cookieFlushAfterLogout();
      await signOut();
    } catch (error) {
      console.error("Error in signOutUser", { error });
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <button onClick={signOutUser} disabled={signingOut} className={className}>
      {signingOut === false ? "Sign Out" : "Signing Out..."}
    </button>
  );
};

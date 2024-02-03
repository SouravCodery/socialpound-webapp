"use client";

import { signIn, signOut } from "next-auth/react";
import classes from "./auth.module.css";

export const Auth = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  if (!isLoggedIn) {
    return (
      <>
        <p>Not signed in.</p>
        {/* <button onClick={() => signIn("github")}>Sign in</button> */}
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }

  return (
    <>
      {/* <p>Signed in as {session?.user?.name}</p> */}
      <button onClick={() => signOut()}>Sign out</button>
      <img src="https://cdn.pixabay.com/photo/2017/08/11/19/36/vw-2632486_1280.png" />
    </>
  );
};

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
  return (
    <button className={classes.button} onClick={() => signOut()}>
      Sign Out
    </button>
  );
};

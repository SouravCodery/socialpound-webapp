import { clsx } from "clsx";

import classes from "./sign-in.module.css";
import { LoginButton } from "@/components/auth/auth";
import { Logo } from "@/components/logo/logo";

export const SignIn = () => {
  return (
    <div className={clsx(classes.signInContainer)}>
      <div className={clsx(classes.signIn)}>
        <div className={clsx(classes.header)}>
          <div className={classes.logoContainer}>
            <Logo />
          </div>
          <div className={classes.souravcodery}>
            <div>Social media platform by</div>
            <div>Sourav Choudhary￨@SouravCodery</div>
          </div>
        </div>
        <div className={clsx(classes.body)}>
          <LoginButton provider="github" />
          <LoginButton provider="google" />
        </div>
      </div>
    </div>
  );
};

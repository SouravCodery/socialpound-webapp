import { InstagramLogoIcon } from "@/components/icons/icons";
import { clsx } from "clsx";

import classes from "./sign-in.module.css";
import { LoginButton } from "@/components/auth/auth";

export const SignIn = () => {
  return (
    <div className={clsx(classes.signInContainer)}>
      <div className={clsx(classes.signIn)}>
        <div className={clsx(classes.header)}>
          <div className={classes.logoContainer}>
            <InstagramLogoIcon />
          </div>
          <div className={classes.souravcodery}>
            <div>Clone by @SouravCodery</div>
            <div>Sourav Choudhary</div>
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

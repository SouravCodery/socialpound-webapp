import { InstagramLogoIcon } from "@/components/icons/icons";
import { clsx } from "clsx";

import classes from "./sign-in.module.css";
import { LoginButton } from "@/components/auth/auth";

export default function SignIn() {
  return (
    <div className={clsx(classes.signInContainer)}>
      <div className={clsx(classes.signIn)}>
        <div className={clsx(classes.header)}>
          <InstagramLogoIcon />
        </div>
        <div className={clsx(classes.body)}>
          <LoginButton />
        </div>
      </div>
    </div>
  );
}

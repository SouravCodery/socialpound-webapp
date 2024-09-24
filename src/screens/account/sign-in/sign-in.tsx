"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import { clsx } from "clsx";

import classes from "./sign-in.module.css";
import { Logo } from "@/components/logo/logo";
import { bakeToast } from "@/components/toasts/toasts";
import { useSWRLogin } from "@/hooks/swr-hooks/user.swr-hooks";
import { Loader } from "@/components/loaders/loader/loader";
import { localStorageHelpers } from "@/helpers/local-storage.helpers";
import { setServerToken } from "@/actions/user.actions";
import { Constants } from "@/constants/constants";

const clientId = Constants.GOOGLE_CLIENT_ID ?? "";

export const SignIn = () => {
  const router = useRouter();
  const { trigger } = useSWRLogin();
  const [isLoginInProgress, setIsLoginInProgress] = useState(false);

  const onGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      setIsLoginInProgress(true);
      const googleToken = credentialResponse.credential;

      if (!googleToken) {
        throw new Error("Google googleToken falsy");
      }

      const { data } = await trigger({
        googleToken: googleToken as string,
      });

      const { user, token } = data;
      localStorageHelpers.setItem({
        key: "user",
        value: user,
      });

      await setServerToken({ token: token });

      router.replace("/");
    } catch (error) {
      console.error("Error in onGoogleLoginSuccess", { error });

      bakeToast({
        type: "error",
        message: "Google Login failed, Please try again.",
      });
    } finally {
      setIsLoginInProgress(false);
    }
  };

  return (
    <>
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
            <GoogleOAuthProvider clientId={clientId}>
              <GoogleLogin
                onSuccess={onGoogleLoginSuccess}
                onError={() => {
                  bakeToast({
                    type: "error",
                    message: "Google Login failed, Please try again.",
                  });
                }}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
      <Loader mode="fixed" show={isLoginInProgress} text="Signing in" />
    </>
  );
};

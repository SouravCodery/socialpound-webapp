"use client";

import clsx from "clsx";
import classes from "./profile.module.css";

import { LogoutButton } from "@/components/auth/auth";
import { ProfileHeader } from "./profile-header/profile-header";
import { ProfileMain } from "./profile-main/profile-main";

import {
  useSWRGetUserByUsername,
  useSWRGetDecodedUserToken,
} from "@/hooks/swr-hooks/user.swr-hooks";

export const Profile = () => {
  const { user, isLoading } = useSWRGetUserByUsername({
    username: "souravscchoudhary",
  });
  const { userDecodedToken } = useSWRGetDecodedUserToken();

  const isOwnProfile = user?.email === userDecodedToken?.email;

  return (
    <div className={clsx(classes.profile)}>
      <ProfileHeader
        user={user}
        isLoading={isLoading}
        isOwnProfile={isOwnProfile}
      />
      <ProfileMain />

      <br />
      <br />
      <LogoutButton />
    </div>
  );
};

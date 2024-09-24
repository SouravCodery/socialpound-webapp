"use client";

import clsx from "clsx";
import classes from "./profile.module.css";

import { ProfileHeader } from "./profile-header/profile-header";
import { ProfilePosts } from "./profile-posts/profile-posts";

import { useSWRGetUserByUsername } from "@/hooks/swr-hooks/user.swr-hooks";
import { ProfileLoader } from "@/components/loaders/profile/profile-loader";
import { useGetAuthenticatedUserFromLocalStorage } from "@/hooks/user.hooks";

export const Profile = ({ username }: { username: string }) => {
  const { user, isLoading } = useSWRGetUserByUsername({
    username,
  });
  const userFromLocalStorage = useGetAuthenticatedUserFromLocalStorage();

  const isOwnProfile = user?._id === userFromLocalStorage?._id;
  const userId = user?._id ?? "";

  if (isLoading || !userId) {
    return <ProfileLoader />;
  }

  return (
    <div className={clsx(classes.profile)}>
      <ProfileHeader
        user={user}
        isLoading={isLoading}
        isOwnProfile={isOwnProfile}
      />
      <ProfilePosts userId={userId} />
    </div>
  );
};

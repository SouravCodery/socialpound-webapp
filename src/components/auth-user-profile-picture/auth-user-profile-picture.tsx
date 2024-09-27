"use client";

import { useGetAuthenticatedUserFromLocalStorage } from "@/hooks/user.hooks";
import { ProfilePicture } from "../profile-picture/profile-picture";

export const AuthUserProfilePicture = ({
  scale,
}: {
  scale?: "medium" | "large";
}) => {
  const { profilePicture } = useGetAuthenticatedUserFromLocalStorage();

  return <ProfilePicture dpURL={profilePicture} scale={scale} />;
};

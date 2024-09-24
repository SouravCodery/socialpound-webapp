"use client";

import { useGetAuthenticatedUserFromLocalStorage } from "@/hooks/user.hooks";
import { ProfilePicture } from "../profile-picture/profile-picture";

export const AuthUserProfilePicture = ({
  scale,
}: {
  scale?: "medium" | "large";
}) => {
  const authenticatedUser = useGetAuthenticatedUserFromLocalStorage();

  return (
    <ProfilePicture dpURL={authenticatedUser.profilePicture} scale={scale} />
  );
};

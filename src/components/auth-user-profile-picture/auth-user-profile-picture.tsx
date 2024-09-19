"use client";

import { ProfilePicture } from "../profile-picture/profile-picture";
import { useSWRGetDecodedUserToken } from "@/hooks/swr-hooks/user.swr-hooks";

export const AuthUserProfilePicture = ({
  scale,
}: {
  scale?: "medium" | "large";
}) => {
  const { userDecodedToken } = useSWRGetDecodedUserToken();

  return <ProfilePicture dpURL={userDecodedToken?.image ?? ""} scale={scale} />;
};

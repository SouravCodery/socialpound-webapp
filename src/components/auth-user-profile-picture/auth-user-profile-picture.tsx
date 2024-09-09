"use client";

import { ProfilePicture } from "../profile-picture/profile-picture";
import { CSROnlyHOC } from "../csr-only-hoc/csr-only-hoc";
import { useSWRGetDecodedUserToken } from "@/hooks/swr-hooks/user.swr-hooks";

const _AuthUserProfilePicture = ({ scale }: { scale?: "medium" | "large" }) => {
  const { userDecodedToken } = useSWRGetDecodedUserToken();

  return <ProfilePicture dpURL={userDecodedToken?.image ?? ""} scale={scale} />;
};

export const AuthUserProfilePicture = ({
  scale,
}: {
  scale?: "medium" | "large";
}) => <CSROnlyHOC component={<_AuthUserProfilePicture scale={scale} />} />;

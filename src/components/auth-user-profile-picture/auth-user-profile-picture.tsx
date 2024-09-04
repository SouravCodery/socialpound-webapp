"use client";

import { ProfilePicture } from "../profile-picture/profile-picture";
import { getClientSideCookie } from "@/helpers/client-side-cookie.helpers";
import { CSROnlyHOC } from "../csr-only-hoc/csr-only-hoc";

const _AuthUserProfilePicture = ({
  upScale = false,
}: {
  upScale?: Boolean;
}) => {
  const profilePicture = getClientSideCookie({ name: "profile-picture" });

  return <ProfilePicture dpURL={profilePicture ?? ""} upScale={upScale} />;
};

export const AuthUserProfilePicture = ({
  upScale = false,
}: {
  upScale?: Boolean;
}) => <CSROnlyHOC component={<_AuthUserProfilePicture upScale={upScale} />} />;

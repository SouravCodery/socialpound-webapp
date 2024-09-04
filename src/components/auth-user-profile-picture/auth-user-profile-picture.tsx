"use client";

import { DP } from "../dp/dp";
import { getClientSideCookie } from "@/helpers/client-side-cookie.helpers";
import { CSROnlyHOC } from "../csr-only-hoc/csr-only-hoc";

const _AuthUserProfilePicture = ({
  upScale = false,
}: {
  upScale?: Boolean;
}) => {
  const profilePicture = getClientSideCookie({ name: "profile-picture" });

  return <DP dpURL={profilePicture ?? ""} upScale={upScale} />;
};

export const AuthUserProfilePicture = ({
  upScale = false,
}: {
  upScale?: Boolean;
}) => <CSROnlyHOC component={<_AuthUserProfilePicture upScale={upScale} />} />;

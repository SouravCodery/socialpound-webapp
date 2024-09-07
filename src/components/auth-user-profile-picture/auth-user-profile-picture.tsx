"use client";

import { ProfilePicture } from "../profile-picture/profile-picture";
import { CSROnlyHOC } from "../csr-only-hoc/csr-only-hoc";
import { useSWRGetDecodedUserToken } from "@/hooks/swr-hooks/user.swr-hooks";

const _AuthUserProfilePicture = ({
  upScale = false,
}: {
  upScale?: Boolean;
}) => {
  const { user } = useSWRGetDecodedUserToken();

  return <ProfilePicture dpURL={user?.image ?? ""} upScale={upScale} />;
};

export const AuthUserProfilePicture = ({
  upScale = false,
}: {
  upScale?: Boolean;
}) => <CSROnlyHOC component={<_AuthUserProfilePicture upScale={upScale} />} />;

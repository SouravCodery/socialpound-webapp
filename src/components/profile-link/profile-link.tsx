"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

import classes from "./profile-link.module.css";

import { IconWrapper } from "@/components/atoms/icon-wrapper/icon-wrapper";
import { AuthUserProfilePicture } from "@/components/auth-user-profile-picture/auth-user-profile-picture";
import { useSWRGetDecodedUserToken } from "@/hooks/swr-hooks/user.swr-hooks";

export const ProfileLink = () => {
  const pathName = usePathname();

  const { userDecodedToken } = useSWRGetDecodedUserToken();
  const username = userDecodedToken?.email?.split("@")[0] ?? "";
  const name = userDecodedToken?.name ?? "";

  const profileRoute = getProfileRoute({ username, name });

  return (
    <Link
      href={profileRoute.path}
      className={clsx(
        classes.link,
        pathName === profileRoute.path && classes.active
      )}
    >
      <IconWrapper count={profileRoute.count}>
        <profileRoute.icon /> &nbsp;
      </IconWrapper>
    </Link>
  );
};

const getProfileRoute = ({
  name,
  username,
}: {
  name: string;
  username: string;
}) => ({
  path: `/profile/${username}`,
  name: `${name || username}'s Profile`,
  icon: AuthUserProfilePicture,
  count: undefined,
});

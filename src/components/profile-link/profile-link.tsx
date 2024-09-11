"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

import classes from "./profile-link.module.css";

import { IconWrapper } from "@/components/atoms/icon-wrapper/icon-wrapper";
import { AuthUserProfilePicture } from "@/components/auth-user-profile-picture/auth-user-profile-picture";
import { useGetUserFromDecodedToken } from "@/hooks/user.hooks";

export const ProfileLink = () => {
  const pathName = usePathname();
  const { username, name } = useGetUserFromDecodedToken();

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

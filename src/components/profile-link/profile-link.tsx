"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

import classes from "./profile-link.module.css";

import { useGetAuthenticatedUserFromLocalStorage } from "@/hooks/user.hooks";
import { IconWrapper } from "@/components/atoms/icon-wrapper/icon-wrapper";
import { AuthUserProfilePicture } from "@/components/auth-user-profile-picture/auth-user-profile-picture";

export const ProfileLink = ({
  extended,
  linkClassName,
  routeClassName,
  activeClassName,
}: {
  extended?: boolean;
  linkClassName?: string;
  routeClassName?: string;
  activeClassName?: string;
}) => {
  const pathName = usePathname();
  const { email, fullName } = useGetAuthenticatedUserFromLocalStorage();
  const profileRoute = getProfileRoute({ username: email, name: fullName });

  if (extended) {
    return (
      <Link
        key={profileRoute.path}
        href={profileRoute.path}
        className={clsx(
          linkClassName,
          pathName === profileRoute.path && activeClassName
        )}
        prefetch={false}
      >
        <profileRoute.icon />
        <div className={routeClassName}>Profile</div>
      </Link>
    );
  }

  return (
    <Link
      href={profileRoute.path}
      className={clsx(
        classes.link,
        pathName === profileRoute.path && classes.active
      )}
      prefetch={false}
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

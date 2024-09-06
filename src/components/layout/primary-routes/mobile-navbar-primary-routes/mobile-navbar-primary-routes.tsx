"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";
import classes from "./mobile-navbar-primary-routes.module.css";

import {
  HomeIcon,
  // ExploreIcon,
  HomePostIcon,
  // ReelsIcon,
} from "@/components/icons/icons";
import { IconWrapper } from "@/components/atoms/icon-wrapper/icon-wrapper";
import { AuthUserProfilePicture } from "@/components/auth-user-profile-picture/auth-user-profile-picture";

const routes = [
  { path: "/", name: "Home", icon: HomeIcon, count: 4 },
  // { path: "/explore", name: "Search", icon: ExploreIcon },
  { path: "/new-post", name: "New Post", icon: HomePostIcon },
  // { path: "/reels", name: "Reels", icon: ReelsIcon, count: 2 },
  {
    path: "/profile",
    name: "Profile",
    icon: AuthUserProfilePicture,
  },
];

export const MobileNavbar = () => {
  const pathName = usePathname();

  return (
    <footer className={clsx(classes.footer)}>
      <nav className={clsx(classes.navbar)}>
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={clsx(
              classes.link,
              pathName === route.path && classes.active
            )}
          >
            <IconWrapper count={route.count}>
              <route.icon />
            </IconWrapper>
          </Link>
        ))}
      </nav>
    </footer>
  );
};

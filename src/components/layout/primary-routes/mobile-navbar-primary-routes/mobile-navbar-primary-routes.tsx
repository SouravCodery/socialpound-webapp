import Link from "next/link";
import { Suspense } from "react";

import clsx from "clsx";
import classes from "./mobile-navbar-primary-routes.module.css";

import {
  HomeIcon,
  ExploreIcon,
  HomePostIcon,
  ReelsIcon,
} from "@/components/icons/icons";
import { IconWrapper } from "@/components/atoms/icon-wrapper/icon-wrapper";
import { AuthUserProfilePicture } from "@/components/auth-user-profile-picture/auth-user-profile-picture";

const routes = [
  { path: "/", name: "Home", icon: HomeIcon },
  { path: "/explore", name: "Search", icon: ExploreIcon },
  { path: "/new-post", name: "New Post", icon: HomePostIcon },
  { path: "/reels", name: "Reels", icon: ReelsIcon, count: 2 },
  { path: "/profile", name: "Profile", icon: AuthUserProfilePicture },
];

export const MobileNavbar = async () => {
  return (
    <footer className={clsx(classes.footer)}>
      <nav className={clsx(classes.navbar)}>
        {routes.map((route) => (
          <Suspense key={route.path} fallback={null}>
            <Link href={route.path} className={classes.link}>
              <IconWrapper count={route.count}>
                <route.icon />
              </IconWrapper>
            </Link>
          </Suspense>
        ))}
      </nav>
    </footer>
  );
};

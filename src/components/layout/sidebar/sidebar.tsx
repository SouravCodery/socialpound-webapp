"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import classes from "./sidebar.module.css";

import {
  HamburgerIcon,
  HomeIcon,
  HomePostIcon,
  LikeIcon,
} from "@/components/icons/icons";
import { Logo } from "@/components/logo/logo";
import { ProfileLink } from "@/components/profile-link/profile-link";

const routesTop = [
  { path: "/", name: "Home", icon: HomeIcon, dot: true },
  { path: "/new-post", name: "New Post", icon: HomePostIcon },
  { path: "/notifications", name: "Notifications", icon: LikeIcon, dot: true },
];

const routesBottom = [
  { path: "/more", name: "More", icon: HamburgerIcon, dot: false },
];

export const Sidebar = () => {
  const pathName = usePathname();

  return (
    <aside className={classes.sidebar}>
      <div className={classes.logoContainer}>
        <Link href="/" className={classes.link}>
          <Logo />
        </Link>
      </div>
      <nav className={clsx(classes.navbar)}>
        {routesTop.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={clsx(
              classes.link,
              classes.route,
              pathName === route.path && classes.active
            )}
          >
            <route.icon />
            <div className={classes.routeName}>{route.name}</div>
          </Link>
        ))}
        <ProfileLink
          extended={true}
          linkClassName={clsx(classes.link, classes.route)}
          routeClassName={classes.routeName}
          activeClassName={classes.active}
        />
      </nav>
      <nav className={clsx(classes.navbar)}>
        {routesBottom.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={clsx(
              classes.link,
              classes.route,
              pathName === route.path && classes.active
            )}
          >
            <route.icon />
            <div className={classes.routeName}>{route.name}</div>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

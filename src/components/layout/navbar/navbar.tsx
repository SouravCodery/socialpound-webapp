"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import classes from "./navbar.module.css";

import { HomeIcon, HomePostIcon } from "@/components/icons/icons";
import { IconWrapper } from "@/components/atoms/icon-wrapper/icon-wrapper";
import { ProfileLink } from "@/components/profile-link/profile-link";

const routes = [
  { path: "/", name: "Home", icon: HomeIcon, dot: true },
  { path: "/new-post", name: "New Post", icon: HomePostIcon },
];

export const Navbar = () => {
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
            <IconWrapper dot={route.dot}>
              <route.icon />
            </IconWrapper>
          </Link>
        ))}
        <ProfileLink />
      </nav>
    </footer>
  );
};

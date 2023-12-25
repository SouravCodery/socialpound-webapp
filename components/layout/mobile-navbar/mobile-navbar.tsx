import Link from "next/link";

import clsx from "clsx";
import classes from "./mobile-navbar.module.css";

import {
  HomeIcon,
  ExploreIcon,
  HomePostIcon,
  ReelsIcon,
  InstagramIcon,
} from "../../icons/icons";
import { IconWrapper } from "../../atoms/icon-wrapper/icon-wrapper";

const routes = [
  { path: "/", name: "Home", icon: HomeIcon },
  { path: "/explore", name: "Search", icon: ExploreIcon },
  { path: "/post", name: "Post", icon: HomePostIcon },
  { path: "/reels", name: "Reels", icon: ReelsIcon, count: 2 },
  { path: "/profile", name: "Profile", icon: InstagramIcon },
];

export const MobileNavbar = async () => {
  return (
    <footer className={clsx(classes.footer)}>
      <nav className={clsx(classes.navbar)}>
        {routes.map((route) => (
          <Link key={route.path} href={route.path} className={classes.link}>
            <IconWrapper count={route.count}>
              <route.icon />
            </IconWrapper>
          </Link>
        ))}
      </nav>
    </footer>
  );
};

import Link from "next/link";

import clsx from "clsx";
import classes from "./navbar.module.css";

import {
  HomeIcon,
  ExploreIcon,
  HomePostIcon,
  ReelsIcon,
  InstagramIcon,
} from "../../icons";

const routes = [
  { path: "/", name: "Home", icon: HomeIcon },
  { path: "/explore", name: "Search", icon: ExploreIcon },
  { path: "/post", name: "Post", icon: HomePostIcon },
  { path: "/reels", name: "Reels", icon: ReelsIcon },
  { path: "/profile", name: "Profile", icon: InstagramIcon },
];

export const Navbar = async () => {
  return (
    <nav className={clsx(classes.navbar, "shadow")}>
      {routes.map((route) => (
        <Link key={route.path} href={route.path}>
          <route.icon />
        </Link>
      ))}
    </nav>
  );
};

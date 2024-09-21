import Link from "next/link";

import clsx from "clsx";
import classes from "./header-primary.module.css";

import { HamburgerIcon, LikeIcon } from "@/components/icons/icons";
import { IconWrapper } from "@/components/atoms/icon-wrapper/icon-wrapper";
import { Logo } from "@/components/logo/logo";

const routes = [
  { path: "/notifications", name: "Reels", icon: LikeIcon, dot: true },
  {
    path: "/settings",
    name: "Settings and More",
    title: "Settings and More",
    icon: HamburgerIcon,
    dot: false,
  },
];

export const HeaderPrimary = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logoContainer}>
        <Link href="/" className={classes.link}>
          <Logo />
        </Link>
      </div>
      <nav className={clsx(classes.navbar)}>
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={clsx(classes.link, classes.route)}
            title={route?.title ?? route.name}
          >
            <IconWrapper dot={route.dot}>
              <route.icon />
            </IconWrapper>
          </Link>
        ))}
      </nav>
    </header>
  );
};

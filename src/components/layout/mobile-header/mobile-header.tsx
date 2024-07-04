import Link from "next/link";

import clsx from "clsx";
import classes from "./mobile-header.module.css";

import { LikeIcon, MessengerIcon } from "@/components/icons/icons";
import { IconWrapper } from "@/components/atoms/icon-wrapper/icon-wrapper";
import { Logo } from "@/components/logo/logo";

const routes = [
  { path: "/notifications", name: "Reels", icon: LikeIcon, count: 4 },
  { path: "/inbox", name: "Profile", icon: MessengerIcon, count: 7 },
];

export const MobileHeader = async () => {
  return (
    <header className={classes.header}>
      <div className={classes.logoContainer}>
        <Link href="/" className={classes.link}>
          <Logo />
        </Link>
      </div>
      <nav className={clsx(classes.navbar)}>
        {routes.map((route) => (
          <Link key={route.path} href={route.path} className={classes.link}>
            <IconWrapper count={route.count}>
              <route.icon />
            </IconWrapper>
          </Link>
        ))}
      </nav>
    </header>
  );
};

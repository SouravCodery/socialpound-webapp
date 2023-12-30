import Link from "next/link";

import clsx from "clsx";
import classes from "./mobile-header.module.css";

import { InstagramLogoIcon, LikeIcon, MessengerIcon } from "../../icons/icons";
import { IconWrapper } from "../../atoms/icon-wrapper/icon-wrapper";

const routes = [
  { path: "/notifications", name: "Reels", icon: LikeIcon, count: 4 },
  { path: "/inbox", name: "Profile", icon: MessengerIcon, count: 7 },
];

export const MobileHeader = async () => {
  return (
    <header className={classes.header}>
      <div className={classes.instagramLogoIconContainer}>
        <Link href="/" className={classes.link}>
          <InstagramLogoIcon />
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

"use client";

import clsx from "clsx";
import classes from "./more.module.css";

import { Logout } from "./log-out/log-out";
import { SettingsIcon } from "@/components/icons/icons";
import { DeleteAccount } from "./delete-account/delete-account";
import { ThemeToggleButton } from "./theme-toggle-button/theme-toggle-button";
import Link from "next/link";

export const More = () => {
  return (
    <div className={classes.settingsSuperContainer}>
      <div className={clsx(classes.settingsContainer, "shadow")}>
        <div className={classes.settingsIconsContainer}>
          <SettingsIcon />
        </div>
        <Link
          className={clsx(classes.link, classes.settingButton)}
          href="/about-us"
        >
          About Us
        </Link>
        <ThemeToggleButton buttonClassName={clsx(classes.settingButton)} />
        <Logout buttonClassName={clsx(classes.settingButton)} />
        <DeleteAccount
          buttonClassName={clsx(classes.settingButton, classes.dangerousAction)}
        />
      </div>
    </div>
  );
};

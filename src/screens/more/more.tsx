"use client";

import clsx from "clsx";
import classes from "./more.module.css";

import { Logout } from "./log-out/log-out";
import { SettingsIcon } from "@/components/icons/icons";
import { DeleteAccount } from "./delete-account/delete-account";
import { ThemeToggleButton } from "./theme-toggle-button/theme-toggle-button";

export const More = () => {
  return (
    <div className={classes.settingsSuperContainer}>
      <div className={clsx(classes.settingsContainer, "shadow")}>
        <div className={classes.settingsIconsContainer}>
          <SettingsIcon />
        </div>
        <ThemeToggleButton buttonClassName={clsx(classes.settingButton)} />
        <Logout buttonClassName={clsx(classes.settingButton)} />
        <DeleteAccount
          buttonClassName={clsx(classes.settingButton, classes.dangerousAction)}
        />
      </div>
    </div>
  );
};

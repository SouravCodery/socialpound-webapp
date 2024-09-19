"use client";

import clsx from "clsx";
import classes from "./settings.module.css";

import { Logout } from "./log-out/log-out";
import { SettingsIcon } from "@/components/icons/icons";
import { DeleteAccount } from "./delete-account/delete-account";

export const Settings = () => {
  return (
    <div className={classes.settingsSuperContainer}>
      <div className={clsx(classes.settingsContainer, "shadow")}>
        <div className={classes.settingsIconsContainer}>
          <SettingsIcon />
        </div>
        <Logout buttonClassName={clsx(classes.settingButton)} />
        <DeleteAccount
          buttonClassName={clsx(classes.settingButton, classes.dangerousAction)}
        />
      </div>
    </div>
  );
};
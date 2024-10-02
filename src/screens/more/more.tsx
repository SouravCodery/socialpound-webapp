"use client";

import Link from "next/link";
import clsx from "clsx";
import classes from "./more.module.css";

import { SettingsIcon } from "@/components/icons/icons";
import { Logout } from "./log-out/log-out";
import { DeleteAccount } from "./delete-account/delete-account";
import { ThemeToggleButton } from "./theme-toggle-button/theme-toggle-button";
import { FooterPublic } from "@/components/layout/footer-public/footer-public";

export const More = () => {
  return (
    <>
      <div className={classes.settingsSuperContainer}>
        <div className={clsx(classes.settingsContainer, "shadow")}>
          <div className={classes.settingsIconsContainer}>
            <SettingsIcon />
          </div>
          <Link
            className={clsx(classes.link, classes.settingButton)}
            href="/public/about-us"
          >
            About Us
          </Link>
          <a
            className={clsx(classes.link, classes.settingButton)}
            href={"https://souravchoudhary.com"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Sourav Choudhary
          </a>

          <ThemeToggleButton buttonClassName={clsx(classes.settingButton)} />
          <Logout buttonClassName={clsx(classes.settingButton)} />
          <DeleteAccount
            buttonClassName={clsx(
              classes.settingButton,
              classes.dangerousAction
            )}
          />
        </div>
      </div>
      <FooterPublic />
    </>
  );
};

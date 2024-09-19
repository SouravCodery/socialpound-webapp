"use client";

import { useRouter, usePathname } from "next/navigation";

import classes from "./header-secondary.module.css";
import { GoBackIcon } from "@/components/icons/icons";

export const HeaderSecondary = () => {
  const router = useRouter();
  const pathName = usePathname();

  const handleGoBack = () => {
    router.back();
  };

  const currentRoute = (pathName?.split("/")?.[1] ?? "").replace("-", " ");

  return (
    <header className={classes.header}>
      <button className={classes.backButton} onClick={handleGoBack}>
        <GoBackIcon />
      </button>
      {currentRoute}
    </header>
  );
};

"use client";

import { useRouter, usePathname } from "next/navigation";

import classes from "./header-secondary-routes.module.css";

import { GoBackIcon } from "@/components/icons/icons";

export const HeaderSecondaryRoutes = async () => {
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

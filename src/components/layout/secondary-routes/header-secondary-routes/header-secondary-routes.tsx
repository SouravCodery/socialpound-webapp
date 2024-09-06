"use client";

import { usePathname } from "next/navigation";
import classes from "./header-secondary-routes.module.css";

export const HeaderSecondaryRoutes = async () => {
  const pathName = usePathname();
  const currentRoute = pathName.split("/")[1];

  return <header className={classes.header}>{currentRoute}</header>;
};

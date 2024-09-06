import { clsx } from "clsx";

import classes from "./layout.module.css";

import { HeaderSecondaryRoutes } from "@/components/layout/secondary-routes/header-secondary-routes/header-secondary-routes";

export default function SecondaryRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderSecondaryRoutes />
      <main className={clsx(classes.main)}>{children}</main>
    </>
  );
}

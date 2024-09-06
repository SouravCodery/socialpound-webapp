import { clsx } from "clsx";

import classes from "./layout.module.css";

import { MobileHeader } from "@/components/layout/primary-routes/mobile-header-primary-routes/mobile-header-primary-routes";
import { MobileNavbar } from "@/components/layout/primary-routes/mobile-navbar-primary-routes/mobile-navbar-primary-routes";

export default function PrimaryRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MobileHeader />
      <main className={clsx(classes.main)}>{children}</main>
      <MobileNavbar />
    </>
  );
}

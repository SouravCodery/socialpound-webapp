import { clsx } from "clsx";
import classes from "./layout.module.css";

import { HeaderSecondary } from "@/components/layout/header-secondary/header-secondary";

export default function SecondaryRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={classes.container}>
        <HeaderSecondary />
        <main className={clsx(classes.main)}>{children}</main>
      </div>
    </>
  );
}

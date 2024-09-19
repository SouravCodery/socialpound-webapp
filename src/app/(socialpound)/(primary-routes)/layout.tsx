import { clsx } from "clsx";
import classes from "./layout.module.css";

import { HeaderPrimary } from "@/components/layout/header-primary/header-primary";
import { Navbar } from "@/components/layout/navbar/navbar";

export default function PrimaryRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderPrimary />
      <main className={clsx(classes.main)}>{children}</main>
      <Navbar />
    </>
  );
}

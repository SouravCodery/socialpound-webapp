import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import { clsx } from "clsx";

import "@/app/globals.css";
import classes from "./layout.module.css";

import { MobileNavbar } from "@/components/layout/mobile-navbar/mobile-navbar";
import { MobileHeader } from "@/components/layout/mobile-header/mobile-header";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["cyrillic"],
});

export const metadata: Metadata = {
  title: "Socialpound | SouravCodery",
  description:
    "Socialpound a Social Media Platform by Sourav Choudhary | @SouravCodery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(roboto.className, classes.body)}>
        <MobileHeader />
        <main className={clsx(classes.main)}>{children}</main>
        <MobileNavbar />
      </body>
    </html>
  );
}

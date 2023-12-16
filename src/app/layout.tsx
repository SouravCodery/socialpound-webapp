import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { clsx } from "clsx";

import "./globals.css";
import classes from "./layout.module.css";

import { Navbar } from "../../components/layout/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Instagram Clone | SouravCodery",
  description:
    "Instagram Clone Web App written by Sourav Choudhary | @SouravCodery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, classes.body)}>
        <main className={clsx(classes.main)}>{children}</main>
        <Navbar />
      </body>
    </html>
  );
}

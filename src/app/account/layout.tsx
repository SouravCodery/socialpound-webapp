import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { clsx } from "clsx";

import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={clsx(inter.className)}>{children}</body>
    </html>
  );
}

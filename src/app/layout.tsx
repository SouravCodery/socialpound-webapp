import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { clsx } from "clsx";

import "@/app/globals.css";
import classes from "./layout.module.css";
import { Toasts } from "@/components/toasts/toasts";

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
  const themeScript = `
    (function() {
      try {
        const theme = localStorage.getItem('theme') || 'light';
        const themeColor = theme === 'dark' ? '#000000' : '#ffffff';
        document.documentElement.classList.add(theme === 'dark' ? 'dark' : '');
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
          metaThemeColor.setAttribute('content', themeColor);
        }
      } catch (e) {
        document.documentElement.classList.remove('dark');
      }
    })();
  `;

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ffffff" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={clsx(roboto.className, classes.body)}>
        {children}
        <Toasts />
      </body>
    </html>
  );
}

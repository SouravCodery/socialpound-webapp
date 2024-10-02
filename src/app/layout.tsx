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
  title: "Socialpound by Sourav Choudhary (@SouravCodery)",
  description:
    "Socialpound is a social media platform like Instagram. It has been built by Sourav Choudhary (@SouravCodery).",
};

export const dynamic = "force-static";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeScript = `
    (function() {
      try {
        let theme = localStorage.getItem('theme');
        if (!theme) {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          theme = prefersDark ? 'dark' : 'light';
        }
        const themeColor = theme === 'dark' ? '#000000' : '#ffffff';
        document.documentElement.classList.add(theme === 'dark' ? 'dark' : 'light');
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
          metaThemeColor.setAttribute('content', themeColor);
        }
      } catch (e) {
        document.documentElement.classList.add('light');
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

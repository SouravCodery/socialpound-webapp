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
  title: "Socialpound by Sourav Choudhary | Social Media Platform",
  description:
    "Socialpound is a social media platform like Instagram, built by Sourav Choudhary (@SouravCodery).",
  keywords: [
    "Socialpound",
    "Sourav Choudhary",
    "Social Media Platform",
    "Instagram Clone",
    "MERN Stack",
    "SouravCodery",
    "Full Stack Developer",
    "Node.js",
    "React.js",
    "MongoDB",
    "Express.js",
    "Social Networking",
  ],
  authors: [{ name: "Sourav Choudhary" }],
  openGraph: {
    title: "Socialpound by Sourav Choudhary | Social Media Platform",
    description:
      "Socialpound is a social media platform like Instagram, built by Sourav Choudhary (@SouravCodery).",
    url: "https://socialpound.souravcodery.com",
    type: "website",
    siteName: "Socialpound",
    locale: "en_US",
    images: [
      {
        url: "https://socialpound.souravcodery.com/socialpound-souravcodery.jpg",
        alt: "Socialpound - Social Media Platform",
      },
    ],
  },
  twitter: {
    title: "Socialpound by Sourav Choudhary | Social Media Platform",
    description:
      "Socialpound is a social media platform like Instagram, built by Sourav Choudhary (@SouravCodery).",
    card: "summary_large_image",
    images: [
      {
        url: "https://socialpound.souravcodery.com/socialpound-souravcodery.jpg",
        alt: "Socialpound - Social Media Platform",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://socialpound.souravcodery.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Socialpound",
  description:
    "Socialpound is a social media platform like Instagram, built by Sourav Choudhary (@SouravCodery).",
  url: "https://socialpound.souravcodery.com",
  applicationCategory: "Social Networking Application",
  operatingSystem: "All",
  creator: {
    "@type": "Person",
    name: "Sourav Choudhary",
    jobTitle: "Full Stack Developer",
    url: "https://souravchoudhary.com",
    sameAs: [
      "https://twitter.com/souravcodery",
      "https://github.com/souravcodery",
      "https://linkedin.com/in/souravcodery",
    ],
  },
  logo: "https://socialpound.souravcodery.com/socialpound-souravcodery.jpg",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

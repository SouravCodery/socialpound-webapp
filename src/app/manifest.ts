import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Socialpound by @SouravCodery",
    short_name: "Socialpound",
    description: "A social media platform like Instagram",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon/android-chrome-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
    ],
  };
}

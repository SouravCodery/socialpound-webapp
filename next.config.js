/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_CDN_BASE_URL.split("//")[1],
      },
    ],
  },
};

module.exports = nextConfig;

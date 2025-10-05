import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
  eslint: {
    // ⚠️ Warning: this allows production builds even with ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

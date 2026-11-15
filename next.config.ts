import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    //allow images from my cloudinary cdn
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  experimental: {
    serverActions: {
      //trust requests coming through the GitHub Codespaces address
      allowedOrigins: ["localhost:3000", "*.app.github.dev"],
    },
  },
};

export default nextConfig;
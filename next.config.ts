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
};

export default nextConfig;

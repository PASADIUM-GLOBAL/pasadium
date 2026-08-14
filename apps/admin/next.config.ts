import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  transpilePackages: ["@pasadium/ui", "@pasadium/config", "@pasadium/api", "@pasadium/auth"],
};

export default nextConfig;

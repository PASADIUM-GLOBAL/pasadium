import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  transpilePackages: [
    '@pasadium/config',
    '@pasadium/ui',
    '@pasadium/bridge'
  ],
};

export default nextConfig;

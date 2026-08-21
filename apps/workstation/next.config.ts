import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: [
    '@pasadium/config',
    '@pasadium/ui',
    '@pasadium/bridge'
  ],
};

export default nextConfig;

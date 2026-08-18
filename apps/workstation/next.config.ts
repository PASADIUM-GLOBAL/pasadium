import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  transpilePackages: ['@pasadium/ui', '@pasadium/bridge'],
};

export default nextConfig;

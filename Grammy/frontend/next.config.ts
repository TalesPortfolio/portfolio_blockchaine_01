import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    turbo: false, // Desativa o Turbopack
  },
};

export default nextConfig;

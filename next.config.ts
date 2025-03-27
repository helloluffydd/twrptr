import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/twrptr',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

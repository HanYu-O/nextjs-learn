import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 启用静态导出优化
  output: 'standalone',

  // 图片优化
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

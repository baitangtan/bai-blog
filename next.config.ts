import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async rewrites() {
    const dirs = ["liuyao", "liuren", "qimen", "taiyi"];
    return dirs.flatMap((dir) => [
      { source: `/${dir}`, destination: `/${dir}/index.html` },
    ]);
  },
};

export default nextConfig;

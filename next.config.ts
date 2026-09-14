import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  transpilePackages: ["three"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;

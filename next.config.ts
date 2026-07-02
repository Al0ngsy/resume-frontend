import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure dev HMR works when data files change
  // by disabling static output caching
  output: undefined,
  devIndicators: false,
};

export default nextConfig;
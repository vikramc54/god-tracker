import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_IS_DEBUG: process.env.NEXT_PUBLIC_IS_DEBUG,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["avatar.iran.liara.run", "103.186.20.110"],
  },
};

export default nextConfig;

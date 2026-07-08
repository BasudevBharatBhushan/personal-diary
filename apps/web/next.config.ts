import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Consume @b3os/core directly as TypeScript source — no separate build step.
  transpilePackages: ["@b3os/core"],
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/tempo-trades",
  assetPrefix: "/tempo-trades/",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: "/tempo-trades",
  },
};

export default nextConfig;

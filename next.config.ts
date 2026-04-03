import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/tempo-trades" : "",
  assetPrefix: isProd ? "/tempo-trades/" : "",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/tempo-trades" : "",
  },
};

export default nextConfig;

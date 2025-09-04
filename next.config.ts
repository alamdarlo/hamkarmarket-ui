import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps:false,
  eslint: {
    ignoreDuringBuilds: true, // skips all ESLint errors at build time
  },
  compiler: {
    styledComponents: true,
    reactRemoveProperties: { properties: ['^data-custom$'] },
    //removeConsole: {exclude: ['error'],},
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental:{
    typedRoutes:true,
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;

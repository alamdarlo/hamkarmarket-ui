import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps:false,
  eslint: {
    ignoreDuringBuilds: true, // skips all ESLint errors at build time
  },
  compiler: {
    styledComponents: true,
    reactRemoveProperties: { properties: ['^data-custom$'] },
    removeConsole:false// {exclude: ['error'],},
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental:{
    swcTraceProfiling: true,
    //typedRoutes:true,
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    SESSION_SECRET:process.env.SESSION_SECRET,
    JWT_SECRET:process.env.JWT_SECRET,
  },
  reactStrictMode: true,
   async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

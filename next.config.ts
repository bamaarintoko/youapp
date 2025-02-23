import type { NextConfig } from "next";
import withPWA from "next-pwa";
// Define PWA configuration separately

const pwaConfig = {
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
};

// Define Next.js configuration separately

export default withPWA(pwaConfig)({
    
    reactStrictMode: false,
    // experimental: {
    //   appDir: true, // Enable App Router
    // },
  }) as NextConfig;
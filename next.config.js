/* eslint-disable no-undef */
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    // env for client side
    ROLLBAR_ID: process.env.ROLLBAR_ID,
  },
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  trailingSlash: true,

  images: {
    unoptimized: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;

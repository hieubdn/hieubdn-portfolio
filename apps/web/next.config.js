import withPWA from '@ducanh2912/next-pwa';

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  webpack: (config) => {
    config.module.rules.push({
      test: /\.pdf$/i,
      type: "asset/resource",
    });
    return config;
  },
};

export default pwaConfig(nextConfig);
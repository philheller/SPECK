/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // if developping next locally, comment out the webpack config
  webpack: (config, context) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};

module.exports = nextConfig;

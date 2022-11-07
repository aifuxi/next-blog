/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `${process.env.BASE_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;

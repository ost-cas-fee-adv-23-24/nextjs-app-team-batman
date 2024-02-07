/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '**',
      },
    ],
  },
  env: {
    NEXTAUTH_URL: process.env.DEPLOY_PRIME_URL || process.env.URL || 'http://localhost:3000',
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'tailark.com',
      },
      {
        protocol: 'https',
        hostname: 'html.tailus.io',
      },
    ],
  },
}

module.exports = nextConfig


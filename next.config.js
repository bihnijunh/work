/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.zellepay.com',
      },
      {
        protocol: 'https',
        hostname: 'www.paypalobjects.com',
      },
    ],
  }
}

module.exports = nextConfig 
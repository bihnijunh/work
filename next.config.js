/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  experimental: {
    forceSwcTransforms: false
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
  },
  webpack: (config, { isServer }) => {
    // Force webpack to use Babel
    config.resolve.alias = {
      ...config.resolve.alias,
      '@next/swc-win32-x64-msvc': false,
    }
    return config
  }
}

module.exports = nextConfig 
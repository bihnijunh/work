/** @type {import('next').NextConfig} */
const nextConfig = {
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
    // Prevent platform-specific SWC bindings from being included
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@next/swc-win32-x64-msvc': false,
        '@next/swc-win32-ia32-msvc': false,
        '@next/swc-win32-arm64-msvc': false,
      }
    }
    return config
  }
}

module.exports = nextConfig 
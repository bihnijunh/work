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
    if (!isServer) {
      // Ensure platform-specific modules are properly handled
      config.resolve.alias = {
        ...config.resolve.alias,
        '@next/swc-win32-x64-msvc': false,
        '@next/swc-win32-ia32-msvc': false,
        '@next/swc-win32-arm64-msvc': false,
        '@next/swc-darwin-x64': false,
        '@next/swc-darwin-arm64': false,
      }
    }
    return config
  }
}

module.exports = nextConfig 
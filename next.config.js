/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'braze-images.com',
      },
      {
        protocol: 'https',
        hostname: 'ci3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'fonts.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'www.paypalobjects.com',
      },
      {
        protocol: 'https',
        hostname: 'www.zellepay.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'cash-images-f.squarecdn.com',
      },
      {
        protocol: 'https',
        hostname: 'cash-s.squarecdn.com',
      }
    ],
  },
  // Since these are email templates, we can safely ignore the img element warnings
  eslint: {
    ignoreDuringBuilds: true,
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

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  // Disable Turbopack since it requires SWC
  experimental: {
    turbopack: false
  }
}

module.exports = nextConfig 
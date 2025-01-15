/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  compiler: {
    // Disable SWC as fallback
    styledComponents: true
  }
}

module.exports = nextConfig 
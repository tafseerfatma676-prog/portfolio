/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
  },
  // Allows build to succeed even with TypeScript warnings
  typescript: {
    ignoreBuildErrors: true,
  },
  // Allows build to succeed even with ESLint warnings
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig

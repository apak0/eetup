import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn-icons-png.flaticon.com', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'neemmee.com',
        port: '', // or '443' if needed
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        port: '',
        pathname: '/**',
      },
      {
        hostname: 'ik.imagekit.io',
      },
    ],
  },
  reactStrictMode: true,
}

export default nextConfig

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'neemmee.com',
        port: '', // or '443' if needed
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true,
}

export default nextConfig

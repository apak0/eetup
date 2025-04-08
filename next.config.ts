import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["img.freepik.com"],
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
    ],
  },
  reactStrictMode: true,
}

export default nextConfig

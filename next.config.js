/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "image.tmdb.org",
        port: '',
        // pathname: '/account123/**',
      },
    ],
  },
}

module.exports = nextConfig

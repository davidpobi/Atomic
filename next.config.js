/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: false,
    domains: ['arweave.net','firebasestorage.googleapis.com','res.cloudinary.com','ipfs.io'],
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: false,
    domains: ['arweave.net','firebasestorage.googleapis.com','res.cloudinary.com','ipfs.io','clonex-assets.rtfkt.com','api.opensea.io','openseauserdata.com'],
  },
}

module.exports = nextConfig
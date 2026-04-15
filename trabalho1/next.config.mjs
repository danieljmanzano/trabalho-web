/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  onDemandEntries: {
    maxInactiveAge: 15 * 1000,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
}

export default nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['ocbw6avizmnlavei.public.blob.vercel-storage.com'],
  },
};

export default nextConfig;

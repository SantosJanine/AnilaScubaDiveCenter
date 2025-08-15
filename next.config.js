/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['wq8gj23taekk62rr.public.blob.vercel-storage.com'], // Add your image domains here
  },
  typescript: {
    ignoreBuildErrors: true, // 👈 ignores TS errors
  },
  eslint: {
    ignoreDuringBuilds: true, // 👈 ignores ESLint errors
  },
};

module.exports = nextConfig;

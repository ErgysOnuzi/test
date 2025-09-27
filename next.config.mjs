/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    esmExternals: 'loose'
  },
  // Use server-side rendering instead of static export
  trailingSlash: true,
  skipTrailingSlashRedirect: true
};

export default nextConfig;
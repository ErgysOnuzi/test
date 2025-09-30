import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  // Port configuration for Replit
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
};

export default withNextIntl(nextConfig);
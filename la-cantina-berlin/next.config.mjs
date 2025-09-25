import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },
  
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  
  // Bundle analyzer in development
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
      return config;
    },
  }),
  
  experimental: { 
    serverActions: { 
      allowedOrigins: process.env.NODE_ENV === 'development' 
        ? ['*'] 
        : ['lacantina-berlin.de', '*.lacantina-berlin.de', '*.replit.dev']
    }
  },

  // Cross-origin headers handled in headers() function below
  
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.replit.app',
      },
      {
        protocol: 'https', 
        hostname: '*.repl.it',
      },
      {
        protocol: 'https',
        hostname: '*.replit.dev',
      }
    ]
  },

  // Redirect root to German locale for Replit preview
  async redirects() {
    return [
      {
        source: '/',
        destination: '/de',
        permanent: false,
      },
    ];
  },

  // Allow all hosts for Replit environment
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "frame-src 'self' https://www.instagram.com https://*.instagram.com https://*.cdninstagram.com",
              "frame-ancestors 'self'",
              "img-src 'self' data: https: https://*.cdninstagram.com",
              process.env.NODE_ENV === 'development' 
                ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'" 
                : "script-src 'self'",
              process.env.NODE_ENV === 'development'
                ? "style-src 'self' 'unsafe-inline'"
                : "style-src 'self' 'unsafe-inline'", // Keep for CSS-in-JS in React
              "connect-src 'self' https: wss:",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
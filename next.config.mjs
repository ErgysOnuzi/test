import createNextIntlPlugin from 'next-intl/plugin';
import crypto from 'crypto';

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
  
  // Force static generation and prefetching
  trailingSlash: false,
  
  // Webpack optimizations for faster builds
  webpack: (config, { dev, isServer }) => {
    // Optimize chunks for faster navigation
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Create separate chunks for major libraries
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test(module) {
              return module.size() > 160000 && /node_modules[/\\]/.test(module.identifier());
            },
            name(module) {
              const hash = crypto.createHash('sha1');
              hash.update(module.identifier());
              return hash.digest('hex').substring(0, 8);
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
          },
        },
      };
    }
    return config;
  },
  
  experimental: { 
    serverActions: { 
      allowedOrigins: process.env.NODE_ENV === 'development' 
        ? ['*'] 
        : ['lacantina-berlin.de', '*.lacantina-berlin.de', '*.replit.dev']
    }
  },

  // Cross-origin headers handled in headers() function below
  
  images: {
    qualities: [50, 75, 85, 95, 100],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
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
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
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
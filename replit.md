# La Cantina Berlin Restaurant Website

## Current Status (October 3, 2025)

**✅ COMPREHENSIVE SECURITY AUDIT & INFRASTRUCTURE COMPLETE**:

### Security Hardening
- ✅ **Security Headers Enhanced**: CSP with nonce support, HSTS (1-year), COOP/COEP, Permissions-Policy
- ✅ **Rate Limiting**: Multi-tier limits (general: 1000/15min, auth: 5/15min, API: 200/15min, uploads: 50/hr)
- ✅ **Error Handling**: Standardized error responses with proper codes (400/401/403/404/409/429/500)
- ✅ **Supply Chain**: 0 npm vulnerabilities, Node.js 20.x pinned
- ✅ **API Security**: All protected endpoints enforce authentication (401 for unauthenticated CUD operations)

### Observability
- ✅ **Health Endpoints**: `/api/health` and `/api/ready` with database connectivity checks
- ✅ **Structured Logging**: Request/error logging with proper context
- ✅ **Version Tracking**: Health endpoints include version from package.json

### SEO & Accessibility
- ✅ **robots.txt**: Properly configured with sitemap reference
- ✅ **sitemap.xml**: Full i18n support (de/en) with hreflang alternates
- ✅ **Semantic HTML**: Proper heading hierarchy, labels, alt text

### Testing Infrastructure
- ✅ **Probe Scripts**: Route status, API security, headers verification
- ✅ **Playwright Setup**: E2E tests created (browser installation not supported in Replit)
- ✅ **Accessibility Tests**: Axe integration configured for WCAG 2.1 AA

### Audit Results
- ✅ **Routes**: All public routes return 200 OK
- ✅ **Security**: Headers properly configured (verified via curl)
- ✅ **Authentication**: Protected endpoints return 401 without auth
- ⚠️ **Admin Login**: HTML form renders but requires JavaScript for submission (progressive enhancement needed)

### Previous Status (Same Day)
- ✅ Phone validation now accepts international format with + symbol (regex updated)
- ✅ Feedback validation made visitDate/wouldRecommend optional (frontend compatibility)
- ✅ All TypeScript errors resolved - Request/Response types added to all routes
- ✅ Database sequences fixed for reservations, contact, feedback, event_bookings
- ✅ All API endpoints tested and working: reservations, contact, feedback, menu, gallery
- ✅ Admin panel functional with cookie-based authentication

## Previous Status (October 2, 2025)

**✅ REACT/VITE/EXPRESS ARCHITECTURE RESTORED** - Successfully maintained original architecture:
- ✅ React 18 with Vite for frontend (port 5000)
- ✅ Express server for backend API (port 3001)
- ✅ PostgreSQL database with 123 menu items preserved
- ✅ Bilingual support (German/English) using react-i18next
- ✅ Homepage rendering correctly with terracotta color scheme
- ✅ All pages functional: Menu, Gallery, Events, Reservations, Contact
- ✅ Google Reviews integration configured (requires valid API keys)
- ✅ **Admin Panel fully functional** - Cookie-based authentication with CSRF protection

**Recent Deployment Fixes (October 2):**
- ✅ Fixed "Cannot find module" deployment crashes
- ✅ Switched to Neon HTTP client (drizzle-orm/neon-http) - no websockets, fully bundleable  
- ✅ Database connection now bundles directly into CJS without requiring node_modules at runtime
- ✅ Made sharp (image processing) lazy-loaded and optional
- ✅ Build command: `npm install && npm run build` (ensures all dependencies available)
- ✅ Production start: `NODE_ENV=production node dist/server/index.cjs`
- ✅ Hybrid bundling: esbuild bundles ALL JS dependencies (Express, Neon, etc.) - 7.0MB file
- ✅ External modules: Only native binaries (sharp, better-sqlite3) loaded from node_modules when available
- ✅ CommonJS format (--format=cjs --target=node20) works in Replit autoscale containers
- ✅ Path resolution uses process.cwd() (works in both ESM dev and CJS production)
- ✅ Relaxed boot guard: Only SESSION_SECRET and JWT_SECRET are critical (server won't crash if DB/API keys missing)
- ✅ Admin authentication fixed: All API calls now include credentials for session management

## Overview

La Cantina Berlin is a full-stack restaurant website built with React, Vite, and Express. It's designed for an authentic Italian restaurant in Berlin, featuring a sophisticated UI with warm terracotta and cream color schemes. The application provides a complete restaurant management system including menu display, reservations, gallery, events, and contact functionality.

**IMPORTANT**: All fake/mock data has been removed from the website. Components now return empty arrays or hide themselves when no real data is available, ensuring only authentic business information is displayed.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with Vite for build tooling and hot reload
- **Routing**: React Router DOM for client-side routing
- **Internationalization**: react-i18next for bilingual German/English support
- **State Management**: React hooks (useState, useEffect) for client-side state
- **UI Framework**: Custom component library with Tailwind CSS
- **Styling**: Tailwind CSS with custom terracotta/cream color scheme and Google Fonts
- **Development Server**: Vite dev server on port 5000

### Backend Architecture
- **Runtime**: Node.js 20 with Express 5
- **Database**: PostgreSQL (Neon-backed) via Drizzle ORM
- **API Structure**: RESTful API routes in `/server/routes/` directory
- **Security**: Helmet, rate limiting, input sanitization, CORS configuration
- **Development**: tsx for TypeScript execution on port 3001
- **Production**: Hybrid bundling - esbuild creates 6.9MB CommonJS bundle with JS dependencies, native modules (sharp, better-sqlite3) external in node_modules

### Database Architecture
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts`
- **Menu Items**: 123 authentic Italian dishes with bilingual content
- **Tables**: menu_items, gallery_images, events, reservations, contacts, feedback, admin_users

### Security & Middleware Architecture
- **Security Middleware**: `server/middleware/security.ts`
  - CSP nonce generation (production: strict nonces, dev: unsafe-inline for HMR)
  - Multi-tier rate limiting (general, auth, API, upload)
  - Helmet configuration (HSTS, COOP, COEP, Permissions-Policy)
- **Error Handling**: `server/middleware/error-handler.ts`
  - Standardized error format: `{"error": {"code": "...", "message": "...", "fields": {}}}`
  - No stack traces in production
  - Helper functions for common errors (badRequest, unauthorized, forbidden, etc.)
- **Validation**: `server/middleware/validation.ts`
  - Express-validator for input sanitization
  - Type-safe request validation

### Observability & Testing
- **Health Endpoints**: `server/routes/health.ts`
  - `/api/health` - Server status, version, timestamp
  - `/api/ready` - Readiness check with database connectivity
- **Probe Scripts**: `scripts/`
  - `probe.sh` - Route status code verification
  - `api-probe.sh` - API security testing
  - `headers-check.sh` - Security headers validation
- **E2E Tests**: `tests/public.spec.ts`
  - Playwright + Axe accessibility testing
  - Public routes, admin login, accessibility scans

### Design System
- **Typography**: 
  - Playfair Display (serif) - Headings and restaurant name
  - Inter (sans-serif) - Body text and UI
  - Dancing Script (cursive) - Accent text ("Bleibtreu")
- **Color Palette**: 
  - Primary: Orange-600 (#EA580C) terracotta
  - Background: Cream/gray tones
  - Accents: Charcoal and white
- **Layout**: Responsive design with mobile-first approach

### Data Schema (SQLite)
- **Menu Items**: 
  - Bilingual fields (title_de, title_en, description_de, description_en, category_de, category_en)
  - Pricing, availability tracking, allergen information
  - Auto-incrementing integer IDs
- **Future Tables**: Reservations, Gallery, Events, Contact (to be implemented)

### Internationalization (i18n)
- **Supported Locales**: German (de) - default, English (en)
- **Implementation**: react-i18next with language detection
- **Translation Files**: `public/locales/de/` and `public/locales/en/`
- **URL Structure**: `/de/menu`, `/en/menu`, etc.

### Google Reviews Integration
- **Service**: Google Places API for fetching real restaurant reviews
- **Configuration**: Requires `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID` environment variables
- **Caching**: 6-hour cache to reduce API calls
- **Security**: Rate limiting, input sanitization, error handling
- **Current Status**: API keys need to be properly configured in Google Cloud Console with Places API enabled

### Admin Panel Authentication
- **Login URL**: `/de/admin/login` (German) or `/en/admin/login` (English)
- **Dashboard URL**: `/de/admin/dashboard` (German) or `/en/admin/dashboard` (English)
- **Authentication Method**: Cookie-based sessions with JWT tokens (2-hour expiry)
- **CSRF Protection**: CSRF tokens required for all state-changing operations
- **Credentials**: Stored in Replit Secrets (ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD)
- **Features**: 
  - Menu management (CRUD operations)
  - Event bookings management
  - Reservations management
  - Feedback/reviews moderation
  - Contact messages management
  - Gallery image management
- **Session Security**: HttpOnly cookies, secure in production, SameSite protection

## Project Structure

```
/src
  /app
    /[locale]              # Internationalized routes
      /menu               # Menu page (client component)
        page.tsx          # Menu listing with categories
      layout.tsx          # Root layout with i18n provider
      page.tsx            # Homepage (server component)
    /api
      /menu               # Menu API endpoints
        route.ts          # GET endpoint for menu items
    globals.css           # Global styles with Tailwind
  /lib
    db.ts                 # SQLite database connection
    schema.ts             # Drizzle schema definitions
  /i18n                   # Internationalization config
    routing.ts            # Locale routing configuration
  i18n.ts                 # Main i18n configuration
  middleware.ts           # Next.js middleware for i18n
/messages
  de.json                 # German translations
  en.json                 # English translations
data.db                   # SQLite database file
next.config.js            # Next.js configuration
tailwind.config.js        # Tailwind CSS configuration
```

## External Dependencies

- **Core Framework**: Next.js 15, React 19, TypeScript
- **Database**: better-sqlite3, Drizzle ORM
- **Internationalization**: next-intl
- **Styling**: Tailwind CSS, autoprefixer, postcss
- **UI Components**: Radix UI primitives (dropdown, label, select, etc.)
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Playfair Display, Inter, Dancing Script)

## Development Workflow

### Running the Application
- **Development**: `npm run dev` - Starts Next.js dev server on port 5000
- **Build**: `npm run build` - Creates production build
- **Start**: `npm start` - Runs production server

### Database Management
- **Schema**: Defined in `src/lib/schema.ts` using Drizzle ORM
- **Initialization**: Database auto-creates tables on first run
- **No Migrations**: SQLite schema is managed directly (no migration files needed for development)

### Key Configuration Files
- `next.config.js`: Next.js configuration (currently has warning about deprecated appDir experimental flag)
- `src/i18n.ts`: Internationalization request configuration
- `src/middleware.ts`: Next.js middleware for locale routing
- `tailwind.config.js`: Tailwind CSS with custom colors and fonts

## Known Issues & Future Work

### Current Issues (October 3, 2025 - Post-Audit)
- ⚠️ **Admin login SSR**: Form requires JavaScript for submission - needs progressive enhancement with server-side POST handler
- ⚠️ **Static asset caching**: Should use immutable cache headers for /assets/* paths (currently no-cache)
- ⚠️ **404 status codes**: Non-existent routes return 200 instead of 404
- ⚠️ **Sitemap domain**: Uses lacantina-berlin.de instead of la-cantina.replit.app (should be dynamic)
- ⚠️ Google Places API key is invalid - Reviews integration disabled until proper API key is configured in Google Cloud Console
- ⚠️ Menu API slow (2-3 seconds for 123 items) - Query optimization recommended
- ℹ️ Two placeholder gallery images in database reference missing files (test1.jpg, test2.jpg)

### Resolved Issues
- ✅ Phone validation now accepts international format (was rejecting + symbol)
- ✅ Feedback validation matches frontend fields (visitDate/wouldRecommend made optional)
- ✅ All TypeScript/LSP errors fixed across route files
- ✅ Database sequence issues resolved (was causing duplicate key errors)

### Next Steps

**High Priority** (Security & UX):
1. Fix admin login for non-JS clients (add server-side POST handler with HTML response)
2. Fix 404 status codes (catch-all route should return 404, not 200)
3. Update sitemap domain to be dynamic or use la-cantina.replit.app
4. Configure static asset caching (immutable headers for /assets/*)

**Medium Priority** (Infrastructure):
1. Run Playwright E2E tests in CI/CD (GitHub Actions with browser support)
2. Run Lighthouse performance audit in CI/CD
3. Add automated accessibility testing with Axe in CI/CD
4. Optimize menu API query performance

**Low Priority** (Features):
1. Add image upload functionality for gallery
2. Set up email notifications for reservations/contact forms
3. Implement additional admin dashboard features
# La Cantina Berlin Restaurant Website

## Current Status (October 3, 2025)

**✅ VALIDATION & TYPESCRIPT FIXES COMPLETE**:
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

### Current Issues (October 3, 2025)
- ⚠️ Google Places API key is invalid - Reviews integration disabled until proper API key is configured in Google Cloud Console
- ⚠️ Menu API slow (2-3 seconds for 123 items) - Query optimization recommended
- ℹ️ Two placeholder gallery images in database reference missing files (test1.jpg, test2.jpg)

### Resolved Issues
- ✅ Phone validation now accepts international format (was rejecting + symbol)
- ✅ Feedback validation matches frontend fields (visitDate/wouldRecommend made optional)
- ✅ All TypeScript/LSP errors fixed across route files
- ✅ Database sequence issues resolved (was causing duplicate key errors)

### Next Steps
1. Implement remaining pages (Reservations, Gallery, Events, Contact)
2. Create admin dashboard for menu management
3. Migrate full 123 Italian menu items from PostgreSQL backup to SQLite
4. Add image upload functionality for gallery
5. Implement reservation booking system
6. Add event management features
7. Set up email notifications for reservations/contact forms
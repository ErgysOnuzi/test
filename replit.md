# La Cantina Berlin Restaurant Website

## Current Status (September 30, 2025)

**✅ REACT/VITE/EXPRESS ARCHITECTURE RESTORED** - Successfully maintained original architecture:
- ✅ React 18 with Vite for frontend (port 5000)
- ✅ Express server for backend API (port 3001)
- ✅ PostgreSQL database with 123 menu items preserved
- ✅ Bilingual support (German/English) using react-i18next
- ✅ Homepage rendering correctly with terracotta color scheme
- ✅ All pages functional: Menu, Gallery, Events, Reservations, Contact
- ✅ Google Reviews integration configured (requires valid API keys)

**Recent Deployment Fixes (September 30):**
- ✅ Resolved production dependency issues by using tsx as a runtime dependency
- ✅ Build command only builds frontend with Vite (no server compilation needed)
- ✅ Production start uses `NODE_ENV=production tsx server/index.ts`
- ✅ tsx remains in dependencies ensuring TypeScript runs directly in production
- ✅ Deployment configured for autoscale (build: vite, run: tsx)
- ✅ Verified production server correctly binds to PORT environment variable
- ✅ All node_modules available at runtime without bundling complexity

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
- **Production**: esbuild bundle as ESM module (server.mjs)

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

### Current Issues
- Minor hydration mismatch warning in browser (lang="de" vs lang="en") - does not affect functionality
- next.config.js shows warning about deprecated `experimental.appDir` - can be removed as App Router is now stable
- LSP diagnostic in src/i18n.ts (minor, does not affect build)

### Next Steps
1. Implement remaining pages (Reservations, Gallery, Events, Contact)
2. Create admin dashboard for menu management
3. Migrate full 123 Italian menu items from PostgreSQL backup to SQLite
4. Add image upload functionality for gallery
5. Implement reservation booking system
6. Add event management features
7. Set up email notifications for reservations/contact forms
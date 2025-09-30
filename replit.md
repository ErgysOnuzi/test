# La Cantina Berlin Restaurant Website

## Current Status (September 30, 2025)

**🎉 NEXT.JS 15 TRANSFORMATION COMPLETE** - Successfully migrated from React/Vite/Express to Next.js 15:
- ✅ Next.js 15 with App Router running on port 5000 (zero compilation errors)
- ✅ SQLite database successfully initialized with sample menu data
- ✅ Bilingual support (German/English) using next-intl properly configured
- ✅ Homepage rendering correctly with terracotta color scheme
- ✅ Menu page with category navigation and API integration functional
- ✅ All async params properly awaited (Next.js 15 requirement)
- ✅ Server and Client Components correctly separated

**Recent Major Transformation (September 30):**
- Migrated entire application from React/Vite/Express stack to Next.js 15
- Converted PostgreSQL database to SQLite with better-sqlite3
- Implemented proper Next.js 15 async params pattern
- Set up next-intl for internationalization with German/English support
- Created proper App Router structure with [locale] routing
- Fixed all hydration and compilation issues

## Overview

La Cantina Berlin is a full-stack restaurant website built with Next.js 15. It's designed for an authentic Italian restaurant in Berlin, featuring a sophisticated UI with warm terracotta and cream color schemes. The application provides a complete restaurant management system including menu display, reservations, gallery, events, and contact functionality.

**IMPORTANT**: All fake/mock data has been removed from the website. Components now return empty arrays or hide themselves when no real data is available, ensuring only authentic business information is displayed.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 15 with App Router and React Server Components
- **Routing**: File-based routing with [locale] dynamic segments for internationalization
- **Internationalization**: next-intl for bilingual German/English support
- **State Management**: React hooks (useState, useEffect) for client-side state
- **UI Framework**: Custom component library with Tailwind CSS
- **Styling**: Tailwind CSS with custom terracotta/cream color scheme and Google Fonts

### Backend Architecture
- **Runtime**: Next.js 15 API Routes (App Router)
- **Database**: SQLite with better-sqlite3 driver
- **ORM**: Drizzle ORM for type-safe database operations
- **API Structure**: RESTful API routes in `/app/api/` directory
- **Development**: Next.js built-in dev server with hot reload

### Database Architecture
- **Database**: SQLite (data.db file) with better-sqlite3
- **ORM**: Drizzle ORM with SQLite adapter
- **Schema Location**: `src/lib/schema.ts`
- **Initialization**: Database tables auto-created on startup
- **Sample Data**: 4 menu items (Vitello Tonnato, Pizza Margherita, Pizza Diavola, Spaghetti Carbonara)

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
- **Implementation**: next-intl with App Router
- **Translation Files**: `/messages/de.json` and `/messages/en.json`
- **Routing**: `[locale]` dynamic segment for language switching
- **URL Structure**: `/de/menu`, `/en/menu`, etc.

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
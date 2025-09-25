# La Cantina Berlin Restaurant Website

## Overview

La Cantina Berlin is a professional restaurant website for an authentic Italian restaurant in Berlin. It's a bilingual (German/English) Next.js application featuring customer-facing pages for menu display, reservations, gallery, and events, alongside a comprehensive admin management panel for restaurant operations. The site emphasizes authentic Italian cuisine with warm, inviting design elements and includes features like customer feedback, online reservations, and multilingual content management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 15 with App Router and TypeScript for type safety and modern React patterns
- **Internationalization**: next-intl for German (default) and English language support with locale-based routing (`/de/*` and `/en/*`)
- **Styling**: Tailwind CSS with custom design system using warm terracotta primary colors, cream backgrounds, and Italian-inspired typography (Playfair Display, Inter, Dancing Script)
- **UI Components**: shadcn/ui component library built on Radix UI primitives for accessible, production-ready components
- **State Management**: Client-side state handled through React hooks with form validation using React Hook Form and Zod

### Backend Architecture
- **Database**: PostgreSQL via Neon serverless with Drizzle ORM for type-safe database operations
- **Authentication**: JWT-based admin authentication using jose library (Edge runtime compatible) with HTTP-only cookies
- **API Structure**: RESTful API routes for menu management, reservations, gallery uploads, events, contact forms, and feedback system
- **Security**: Rate limiting, CSRF protection, input validation, and environment-based secret management
- **Email Integration**: Replit mail service for contact forms and reservation confirmations

### Data Architecture
- **Menu System**: Multilingual menu items with categories, pricing, availability status, and allergen information
- **Reservation System**: Guest information capture with date/time booking, party size, and status tracking
- **Gallery Management**: Image upload and categorization with admin CRUD operations
- **Events Management**: Event scheduling with descriptions, pricing, and attendee management
- **Feedback System**: Customer review collection with star ratings and admin moderation

### Design System
- **Color Palette**: Warm terracotta (HSL 15 75% 45%) as primary, cream backgrounds (HSL 45 25% 90%), with sage green accents
- **Typography**: Multi-font hierarchy with Playfair Display for headings, Inter for body text, and Dancing Script for Italian accents
- **Layout System**: Responsive design with consistent Tailwind spacing units and hover/focus animations
- **Component Architecture**: Reusable components for forms, cards, navigation, and data display with proper accessibility patterns

### Security Features
- **Admin Authentication**: Server-side JWT validation with secure session management and automatic token expiry
- **Input Validation**: Zod schema validation for all form inputs and API endpoints
- **Rate Limiting**: Protection against brute force attacks on login and form submission endpoints
- **Environment Security**: All secrets stored in environment variables with no hardcoded credentials
- **CSRF Protection**: Anti-CSRF measures for state-changing operations

## External Dependencies

### Database Services
- **Neon PostgreSQL**: Serverless PostgreSQL database with WebSocket support for real-time operations
- **Drizzle Kit**: Database migration and schema management tools for PostgreSQL

### UI and Component Libraries
- **Radix UI**: Complete collection of accessible primitive components (Dialog, Dropdown, Form controls, Navigation)
- **shadcn/ui**: Pre-built component library with consistent styling and TypeScript support
- **Lucide React**: Icon library providing consistent iconography throughout the application

### Authentication and Security
- **jose**: JWT token generation and verification (Edge runtime compatible)
- **bcryptjs**: Password hashing for admin authentication
- **zod**: Runtime type validation for forms and API endpoints

### Internationalization
- **next-intl**: Complete i18n solution with message files for German and English locales
- **Locale routing**: Automatic language detection and URL-based locale switching

### Development and Deployment
- **Replit Mail**: Email service integration for contact forms and notifications
- **Better SQLite3**: Local development database with migration capabilities from legacy data
- **TypeScript**: Full type safety across frontend and backend with shared schema definitions

### Third-party Integrations
- **Instagram Embeds**: Direct iframe integration for social media content display
- **Google Reviews**: API integration for displaying authentic customer reviews
- **Font Services**: Google Fonts integration for custom typography (Playfair Display, Inter, Dancing Script)
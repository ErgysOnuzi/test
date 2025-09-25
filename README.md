# La Cantina Berlin 🍝

Professional restaurant website with customer feedback system and comprehensive admin management panel.

## Features ✨

### Customer Experience
- **Bilingual Support**: Full German/English internationalization
- **Customer Reviews**: Star rating system with review submission
- **Modern Design**: Responsive design with warm Italian aesthetic
- **Menu Display**: Organized by categories with availability status
- **Reservation System**: Online table booking
- **Gallery**: Restaurant photos and ambiance
- **Events**: Special events and promotions

### Admin Management
- **Secure Authentication**: JWT-based login with environment secrets
- **Feedback Moderation**: Approve, reject, or delete customer reviews
- **Menu Management**: Add, edit, remove menu items and pricing
- **Reservation Management**: View and manage customer bookings
- **Gallery Management**: Upload and organize restaurant photos
- **Event Management**: Create and manage special events

### Security & Performance
- **Production-Ready Security**: HTTP-only cookies, CSRF protection
- **Environment Variables**: Secure credential management
- **Edge Runtime Compatible**: Optimized for modern deployment platforms
- **Fast Performance**: Under 2-second startup time
- **Type Safety**: Full TypeScript implementation

## Tech Stack 🛠️

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **Authentication**: JWT with jose library (Edge runtime compatible)
- **Database**: SQLite with better-sqlite3
- **Internationalization**: next-intl
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

## Security Features 🔒

- JWT authentication with secure HTTP-only cookies
- CSRF protection for admin routes
- Environment-based secret management
- Server-side session validation
- Middleware-level route protection
- Input validation and sanitization

## Getting Started 🚀

1. **Clone the repository**
   ```bash
   git clone https://github.com/ErgysOnuzi/la-cantina-berlin.git
   cd la-cantina-berlin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   Create a `.env.local` file with:
   ```
   ADMIN_PASSWORD=your_secure_admin_password
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Website: http://localhost:5000
   - Admin panel: http://localhost:5000/en/admin (or /de/admin)

## Project Structure 📁

```
src/
├── app/                    # Next.js app directory
│   ├── [locale]/          # Internationalized pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
├── lib/                   # Utility libraries
├── messages/              # Translation files
└── middleware.ts          # Security and i18n middleware
```

## Contributing 🤝

This is a production website for La Cantina Berlin restaurant. For feature requests or bug reports, please open an issue.

## License 📄

Private project for La Cantina Berlin restaurant.

---

**La Cantina Berlin** - Authentic Italian cuisine in the heart of Berlin

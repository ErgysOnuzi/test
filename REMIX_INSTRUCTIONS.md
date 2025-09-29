# 🍝 La Cantina Berlin - Remix Instructions

## Quick Setup for New Replit Account

### 1. **Fork This Repl**
1. Click "Fork" to copy all code to your account
2. Wait for the fork to complete

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Setup Database**
1. In Replit, create a new PostgreSQL database
2. Import the data:
```bash
psql $DATABASE_URL < restaurant_database_backup.sql
```
3. Push schema:
```bash
npm run db:push --force
```

### 4. **Environment Variables**
Add these secrets in your Replit:

**Required (Create New):**
- `JWT_SECRET` = any-random-string-here  
- `SESSION_SECRET` = another-random-string

**Admin Account:**
- `ADMIN_EMAIL` = your-email@example.com
- `ADMIN_USERNAME` = admin
- `ADMIN_PASSWORD` = your-secure-password

**Google APIs (Optional):**
- `GOOGLE_API_KEY` = (get from Google Cloud Console)
- `GOOGLE_PLACES_API_KEY` = (for reviews integration)
- `GOOGLE_PLACE_ID` = (your restaurant's Google Place ID)

### 5. **Launch**
```bash
npm run dev
```

## ✅ What You Get

**🏠 Complete Restaurant Website:**
- 123 menu items with real Italian dishes
- 2 gallery images  
- Events system with booking capability
- Contact forms and feedback system
- German/English bilingual support

**👩‍💼 Full Admin Dashboard:**
- Menu management (CRUD)
- Reservation tracking
- Event management
- Gallery administration
- Feedback moderation

**🔒 Production-Ready Security:**
- JWT authentication
- Rate limiting
- Input sanitization
- CSRF protection
- SQL injection protection

**📱 Modern Design:**
- Responsive on all devices
- Clean hamburger navigation
- Scrollable menu dropdown
- Beautiful Italian restaurant aesthetics

## 🚀 Deploy to Production

Your remix is automatically configured for deployment:
1. Click "Deploy" in Replit
2. Choose your domain name
3. Your restaurant website goes live!

---

**Need help?** All systems are tested and production-ready!
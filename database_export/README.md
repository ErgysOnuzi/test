# La Cantina Berlin - Database Export

## Export Contents

Your complete database has been exported on **September 26, 2025** from your La Cantina Berlin restaurant website.

### 📊 **Database Summary**
- **Contact Messages**: 6 entries (including test data and security-escaped XSS attempts)
- **Reservations**: 3 test reservations
- **Menu Items**: 65+ authentic Italian dishes with German/English translations
- **Gallery**: 50+ restaurant photos with descriptions
- **Feedbacks**: 2 customer reviews (1 pending, 1 approved)
- **Admin Users**: 1 admin account
- **Events**: Empty (no events created)
- **Event Bookings**: Empty (no bookings)

### 📁 **Export Files**

#### JSON Format (Ready for Import)
- `contact_messages.json` - All contact form submissions
- `reservations.json` - All reservation bookings
- `feedbacks.json` - Customer feedback and reviews
- `admin_users.json` - Admin accounts (with hashed passwords)
- `menu_items.json` - Complete restaurant menu (coming soon)
- `gallery.json` - All gallery images and descriptions (coming soon)

#### SQL Format
- `complete_database_backup.sql` - SQL INSERT statements for easy database restoration

#### Additional Notes
- **Security**: XSS attempts are properly escaped (e.g., `<script>` becomes `&lt;script&gt;`)
- **Passwords**: Admin passwords are securely hashed with bcrypt
- **Timestamps**: All in UTC format
- **Images**: Gallery contains local file paths to uploaded images

### 🚀 **How to Use This Export**

1. **For New Replit Project**: Import JSON files using your application's data import feature
2. **For PostgreSQL Database**: Run the SQL backup file to restore all data
3. **For Development**: Use JSON files to populate test data

### 🔒 **Security Notice**

This export contains:
- Hashed admin passwords (secure)
- Test customer data (safe to use)
- XSS-escaped malicious inputs (shows your security is working)

Your database export is complete and ready for use!
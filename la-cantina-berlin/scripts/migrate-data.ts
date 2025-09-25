import Database from 'better-sqlite3';
import path from 'path';
import { db } from '../server/db';
import { menuItems, reservations, gallery, events, contactMessages, feedbacks } from '../shared/schema';

// Initialize SQLite database connection
const dbPath = path.join(process.cwd(), 'data', 'la_cantina.db');
const sqliteDb = new Database(dbPath);

async function migrateData() {
  console.log('Starting data migration from SQLite to PostgreSQL...');

  try {
    // Migrate menu items (123 records)
    console.log('Migrating menu items...');
    const sqliteMenuItems = sqliteDb.prepare(`
      SELECT * FROM menu_items ORDER BY id
    `).all();
    
    console.log(`Found ${sqliteMenuItems.length} menu items to migrate`);
    
    for (const item of sqliteMenuItems) {
      await db.insert(menuItems).values({
        title: item.title,
        price: item.price,
        category: item.category,
        isAvailable: Boolean(item.is_available),
        titleDe: item.title_de,
        titleEn: item.title_en,
        descriptionDe: item.description_de,
        descriptionEn: item.description_en,
        categoryDe: item.category_de,
        categoryEn: item.category_en,
        allergens: item.allergens,
      });
    }
    console.log(`✓ Migrated ${sqliteMenuItems.length} menu items`);

    // Migrate reservations (5 records)
    console.log('Migrating reservations...');
    const sqliteReservations = sqliteDb.prepare(`
      SELECT * FROM reservations ORDER BY id
    `).all();
    
    console.log(`Found ${sqliteReservations.length} reservations to migrate`);
    
    for (const reservation of sqliteReservations) {
      await db.insert(reservations).values({
        name: reservation.name,
        phone: reservation.phone,
        email: reservation.email,
        date: reservation.date,
        time: reservation.time,
        guests: reservation.guests,
        status: reservation.status,
        createdAt: new Date(reservation.created_at),
      });
    }
    console.log(`✓ Migrated ${sqliteReservations.length} reservations`);

    // Migrate gallery items (0 records expected)
    console.log('Migrating gallery items...');
    const sqliteGallery = sqliteDb.prepare(`
      SELECT * FROM gallery ORDER BY id
    `).all();
    
    console.log(`Found ${sqliteGallery.length} gallery items to migrate`);
    
    for (const galleryItem of sqliteGallery) {
      await db.insert(gallery).values({
        imageUrl: galleryItem.image_url,
        createdAt: new Date(galleryItem.created_at),
      });
    }
    console.log(`✓ Migrated ${sqliteGallery.length} gallery items`);

    // Migrate events (3 records)
    console.log('Migrating events...');
    const sqliteEvents = sqliteDb.prepare(`
      SELECT * FROM events ORDER BY id
    `).all();
    
    console.log(`Found ${sqliteEvents.length} events to migrate`);
    
    for (const event of sqliteEvents) {
      await db.insert(events).values({
        title: event.title,
        date: event.date,
        capacity: event.capacity,
        createdAt: new Date(event.created_at),
      });
    }
    console.log(`✓ Migrated ${sqliteEvents.length} events`);

    // Migrate contact messages (3 records)
    console.log('Migrating contact messages...');
    const sqliteContactMessages = sqliteDb.prepare(`
      SELECT * FROM contact_messages ORDER BY id
    `).all();
    
    console.log(`Found ${sqliteContactMessages.length} contact messages to migrate`);
    
    for (const message of sqliteContactMessages) {
      await db.insert(contactMessages).values({
        name: message.name,
        email: message.email,
        message: message.message,
        createdAt: new Date(message.created_at),
      });
    }
    console.log(`✓ Migrated ${sqliteContactMessages.length} contact messages`);

    // Migrate feedbacks (0 records expected)
    console.log('Migrating feedbacks...');
    const sqliteFeedbacks = sqliteDb.prepare(`
      SELECT * FROM feedbacks ORDER BY id
    `).all();
    
    console.log(`Found ${sqliteFeedbacks.length} feedbacks to migrate`);
    
    for (const feedback of sqliteFeedbacks) {
      await db.insert(feedbacks).values({
        name: feedback.name,
        email: feedback.email,
        rating: feedback.rating,
        comment: feedback.comment,
        status: feedback.status,
        createdAt: new Date(feedback.created_at),
      });
    }
    console.log(`✓ Migrated ${sqliteFeedbacks.length} feedbacks`);

    console.log('\n🎉 Data migration completed successfully!');
    console.log('Summary:');
    console.log(`- Menu items: ${sqliteMenuItems.length}`);
    console.log(`- Reservations: ${sqliteReservations.length}`);
    console.log(`- Gallery items: ${sqliteGallery.length}`);
    console.log(`- Events: ${sqliteEvents.length}`);
    console.log(`- Contact messages: ${sqliteContactMessages.length}`);
    console.log(`- Feedbacks: ${sqliteFeedbacks.length}`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    sqliteDb.close();
    process.exit(0);
  }
}

// Run migration
migrateData().catch(console.error);
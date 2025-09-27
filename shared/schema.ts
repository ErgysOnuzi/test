import {
  pgTable,
  serial,
  text,
  real,
  integer,
  boolean,
  timestamp,
  varchar,
  jsonb,
  index,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

// Session storage table for Replit Auth - MANDATORY
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth - MANDATORY
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Menu items table - authentic Italian dishes from the original restaurant
export const menuItems = pgTable('menu_items', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  price: real('price').notNull(),
  category: text('category').notNull(),
  isAvailable: boolean('is_available').default(true),
  titleDe: text('title_de'),
  titleEn: text('title_en'),
  descriptionDe: text('description_de'),
  descriptionEn: text('description_en'),
  categoryDe: text('category_de'),
  categoryEn: text('category_en'),
  allergens: text('allergens'),
  imageUrl: text('image_url'), // Image URL for the dish
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Reservations table - table bookings with guest information
export const reservations = pgTable('reservations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  email: text('email'),
  date: text('date').notNull(), // Store as text to match current format
  time: text('time').notNull(),
  guests: integer('guests').notNull(),
  status: text('status').default('pending'), // pending, confirmed, cancelled, completed
  notes: text('notes'), // Additional notes for special requests
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Gallery table - restaurant photos and atmosphere images
export const gallery = pgTable('gallery', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  description: text('description'),
  alt: text('alt'), // Alt text for accessibility
  category: text('category'), // interior, food, events, etc.
  isActive: boolean('is_active').default(true),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Events table - special events, wine tastings, cooking classes
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  titleDe: text('title_de'),
  titleEn: text('title_en'),
  descriptionDe: text('description_de'),
  descriptionEn: text('description_en'),
  date: text('date'), // Event date
  startTime: text('start_time'), // Event start time
  endTime: text('end_time'), // Event end time
  capacity: integer('capacity'), // Maximum attendees
  currentBookings: integer('current_bookings').default(0),
  price: real('price'), // Event price per person
  imageUrl: text('image_url'), // Event promotional image
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Contact messages table - customer inquiries and messages
export const contactMessages = pgTable('contact_messages', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'), // Optional phone number
  subject: text('subject'), // Message subject
  message: text('message').notNull(),
  status: text('status').default('new'), // new, read, replied, archived
  priority: text('priority').default('normal'), // low, normal, high
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Feedbacks table - customer reviews and ratings
export const feedbacks = pgTable('feedbacks', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  rating: integer('rating').notNull(), // 1-5 stars
  comment: text('comment').notNull(),
  status: text('status').default('pending'), // pending, approved, rejected
  isPublic: boolean('is_public').default(false), // Whether to display publicly
  reservationId: integer('reservation_id'), // Link to reservation if applicable
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Event bookings table - track event registrations
export const eventBookings = pgTable('event_bookings', {
  id: serial('id').primaryKey(),
  eventId: integer('event_id').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  guests: integer('guests').default(1),
  totalPrice: real('total_price'),
  status: text('status').default('pending'), // pending, confirmed, cancelled
  specialRequests: text('special_requests'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Admin users table - restaurant staff and management
export const adminUsers = pgTable('admin_users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(),
  email: text('email').notNull(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').default('staff'), // admin, manager, staff
  isActive: boolean('is_active').default(true),
  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Define relations between tables
export const feedbacksRelations = relations(feedbacks, ({ one }) => ({
  reservation: one(reservations, {
    fields: [feedbacks.reservationId],
    references: [reservations.id],
  }),
}));

export const reservationsRelations = relations(reservations, ({ many }) => ({
  feedbacks: many(feedbacks),
}));

export const eventsRelations = relations(events, ({ many }) => ({
  bookings: many(eventBookings),
}));

export const eventBookingsRelations = relations(eventBookings, ({ one }) => ({
  event: one(events, {
    fields: [eventBookings.eventId],
    references: [events.id],
  }),
}));

// Export types for TypeScript usage
export type MenuItem = typeof menuItems.$inferSelect;
export type InsertMenuItem = typeof menuItems.$inferInsert;

export type Reservation = typeof reservations.$inferSelect;
export type InsertReservation = typeof reservations.$inferInsert;

export type GalleryItem = typeof gallery.$inferSelect;
export type InsertGalleryItem = typeof gallery.$inferInsert;

export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;

export type Feedback = typeof feedbacks.$inferSelect;
export type InsertFeedback = typeof feedbacks.$inferInsert;

export type EventBooking = typeof eventBookings.$inferSelect;
export type InsertEventBooking = typeof eventBookings.$inferInsert;

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = typeof adminUsers.$inferInsert;

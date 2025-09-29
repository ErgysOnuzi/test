import { pgTable, serial, text, real, integer, boolean, timestamp, varchar, jsonb, index, } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
export const sessions = pgTable("sessions", {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
}, (table) => [index("IDX_session_expire").on(table.expire)]);
export const users = pgTable("users", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    email: varchar("email").unique(),
    firstName: varchar("first_name"),
    lastName: varchar("last_name"),
    profileImageUrl: varchar("profile_image_url"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
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
    imageUrl: text('image_url'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});
export const reservations = pgTable('reservations', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    phone: text('phone').notNull(),
    email: text('email'),
    date: text('date').notNull(),
    time: text('time').notNull(),
    guests: integer('guests').notNull(),
    status: text('status').default('pending'),
    notes: text('notes'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});
export const gallery = pgTable('gallery', {
    id: serial('id').primaryKey(),
    imageUrl: text('image_url').notNull(),
    description: text('description'),
    alt: text('alt'),
    category: text('category'),
    isActive: boolean('is_active').default(true),
    sortOrder: integer('sort_order').default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});
export const events = pgTable('events', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    titleDe: text('title_de'),
    titleEn: text('title_en'),
    descriptionDe: text('description_de'),
    descriptionEn: text('description_en'),
    date: text('date'),
    startTime: text('start_time'),
    endTime: text('end_time'),
    capacity: integer('capacity'),
    currentBookings: integer('current_bookings').default(0),
    price: real('price'),
    imageUrl: text('image_url'),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});
export const contactMessages = pgTable('contact_messages', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    phone: text('phone'),
    subject: text('subject'),
    message: text('message').notNull(),
    status: text('status').default('new'),
    priority: text('priority').default('normal'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});
export const feedbacks = pgTable('feedbacks', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    rating: integer('rating').notNull(),
    comment: text('comment').notNull(),
    status: text('status').default('pending'),
    isPublic: boolean('is_public').default(false),
    reservationId: integer('reservation_id'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});
export const eventBookings = pgTable('event_bookings', {
    id: serial('id').primaryKey(),
    eventId: integer('event_id').notNull(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    phone: text('phone'),
    guests: integer('guests').default(1),
    totalPrice: real('total_price'),
    status: text('status').default('pending'),
    specialRequests: text('special_requests'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});
export const adminUsers = pgTable('admin_users', {
    id: serial('id').primaryKey(),
    username: text('username').notNull(),
    email: text('email').notNull(),
    passwordHash: text('password_hash').notNull(),
    role: text('role').default('staff'),
    isActive: boolean('is_active').default(true),
    lastLogin: timestamp('last_login'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});
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

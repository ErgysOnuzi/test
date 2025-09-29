import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const menuItems = sqliteTable('menu_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  price: real('price').notNull(),
  category: text('category').notNull(),
  isAvailable: integer('is_available', { mode: 'boolean' }).default(true),
  titleDe: text('title_de'),
  titleEn: text('title_en'),
  descriptionDe: text('description_de'),
  descriptionEn: text('description_en'),
  categoryDe: text('category_de'),
  categoryEn: text('category_en'),
  allergens: text('allergens'),
  imageUrl: text('image_url'),
  createdAt: text('created_at').default(sql`datetime('now')`),
  updatedAt: text('updated_at').default(sql`datetime('now')`),
});

export type MenuItem = typeof menuItems.$inferSelect;
export type NewMenuItem = typeof menuItems.$inferInsert;
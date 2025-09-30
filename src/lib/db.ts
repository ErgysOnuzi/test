import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

const sqlite = new Database('data.db');
export const db = drizzle(sqlite, { schema });

function initDb() {
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      category TEXT NOT NULL,
      is_available INTEGER DEFAULT 1,
      title_de TEXT,
      title_en TEXT,
      description_de TEXT,
      description_en TEXT,
      category_de TEXT,
      category_en TEXT,
      allergens TEXT,
      image_url TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);
  
  const count = sqlite.prepare('SELECT COUNT(*) as count FROM menu_items').get() as { count: number };
  if (count.count === 0) {
    const insertItem = sqlite.prepare(`
      INSERT INTO menu_items (title, description, price, category, is_available, title_de, title_en, description_de, description_en, category_de, category_en) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const items = [
      ['Vitello Tonnato', 'Thin slices of veal in tuna cream', 16.55, 'Appetizers', 1, 'Vitello Tonnato', 'Vitello Tonnato', 'Dünne Kalbsschnitzel in Thunfisch-Creme', 'Thin slices of veal in tuna cream', 'Vorspeisen', 'Appetizers'],
      ['Pizza Margherita', 'Classic Neapolitan pizza with San Marzano tomatoes, mozzarella di bufala, and fresh basil', 13.00, 'Pizza', 1, 'Pizza Margherita', 'Pizza Margherita', 'Klassische neapolitanische Pizza mit San Marzano Tomaten, Büffelmozzarella und frischem Basilikum', 'Classic Neapolitan pizza with San Marzano tomatoes, mozzarella di bufala, and fresh basil', 'Pizza', 'Pizza'],
      ['Pizza Diavola', 'Spicy salami, mozzarella, tomato sauce, and chili oil on wood-fired crust', 15.50, 'Pizza', 1, 'Pizza Diavola', 'Pizza Diavola', 'Scharfe Salami, Mozzarella, Tomatensauce und Chiliöl auf holzgefeuerter Kruste', 'Spicy salami, mozzarella, tomato sauce, and chili oil on wood-fired crust', 'Pizza', 'Pizza'],
      ['Spaghetti Carbonara', 'Traditional Roman pasta with guanciale, pecorino romano, and eggs', 14.50, 'Pasta', 1, 'Spaghetti Carbonara', 'Spaghetti Carbonara', 'Traditionelle römische Pasta mit Guanciale, Pecorino Romano und Eiern', 'Traditional Roman pasta with guanciale, pecorino romano, and eggs', 'Pasta', 'Pasta']
    ];

    items.forEach(item => insertItem.run(...item));
  }
}

initDb();

export default db;
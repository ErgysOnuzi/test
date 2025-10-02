import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../shared/schema';

// Database connection using Neon HTTP client (no websockets, works in bundled CJS)
let db: any;

async function initializeDatabase() {
  if (db) return db; // Already initialized
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is missing');
    console.error('Available env vars:', Object.keys(process.env).filter(key => key.includes('DATABASE') || key.includes('PG')));
    throw new Error(
      'DATABASE_URL must be set. Did you forget to provision a database? Check deployment environment variables.'
    );
  }

  // HTTP client - no websockets needed, can be bundled
  // Using simplified syntax: pass DATABASE_URL directly to drizzle()
  db = drizzle(process.env.DATABASE_URL, { schema });
  
  return db;
}

// Export the initialization function
export { initializeDatabase };

// For backwards compatibility, export a promise that resolves to db
export const dbPromise = initializeDatabase();

// Synchronous access (will throw if called before initialization)
export { db };

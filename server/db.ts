import { drizzle } from 'drizzle-orm/neon-serverless';
import * as schema from '../shared/schema';

// Database connection - initialized asynchronously to support ESM-only packages in CJS bundle
let pool: any;
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

  // Dynamic import for ESM-only package (works in both ESM dev and CJS production)
  const { Pool, neonConfig } = await import('@neondatabase/serverless');
  const ws = await import('ws');
  
  neonConfig.webSocketConstructor = ws.default;
  
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle({ client: pool, schema });
  
  return db;
}

// Export the initialization function
export { initializeDatabase };

// For backwards compatibility, export a promise that resolves to db
export const dbPromise = initializeDatabase();

// Synchronous access (will throw if called before initialization)
export { db, pool };

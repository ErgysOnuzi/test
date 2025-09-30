import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';
import * as schema from '../shared/schema';

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is missing');
  console.error('Available env vars:', Object.keys(process.env).filter(key => key.includes('DATABASE') || key.includes('PG')));
  throw new Error(
    'DATABASE_URL must be set. Did you forget to provision a database? Check deployment environment variables.'
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });
export default db;

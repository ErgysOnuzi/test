// PostgreSQL database connection using Neon and Drizzle ORM
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "../../shared/schema";

// Configure Neon for Node.js environment
neonConfig.webSocketConstructor = ws;
// Use HTTP fetch transport to avoid WebSocket issues on Replit
neonConfig.poolQueryViaFetch = true;
// Only disable secure WebSocket for development, keep secure for production
neonConfig.useSecureWebSocket = process.env.NODE_ENV === 'production';

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Use the DATABASE_URL as-is - it already has proper SSL configuration
const dbUrl = process.env.DATABASE_URL;

// Optimize connection pool for performance
const pool = new Pool({ 
  connectionString: dbUrl,
  max: 5, // Maximum connections in pool
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  allowExitOnIdle: false, // Keep pool alive
});

const db = drizzle({ client: pool, schema });

// Helper function to log slow queries
export async function query(q: string, params?: any[]) {
  const start = Date.now();
  const res = await pool.query(q, params);
  const duration = Date.now() - start;
  if (duration > 50) {
    console.warn(`SLOW QUERY (${duration}ms):`, q);
  }
  return res;
}

export default db;
export { schema };
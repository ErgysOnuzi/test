// PostgreSQL database connection using Neon and Drizzle ORM
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "../../shared/schema";

// Configure Neon for Node.js environment
neonConfig.webSocketConstructor = ws;
// Use HTTP fetch transport to avoid WebSocket issues on Replit
neonConfig.poolQueryViaFetch = true;
neonConfig.useSecureWebSocket = false;
// Disable SSL certificate verification for development
neonConfig.fetchConnectionCache = true;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Modify DATABASE_URL to disable SSL for development
const dbUrl = new URL(process.env.DATABASE_URL);
dbUrl.searchParams.set('sslmode', 'disable');

const pool = new Pool({ connectionString: dbUrl.toString() });
const db = drizzle({ client: pool, schema });

export default db;
export { schema };
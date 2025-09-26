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

const pool = new Pool({ connectionString: dbUrl });
const db = drizzle({ client: pool, schema });

export default db;
export { schema };
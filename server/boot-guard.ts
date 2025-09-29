/**
 * Boot Guard - Validates all required environment variables at startup
 * Exits with code 1 if any required secrets are missing
 */

// Required secrets (storage variables excluded for now as specified)
const REQUIRED_SECRETS = [
  'DATABASE_URL',
  'PGHOST', 
  'PGPORT',
  'PGUSER',
  'PGPASSWORD', 
  'PGDATABASE',
  'SESSION_SECRET',
  'JWT_SECRET',
  'ADMIN_PASSWORD',
  'GOOGLE_API_KEY',
  'GOOGLE_PLACES_API_KEY',
  'GOOGLE_PLACE_ID'
] as const;

export function validateEnvironment(): void {
  console.log('🔍 Boot Guard: Validating environment variables...');
  
  const missing: string[] = [];
  const present: string[] = [];
  
  for (const secret of REQUIRED_SECRETS) {
    if (!process.env[secret] || process.env[secret]?.trim() === '') {
      missing.push(secret);
    } else {
      present.push(secret);
    }
  }
  
  console.log(`✅ Present (${present.length}/${REQUIRED_SECRETS.length}):`, present.join(', '));
  
  if (missing.length > 0) {
    console.error('❌ Boot Guard: Missing required environment variables:');
    missing.forEach(secret => {
      console.error(`   - ${secret}`);
    });
    console.error('\n🚨 Exiting with code 1. Please add missing secrets to Replit Secrets.');
    process.exit(1);
  }
  
  console.log('✅ Boot Guard: All required environment variables are present');
}

export default validateEnvironment;
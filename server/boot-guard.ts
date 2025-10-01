/**
 * Boot Guard - Validates environment variables at startup
 * Only exits for critical missing secrets
 */

// Critical secrets required for server to start
const CRITICAL_SECRETS = [
  'SESSION_SECRET',
  'JWT_SECRET',
] as const;

// Optional secrets - warns if missing but doesn't block startup
const OPTIONAL_SECRETS = [
  'DATABASE_URL',
  'PGHOST', 
  'PGPORT',
  'PGUSER',
  'PGPASSWORD', 
  'PGDATABASE',
  'ADMIN_EMAIL',
  'ADMIN_USERNAME', 
  'ADMIN_PASSWORD',
  'GOOGLE_API_KEY',
  'GOOGLE_PLACES_API_KEY',
  'GOOGLE_PLACE_ID'
] as const;

export function validateEnvironment(): void {
  console.log('🔍 Boot Guard: Validating environment variables...');
  
  const criticalMissing: string[] = [];
  const optionalMissing: string[] = [];
  const present: string[] = [];
  
  // Check critical secrets
  for (const secret of CRITICAL_SECRETS) {
    if (!process.env[secret] || process.env[secret]?.trim() === '') {
      criticalMissing.push(secret);
    } else {
      present.push(secret);
    }
  }
  
  // Check optional secrets
  for (const secret of OPTIONAL_SECRETS) {
    if (!process.env[secret] || process.env[secret]?.trim() === '') {
      optionalMissing.push(secret);
    } else {
      present.push(secret);
    }
  }
  
  const totalSecrets = CRITICAL_SECRETS.length + OPTIONAL_SECRETS.length;
  console.log(`✅ Present (${present.length}/${totalSecrets}):`, present.join(', '));
  
  // Only exit for critical missing secrets
  if (criticalMissing.length > 0) {
    console.error('❌ Boot Guard: Missing CRITICAL environment variables:');
    criticalMissing.forEach(secret => {
      console.error(`   - ${secret}`);
    });
    console.error('\n🚨 Exiting with code 1. Please add missing secrets to Replit Secrets.');
    process.exit(1);
  }
  
  // Warn about optional missing secrets
  if (optionalMissing.length > 0) {
    console.warn('⚠️  Boot Guard: Missing optional environment variables (some features may be limited):');
    optionalMissing.forEach(secret => {
      console.warn(`   - ${secret}`);
    });
  }
  
  console.log('✅ Boot Guard: All critical environment variables are present');
}

export default validateEnvironment;
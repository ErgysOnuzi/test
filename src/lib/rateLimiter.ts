// Rate limiting for security-sensitive routes
interface RateLimitEntry {
  count: number;
  firstAttempt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

export function checkRateLimit(clientId: string): {
  allowed: boolean;
  remaining: number;
} {
  const now = Date.now();
  const entry = rateLimitMap.get(clientId);

  // Clean up old entries
  if (entry && now - entry.firstAttempt > RATE_LIMIT_WINDOW) {
    rateLimitMap.delete(clientId);
  }

  const currentEntry = rateLimitMap.get(clientId);

  if (!currentEntry) {
    // First attempt
    rateLimitMap.set(clientId, { count: 1, firstAttempt: now });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 };
  }

  if (currentEntry.count >= MAX_ATTEMPTS) {
    return { allowed: false, remaining: 0 };
  }

  currentEntry.count++;
  return { allowed: true, remaining: MAX_ATTEMPTS - currentEntry.count };
}

export function getRateLimitHeaders(
  remaining: number,
  windowMs: number = RATE_LIMIT_WINDOW
) {
  return {
    'X-RateLimit-Limit': MAX_ATTEMPTS.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': new Date(Date.now() + windowMs).toISOString(),
  };
}

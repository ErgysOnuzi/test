import express from 'express';
import { instagramService } from '../services/instagramService';

const router = express.Router();

// Rate limiting for Instagram API
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return false;
  }

  if (limit.count >= 10) { // Max 10 requests per minute
    return true;
  }

  limit.count++;
  return false;
};

/**
 * GET /api/instagram/posts
 * Get Instagram posts with caching
 */
router.get('/posts', async (req, res) => {
  try {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    
    if (isRateLimited(ip)) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please try again later.',
      });
    }

    const count = parseInt(req.query.count as string) || 6;
    const maxCount = 12;
    const requestCount = Math.min(Math.max(count, 1), maxCount);

    const posts = await instagramService.getInstagramPosts(requestCount);

    return res.json({
      posts,
      count: posts.length,
      profileUrl: instagramService.getProfileUrl(),
      cached: true, // We don't expose internal caching details
    });
  } catch (error) {
    console.error('❌ Instagram API route error:', error);
    return res.status(500).json({
      error: 'Failed to fetch Instagram posts',
      message: 'Please try again later',
    });
  }
});

/**
 * POST /api/instagram/clear-cache
 * Clear Instagram cache (admin only)
 */
router.post('/clear-cache', (req, res) => {
  // Note: In production, this should be protected by admin authentication
  // For now, we'll just clear the cache
  try {
    instagramService.clearCache();
    return res.json({ success: true, message: 'Instagram cache cleared' });
  } catch (error) {
    console.error('❌ Failed to clear Instagram cache:', error);
    return res.status(500).json({
      error: 'Failed to clear cache',
      message: 'Please try again later',
    });
  }
});

export default router;
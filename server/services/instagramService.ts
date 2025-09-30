import { InMemoryCache } from '../utils/cache';

interface InstagramPost {
  id: string;
  permalink: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  caption?: string;
  timestamp: string;
  thumbnail_url?: string;
}

interface InstagramAPIResponse {
  data: InstagramPost[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

// Fallback Instagram URLs (existing hardcoded list)
const FALLBACK_IG_URLS = [
  'https://www.instagram.com/p/DAvXTRFidcu/',
  'https://www.instagram.com/p/C_vwvupNoNR/',
  'https://www.instagram.com/p/C8HwJgmt8aL/',
  'https://www.instagram.com/p/C6gz8uSiGlb/',
  'https://www.instagram.com/p/C6Mg0uGLdNH/',
  'https://www.instagram.com/p/C4lqzQMrscT/',
  'https://www.instagram.com/p/C4kriK-NmpI/',
  'https://www.instagram.com/p/C0e_9IcLnk-/',
  'https://www.instagram.com/p/Cztz53rN1km/',
  'https://www.instagram.com/p/CroTpxftUqg/',
  'https://www.instagram.com/p/C3xB9KuNmPR/',
  'https://www.instagram.com/p/C2pL7VuoTqX/',
];

class InstagramService {
  private cache: InMemoryCache<InstagramPost[]>;
  private readonly CACHE_TTL = 30 * 60 * 1000; // 30 minutes
  private readonly pageId: string;
  private readonly accessToken: string;

  constructor() {
    this.cache = new InMemoryCache<InstagramPost[]>(this.CACHE_TTL);
    this.pageId = process.env.IG_PAGE_ID || '';
    this.accessToken = process.env.IG_ACCESS_TOKEN || '';
  }

  /**
   * Get Instagram posts with caching and fallback
   */
  async getInstagramPosts(count: number = 6): Promise<string[]> {
    try {
      // Try to get from cache first
      const cached = this.cache.get('instagram_posts');
      if (cached) {
        console.log('📸 Instagram: Using cached posts');
        return cached.slice(0, count).map(post => post.permalink);
      }

      // Fetch fresh data if API credentials are available
      if (this.pageId && this.accessToken) {
        const posts = await this.fetchFromAPI();
        if (posts.length > 0) {
          this.cache.set('instagram_posts', posts);
          console.log(`📸 Instagram: Fetched ${posts.length} posts from API`);
          return posts.slice(0, count).map(post => post.permalink);
        }
      }

      // Fallback to hardcoded URLs with daily rotation
      console.log('📸 Instagram: Using fallback URLs with daily rotation');
      return this.selectDailyFallbackPosts(count);
    } catch (error) {
      console.warn('⚠️ Instagram API error, using fallback:', error);
      return this.selectDailyFallbackPosts(count);
    }
  }

  /**
   * Fetch posts from Instagram Graph API
   */
  private async fetchFromAPI(): Promise<InstagramPost[]> {
    if (!this.pageId || !this.accessToken) {
      throw new Error('Instagram API credentials not configured');
    }

    const fields = 'id,permalink,media_type,media_url,caption,timestamp,thumbnail_url';
    const url = `https://graph.instagram.com/v18.0/${this.pageId}/media?fields=${fields}&limit=12&access_token=${this.accessToken}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Instagram API error (${response.status}): ${errorText}`);
    }

    const data: InstagramAPIResponse = await response.json();
    
    // Filter to only include image and video posts
    return data.data.filter(post => 
      post.media_type === 'IMAGE' || 
      post.media_type === 'VIDEO' || 
      post.media_type === 'CAROUSEL_ALBUM'
    );
  }

  /**
   * Select daily posts from fallback URLs using seeded random
   */
  private selectDailyFallbackPosts(count: number): string[] {
    // Use Berlin timezone for consistent daily rotation
    const berlinTime = new Date().toLocaleString('en-US', {
      timeZone: 'Europe/Berlin',
    });
    const berlinDate = new Date(berlinTime);
    
    // Get days since epoch based on Berlin midnight
    const today = Math.floor(berlinDate.getTime() / (1000 * 60 * 60 * 24));
    
    const shuffled = [...FALLBACK_IG_URLS];
    
    // Fisher-Yates shuffle with seeded random
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(this.seededRandom(today + i) * (i + 1));
      const temp = shuffled[i];
      if (temp !== undefined && shuffled[j] !== undefined) {
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
      }
    }
    
    return shuffled.slice(0, count);
  }

  /**
   * Seeded random function for consistent daily rotation
   */
  private seededRandom(seed: number): number {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  /**
   * Get Instagram profile URL
   */
  getProfileUrl(): string {
    return 'https://instagram.com/lacantina.berlin';
  }

  /**
   * Clear cache manually (for testing/admin purposes)
   */
  clearCache(): void {
    this.cache.clear();
    console.log('📸 Instagram: Cache cleared');
  }
}

export const instagramService = new InstagramService();
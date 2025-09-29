import { useQuery } from '@tanstack/react-query';

interface InstagramResponse {
  posts: string[];
  count: number;
  profileUrl: string;
  cached: boolean;
}

/**
 * Hook to fetch Instagram posts from the API
 */
export function useInstagram(count: number = 6) {
  return useQuery({
    queryKey: ['instagram', count],
    queryFn: async (): Promise<InstagramResponse> => {
      const response = await fetch(`/api/instagram/posts?count=${count}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch Instagram posts: ${response.statusText}`);
      }
      
      return response.json();
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: 30 * 60 * 1000, // Refetch every 30 minutes
    retry: (failureCount, error) => {
      // Only retry for network errors, not client errors
      if (error instanceof Error && error.message.includes('4')) {
        return false;
      }
      return failureCount < 2;
    },
  });
}

/**
 * Hook to clear Instagram cache (admin use)
 */
export function useClearInstagramCache() {
  return async (): Promise<void> => {
    const response = await fetch('/api/instagram/clear-cache', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to clear Instagram cache: ${response.statusText}`);
    }
  };
}
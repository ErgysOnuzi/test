import { useQuery } from "@tanstack/react-query";
import { adminAuth } from "@/lib/adminAuth";

interface AdminUser {
  email: string;
  username: string;
}

interface AdminAuthResponse {
  authenticated: boolean;
  user: AdminUser | null;
}

export function useAuth() {
  const { data: authData, isLoading, refetch } = useQuery<AdminAuthResponse>({
    queryKey: ["/api/admin/session"],
    queryFn: async () => {
      const token = adminAuth.getToken();
      if (!token) {
        return { authenticated: false, user: null };
      }

      const response = await fetch('/api/admin/session', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        adminAuth.clearToken();
        return { authenticated: false, user: null };
      }
      
      return response.json();
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    user: authData?.user || null,
    isLoading,
    isAuthenticated: authData?.authenticated || false,
    refetch, // Allow manual refresh of auth status
  };
}
import { useQuery } from "@tanstack/react-query";

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
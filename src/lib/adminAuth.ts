// SECURITY: Session cookie-based authentication - all validation handled server-side

export const adminAuth = {
  async login(identifier: string, password: string): Promise<{ success: boolean; redirectTo?: string }> {
    // SECURITY: Send credentials to server for validation only - no client-side credential checking
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include cookies in request
        body: JSON.stringify({ identifier, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Session cookie is now set by server automatically
        return { success: true, redirectTo: data.redirectTo };
      }
      return { success: false };
    } catch {
      return { success: false }; // SECURITY: No fallback to local auth
    }
  },

  async checkAuth(): Promise<boolean> {
    // SECURITY: Always verify with server using session cookies
    try {
      const response = await fetch('/api/admin/session', {
        credentials: 'include' // Include cookies in request
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.authenticated;
      } else {
        return false;
      }
    } catch {
      return false; // SECURITY: No fallback to local auth
    }
  },

  async refresh(): Promise<{ success: boolean; csrfToken?: string }> {
    try {
      const response = await fetch('/api/admin/refresh', {
        method: 'POST',
        credentials: 'include' // Include cookies in request
      });
      
      if (response.ok) {
        const data = await response.json();
        return { success: true, csrfToken: data.csrfToken };
      }
      return { success: false };
    } catch {
      return { success: false };
    }
  },

  async logout(): Promise<void> {
    try {
      await fetch('/api/admin/logout', { 
        method: 'POST',
        credentials: 'include' // Include cookies in request
      });
    } catch {
      // Silent fail
    }
  },

  async getCSRFToken(): Promise<string | null> {
    try {
      const response = await fetch('/api/admin/csrf', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.csrfToken;
      }
      return null;
    } catch {
      return null;
    }
  }
};
// SECURITY: Token-based authentication - all validation handled server-side
const AUTH_STORAGE_KEY = 'la_cantina_admin_token';

export const adminAuth = {
  async login(identifier: string, password: string): Promise<boolean> {
    // SECURITY: Send credentials to server for validation only - no client-side credential checking
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store authentication token in localStorage only after server confirms
        if (typeof window !== 'undefined' && data.token) {
          localStorage.setItem(AUTH_STORAGE_KEY, data.token);
        }
        return true;
      }
      return false;
    } catch {
      return false; // SECURITY: No fallback to local auth
    }
  },

  async checkAuth(): Promise<boolean> {
    // SECURITY: Always verify with server using stored token
    try {
      const token = this.getToken();
      if (!token) return false;

      const response = await fetch('/api/admin/session', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.authenticated;
      } else {
        // Clear invalid token
        this.clearToken();
        return false;
      }
    } catch {
      return false; // SECURITY: No fallback to local auth
    }
  },

  async logout(): Promise<void> {
    const token = this.getToken();
    
    try {
      if (token) {
        await fetch('/api/admin/logout', { 
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch {
      // Silent fail
    } finally {
      this.clearToken();
    }
  },

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(AUTH_STORAGE_KEY);
    }
    return null;
  },

  clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }
};
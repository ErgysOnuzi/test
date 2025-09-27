// SECURITY: NO hardcoded credentials - all authentication handled server-side
const AUTH_STORAGE_KEY = 'la_cantina_admin_auth';

export const adminAuth = {
  async login(password: string): Promise<boolean> {
    // SECURITY: Send password to server for validation only - no client-side password checking
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        // Store authentication status in localStorage only after server confirms
        if (typeof window !== 'undefined') {
          localStorage.setItem(AUTH_STORAGE_KEY, 'authenticated');
        }
        return true;
      }
      return false;
    } catch {
      return false; // SECURITY: No fallback to local auth
    }
  },

  async checkAuth(): Promise<boolean> {
    // SECURITY: Always verify with server - no client-side auth fallbacks
    try {
      const response = await fetch('/api/admin/session');
      if (response.ok) {
        // Only update localStorage if server confirms authentication
        if (typeof window !== 'undefined') {
          localStorage.setItem(AUTH_STORAGE_KEY, 'authenticated');
        }
        return true;
      } else {
        // Clear localStorage if server says we're not authenticated
        if (typeof window !== 'undefined') {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
        return false;
      }
    } catch {
      return false; // SECURITY: No fallback to local auth
    }
  },

  async logout(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }

    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {
      // Silent fail
    }
  },
};

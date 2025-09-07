import { User } from '@/types';

/**
 * Utility functions for localStorage operations with error handling
 */

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  CURRENT_USER: 'currentUser',
  USER_PREFERENCES: 'userPreferences',
} as const;

/**
 * Safely get item from localStorage
 */
export function getStorageItem(key: string): string | null {
  try {
    if (typeof window === 'undefined') {
      return null;
    }
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Error getting item from localStorage: ${key}`, error);
    return null;
  }
}

/**
 * Safely set item in localStorage
 */
export function setStorageItem(key: string, value: string): boolean {
  try {
    if (typeof window === 'undefined') {
      return false;
    }
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error(`Error setting item in localStorage: ${key}`, error);
    return false;
  }
}

/**
 * Safely remove item from localStorage
 */
export function removeStorageItem(key: string): boolean {
  try {
    if (typeof window === 'undefined') {
      return false;
    }
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing item from localStorage: ${key}`, error);
    return false;
  }
}

/**
 * Safely get and parse JSON from localStorage
 */
export function getStorageJSON<T>(key: string): T | null {
  try {
    const item = getStorageItem(key);
    if (!item) {
      return null;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error parsing JSON from localStorage: ${key}`, error);
    return null;
  }
}

/**
 * Safely stringify and set JSON in localStorage
 */
export function setStorageJSON<T>(key: string, value: T): boolean {
  try {
    const jsonString = JSON.stringify(value);
    return setStorageItem(key, jsonString);
  } catch (error) {
    console.error(`Error stringifying JSON for localStorage: ${key}`, error);
    return false;
  }
}

/**
 * Clear all authentication-related data from localStorage
 */
export function clearAuthStorage(): void {
  removeStorageItem(STORAGE_KEYS.AUTH_TOKEN);
  removeStorageItem(STORAGE_KEYS.REFRESH_TOKEN);
  removeStorageItem(STORAGE_KEYS.CURRENT_USER);
}

/**
 * Authentication-specific localStorage utilities
 */
export const authStorage = {
  // Token operations
  getToken(): string | null {
    return getStorageItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  setToken(token: string): boolean {
    return setStorageItem(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  removeToken(): boolean {
    return removeStorageItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  // Refresh token operations
  getRefreshToken(): string | null {
    return getStorageItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  setRefreshToken(token: string): boolean {
    return setStorageItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  },

  removeRefreshToken(): boolean {
    return removeStorageItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  // User operations
  getUser(): User | null {
    return getStorageJSON<User>(STORAGE_KEYS.CURRENT_USER);
  },

  setUser(user: User): boolean {
    return setStorageJSON(STORAGE_KEYS.CURRENT_USER, user);
  },

  removeUser(): boolean {
    return removeStorageItem(STORAGE_KEYS.CURRENT_USER);
  },

  // Clear all auth data
  clearAll(): void {
    clearAuthStorage();
  },

  // Check if user is authenticated (has token and user data)
  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  },
};

/**
 * Check if localStorage is available
 */
export function isLocalStorageAvailable(): boolean {
  try {
    if (typeof window === 'undefined') {
      return false;
    }
    
    const testKey = '__localStorage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get storage usage information
 */
export function getStorageInfo(): {
  isAvailable: boolean;
  usedSpace?: number;
  totalSpace?: number;
} {
  if (!isLocalStorageAvailable()) {
    return { isAvailable: false };
  }

  try {
    let usedSpace = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        usedSpace += localStorage[key].length + key.length;
      }
    }

    return {
      isAvailable: true,
      usedSpace,
      // Most browsers have a 5-10MB limit for localStorage
      totalSpace: 5 * 1024 * 1024, // 5MB estimate
    };
  } catch (error) {
    console.error('Error getting storage info:', error);
    return { isAvailable: true };
  }
}
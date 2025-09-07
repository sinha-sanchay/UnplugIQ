import axios from 'axios';
import { AuthService } from '@/services/authService';
import { authStorage } from './localStorage';

/**
 * Token refresh utilities for automatic token management
 */

// Token refresh configuration
const TOKEN_REFRESH_CONFIG = {
  // Refresh token when it expires in less than 5 minutes
  REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutes in milliseconds
  // Maximum number of retry attempts
  MAX_RETRY_ATTEMPTS: 3,
  // Delay between retry attempts
  RETRY_DELAY: 1000, // 1 second
};

/**
 * Check if token needs to be refreshed
 */
export function shouldRefreshToken(): boolean {
  const token = authStorage.getToken();
  if (!token) return false;

  try {
    // Parse JWT token to get expiration
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;

    // Refresh if token expires within the threshold
    return timeUntilExpiration <= TOKEN_REFRESH_CONFIG.REFRESH_THRESHOLD;
  } catch (error) {
    console.error('Error parsing token for refresh check:', error);
    return true; // If we can't parse the token, assume it needs refresh
  }
}

/**
 * Get time until token expiration in milliseconds
 */
export function getTimeUntilTokenExpiration(): number | null {
  const token = authStorage.getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000;
    const currentTime = Date.now();
    return Math.max(0, expirationTime - currentTime);
  } catch (error) {
    console.error('Error calculating token expiration time:', error);
    return null;
  }
}

/**
 * Refresh token with retry logic
 */
export async function refreshTokenWithRetry(
  retryCount: number = 0
): Promise<string | null> {
  try {
    const newToken = await AuthService.refreshToken();
    return newToken;
  } catch (error) {
    console.error(`Token refresh attempt ${retryCount + 1} failed:`, error);

    // If we haven't exceeded max retries, try again
    if (retryCount < TOKEN_REFRESH_CONFIG.MAX_RETRY_ATTEMPTS - 1) {
      await new Promise(resolve => 
        setTimeout(resolve, TOKEN_REFRESH_CONFIG.RETRY_DELAY * (retryCount + 1))
      );
      return refreshTokenWithRetry(retryCount + 1);
    }

    // All retry attempts failed
    console.error('All token refresh attempts failed');
    return null;
  }
}

/**
 * Set up automatic token refresh interval
 */
export function setupTokenRefreshInterval(
  onTokenRefreshed?: (token: string) => void,
  onRefreshFailed?: () => void
): () => void {
  let intervalId: NodeJS.Timeout;

  const checkAndRefreshToken = async () => {
    if (!authStorage.isAuthenticated()) {
      return;
    }

    if (shouldRefreshToken()) {
      try {
        const newToken = await refreshTokenWithRetry();
        if (newToken) {
          onTokenRefreshed?.(newToken);
        } else {
          onRefreshFailed?.();
        }
      } catch (error) {
        console.error('Token refresh failed:', error);
        onRefreshFailed?.();
      }
    }
  };

  // Check immediately
  checkAndRefreshToken();

  // Set up interval to check every minute
  intervalId = setInterval(checkAndRefreshToken, 60 * 1000);

  // Return cleanup function
  return () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };
}

/**
 * Create a token refresh interceptor for axios
 */
export function createTokenRefreshInterceptor() {
  return {
    request: async (config: any) => {
      // Check if token needs refresh before making request
      if (shouldRefreshToken()) {
        try {
          await refreshTokenWithRetry();
        } catch (error) {
          console.error('Failed to refresh token before request:', error);
          // Continue with the request anyway - let the response interceptor handle it
        }
      }
      return config;
    },

    response: {
      success: (response: any) => response,
      error: async (error: any) => {
        const originalRequest = error.config;

        // If we get a 401 and haven't already tried to refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newToken = await refreshTokenWithRetry();
            if (newToken) {
              // Update the authorization header and retry the request
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return axios(originalRequest);
            }
          } catch (refreshError) {
            console.error('Token refresh failed during error handling:', refreshError);
            // Clear auth data and redirect to login
            authStorage.clearAll();
            window.location.href = '/login';
          }
        }

        return Promise.reject(error);
      },
    },
  };
}
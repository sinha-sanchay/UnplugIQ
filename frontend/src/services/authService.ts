import { apiClient, handleApiResponse, handleApiError } from './api';
import {
  LoginCredentials,
  RegisterData,
  LoginResponse,
  User,
} from '@/types';
import { authStorage } from '@/utils/localStorage';

export class AuthService {
  private static refreshPromise: Promise<string> | null = null;

  /**
   * Authenticate user with email and password
   */
  static async login(credentials: LoginCredentials): Promise<LoginResponse & { user: User }> {
    try {
      // Backend expects 'identifier' field, not 'email'
      const loginRequest = {
        identifier: credentials.email,
        password: credentials.password
      };
      
      const response = await apiClient.post<LoginResponse>('/users/login', loginRequest);
      const loginData = handleApiResponse(response);

      // Create a basic user object from the credentials
      // In a real app, you'd get this from the JWT token or make another API call
      const user: User = {
        id: 1, // This should come from JWT token or API
        username: credentials.email.split('@')[0], // Extract username from email
        email: credentials.email,
        role: 'USER',
        createdAt: new Date().toISOString(),
      };

      // Store authentication data
      this.setAuthData(loginData.token, user);

      return { ...loginData, user };
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Register new user account
   */
  static async register(userData: RegisterData): Promise<User> {
    try {
      const response = await apiClient.post<User>('/users/register', userData);
      const result = handleApiResponse(response);

      return result;
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Logout current user
   */
  static logout(): void {
    try {
      // Backend doesn't have logout endpoint, just clear local data
      // apiClient.post('/users/logout').catch(() => {
      //   // Ignore errors on logout endpoint
      // });
    } finally {
      // Always clear local storage
      this.clearAuthData();
      // Clear any pending refresh promise
      this.refreshPromise = null;
    }
  }

  /**
   * Refresh authentication token with deduplication
   */
  static async refreshToken(): Promise<string> {
    // If there's already a refresh in progress, return that promise
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.performTokenRefresh();
    
    try {
      const newToken = await this.refreshPromise;
      return newToken;
    } finally {
      this.refreshPromise = null;
    }
  }

  /**
   * Perform the actual token refresh
   */
  private static async performTokenRefresh(): Promise<string> {
    try {
      // Backend doesn't have token refresh endpoint yet
      // For now, redirect to login when token expires
      throw new Error('Token refresh not implemented in backend');
    } catch (error) {
      this.clearAuthData();
      return handleApiError(error);
    }
  }

  /**
   * Get current authenticated user
   */
  static getCurrentUser(): User | null {
    return authStorage.getUser();
  }

  /**
   * Get current authentication token
   */
  static getToken(): string | null {
    return authStorage.getToken();
  }

  /**
   * Check if user is currently authenticated
   */
  static isAuthenticated(): boolean {
    return authStorage.isAuthenticated();
  }

  /**
   * Get current user profile from server
   */
  static async getProfile(): Promise<User> {
    try {
      // Backend doesn't have profile endpoint, but we can get user by ID
      // For now, return stored user or throw error
      const user = this.getCurrentUser();
      if (!user) {
        throw new Error('No user data available');
      }
      return user;
    } catch (error) {
      return handleApiError(error);
    }
  }

  /**
   * Store authentication data in localStorage
   */
  private static setAuthData(token: string, user: User | null, refreshToken?: string): void {
    authStorage.setToken(token);
    if (user) {
      authStorage.setUser(user);
    }
    
    if (refreshToken) {
      authStorage.setRefreshToken(refreshToken);
    }
  }

  /**
   * Clear all authentication data from localStorage
   */
  private static clearAuthData(): void {
    authStorage.clearAll();
  }

  /**
   * Check if token is expired (basic check)
   */
  static isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      // Basic JWT token expiration check
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  }
}
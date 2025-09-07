import { useAuthContext } from '@/context/AuthContext';
import { LoginCredentials, RegisterData } from '@/types';

/**
 * Custom hook for authentication operations
 * Provides a clean interface to authentication context
 */
export function useAuth() {
  const { state, login, register, logout, clearError } = useAuthContext();

  return {
    // State
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,

    // Actions
    login: async (credentials: LoginCredentials): Promise<void> => {
      await login(credentials);
    },

    register: async (userData: RegisterData): Promise<void> => {
      await register(userData);
    },

    logout: (): void => {
      logout();
    },

    clearError: (): void => {
      clearError();
    },

    // Computed properties
    isLoggedIn: state.isAuthenticated && !!state.user,
    hasError: !!state.error,
    
    // User info helpers
    getUserId: (): number | null => state.user?.id ?? null,
    getUsername: (): string | null => state.user?.username ?? null,
    getUserEmail: (): string | null => state.user?.email ?? null,
    getUserRole: (): string | null => state.user?.role ?? null,
  };
}
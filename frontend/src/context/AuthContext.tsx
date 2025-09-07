import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AuthState, AuthContextType, AuthAction } from '@/types';
import { AuthService } from '@/services/authService';
import { LoginCredentials, RegisterData } from '@/types';

// Initial authentication state
const initialAuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading to check existing auth
  error: null,
};

// Authentication reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component props
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // Initialize authentication state on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = AuthService.getToken();
        const user = AuthService.getCurrentUser();

        if (token && user && !AuthService.isTokenExpired()) {
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user, token },
          });
        } else {
          // Clear any stale data
          AuthService.logout();
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        AuthService.logout();
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeAuth();
  }, []);

  // Set up automatic token refresh
  useEffect(() => {
    let refreshInterval: NodeJS.Timeout;

    if (state.isAuthenticated && state.token) {
      // Check token expiration every 5 minutes
      refreshInterval = setInterval(async () => {
        try {
          if (AuthService.isTokenExpired()) {
            const newToken = await AuthService.refreshToken();
            const user = AuthService.getCurrentUser();
            
            if (user) {
              dispatch({
                type: 'LOGIN_SUCCESS',
                payload: { user, token: newToken },
              });
            }
          }
        } catch (error) {
          console.error('Token refresh failed:', error);
          logout();
        }
      }, 5 * 60 * 1000); // 5 minutes
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [state.isAuthenticated, state.token]);

  // Login function
  const login = async (credentials: LoginCredentials): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const loginResponse = await AuthService.login(credentials);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: loginResponse.user,
          token: loginResponse.token,
        },
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: errorMessage,
      });
      throw error;
    }
  };

  // Register function
  const register = async (userData: RegisterData): Promise<void> => {
    dispatch({ type: 'REGISTER_START' });

    try {
      await AuthService.register(userData);
      
      // After successful registration, log the user in
      const loginResponse = await AuthService.login({
        email: userData.email,
        password: userData.password,
      });

      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: {
          user: loginResponse.user,
          token: loginResponse.token,
        },
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      dispatch({
        type: 'REGISTER_FAILURE',
        payload: errorMessage,
      });
      throw error;
    }
  };

  // Logout function
  const logout = (): void => {
    AuthService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  // Clear error function
  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const contextValue: AuthContextType = {
    state,
    login,
    register,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  
  return context;
}
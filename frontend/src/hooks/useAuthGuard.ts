import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';

/**
 * Configuration options for the auth guard
 */
interface UseAuthGuardOptions {
  /** Redirect path for unauthenticated users */
  redirectTo?: string;
  /** Whether to redirect immediately or wait for loading to complete */
  immediate?: boolean;
  /** Custom condition function for access control */
  condition?: (user: any) => boolean;
}

/**
 * Custom hook for protecting routes and components that require authentication
 * 
 * @param options Configuration options for the auth guard
 * @returns Object with authentication status and helper functions
 */
export function useAuthGuard(options: UseAuthGuardOptions = {}) {
  const {
    redirectTo = '/login',
    immediate = false,
    condition,
  } = options;

  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user meets custom condition (if provided)
  const meetsCondition = condition ? condition(user) : true;
  
  // Determine if access should be granted
  const hasAccess = isAuthenticated && meetsCondition;

  useEffect(() => {
    // Don't redirect while still loading authentication state
    if (isLoading && !immediate) {
      return;
    }

    // Redirect if user doesn't have access
    if (!hasAccess && !isLoading) {
      // Store the attempted location for redirect after login
      const from = location.pathname + location.search;
      navigate(redirectTo, { 
        replace: true,
        state: { from: from !== redirectTo ? from : undefined }
      });
    }
  }, [isAuthenticated, isLoading, hasAccess, navigate, redirectTo, location, immediate]);

  return {
    /** Whether the user is authenticated */
    isAuthenticated,
    
    /** Whether authentication is still loading */
    isLoading,
    
    /** Whether the user has access (authenticated + meets conditions) */
    hasAccess,
    
    /** Whether to show loading state */
    shouldShowLoading: isLoading && !immediate,
    
    /** Whether to show the protected content */
    shouldShowContent: hasAccess && !isLoading,
    
    /** Current user object */
    user,
    
    /** Function to manually trigger redirect */
    redirectToLogin: () => {
      const from = location.pathname + location.search;
      navigate(redirectTo, { 
        replace: true,
        state: { from: from !== redirectTo ? from : undefined }
      });
    },
  };
}

/**
 * Hook for protecting routes that require specific user roles
 * 
 * @param allowedRoles Array of roles that can access the route
 * @param options Additional auth guard options
 */
export function useRoleGuard(
  allowedRoles: string[],
  options: Omit<UseAuthGuardOptions, 'condition'> = {}
) {
  return useAuthGuard({
    ...options,
    condition: (user) => {
      if (!user || !user.role) return false;
      return allowedRoles.includes(user.role);
    },
  });
}

/**
 * Hook for components that should only be visible to unauthenticated users
 * (e.g., login, register pages)
 * 
 * @param redirectTo Where to redirect authenticated users
 */
export function useGuestGuard(redirectTo: string = '/dashboard') {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      // Check if there's a redirect location from previous auth guard
      const from = location.state?.from;
      navigate(from || redirectTo, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo, location]);

  return {
    /** Whether the user is authenticated */
    isAuthenticated,
    
    /** Whether authentication is still loading */
    isLoading,
    
    /** Whether to show the guest content */
    shouldShowContent: !isAuthenticated && !isLoading,
    
    /** Whether to show loading state */
    shouldShowLoading: isLoading,
  };
}
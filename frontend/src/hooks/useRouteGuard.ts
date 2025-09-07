import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';
import { useNavigation } from './useNavigation';
import { isProtectedRoute, isAuthRoute } from '../utils/routes';

/**
 * Custom hook for route protection logic
 * Handles automatic redirects based on authentication state
 */
export const useRouteGuard = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { currentPath, goToDashboard, goToLogin } = useNavigation();
  const location = useLocation();

  useEffect(() => {
    // Don't redirect while authentication is loading
    if (isLoading) return;

    // If user is authenticated and on auth pages, redirect to dashboard
    if (isAuthenticated && isAuthRoute(currentPath)) {
      goToDashboard();
      return;
    }

    // If user is not authenticated and on protected route, redirect to login
    if (!isAuthenticated && isProtectedRoute(currentPath)) {
      goToLogin();
      return;
    }
  }, [isAuthenticated, isLoading, currentPath, location.state, goToDashboard, goToLogin]);

  return {
    isAuthenticated,
    isLoading,
    currentPath,
    isProtectedRoute: isProtectedRoute(currentPath),
    isAuthRoute: isAuthRoute(currentPath),
  };
};
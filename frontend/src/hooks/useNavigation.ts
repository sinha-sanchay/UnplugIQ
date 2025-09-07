import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES, createChallengeDetailPath } from '../utils/routes';

/**
 * Custom hook for navigation utilities
 * Provides convenient navigation methods
 */
export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    // Navigation methods
    goToDashboard: () => navigate(ROUTES.DASHBOARD),
    goToChallenges: () => navigate(ROUTES.CHALLENGES),
    goToProfile: () => navigate(ROUTES.PROFILE),
    goToLogin: () => navigate(ROUTES.LOGIN),
    goToRegister: () => navigate(ROUTES.REGISTER),
    goToChallengeDetail: (id: number | string) => navigate(createChallengeDetailPath(id)),
    
    // Navigation with state
    goToLoginWithRedirect: (redirectTo?: string) => {
      navigate(ROUTES.LOGIN, { 
        state: { from: redirectTo || location.pathname } 
      });
    },
    
    // Go back
    goBack: () => navigate(-1),
    
    // Replace current route
    replaceTo: (path: string) => navigate(path, { replace: true }),
    
    // Current location info
    currentPath: location.pathname,
    currentSearch: location.search,
    currentState: location.state,
    
    // Route checking utilities
    isCurrentRoute: (path: string) => location.pathname === path,
    isRouteActive: (path: string) => location.pathname.startsWith(path),
  };
};
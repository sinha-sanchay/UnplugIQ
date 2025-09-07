// Route constants and navigation utilities

export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Protected routes
  DASHBOARD: '/dashboard',
  CHALLENGES: '/challenges',
  CHALLENGE_DETAIL: '/challenges/:id',
  PROFILE: '/profile',
  SUBMISSION_HISTORY: '/profile/submissions',
  
  // Error routes
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/unauthorized'
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];

// Navigation utilities
export const createChallengeDetailPath = (id: number | string): string => {
  return `/challenges/${id}`;
};

export const isAuthRoute = (pathname: string): boolean => {
  return pathname === ROUTES.LOGIN || pathname === ROUTES.REGISTER;
};

export const isProtectedRoute = (pathname: string): boolean => {
  const protectedPaths = [
    ROUTES.DASHBOARD,
    ROUTES.CHALLENGES,
    ROUTES.PROFILE,
    ROUTES.SUBMISSION_HISTORY
  ];
  
  return protectedPaths.some(path => pathname.startsWith(path.split(':')[0]));
};

// Route metadata for navigation
export interface RouteMetadata {
  path: string;
  title: string;
  requiresAuth: boolean;
  showInNavigation: boolean;
}

export const ROUTE_METADATA: Record<string, RouteMetadata> = {
  dashboard: {
    path: ROUTES.DASHBOARD,
    title: 'Dashboard',
    requiresAuth: true,
    showInNavigation: true
  },
  challenges: {
    path: ROUTES.CHALLENGES,
    title: 'Challenges',
    requiresAuth: true,
    showInNavigation: true
  },
  profile: {
    path: ROUTES.PROFILE,
    title: 'Profile',
    requiresAuth: true,
    showInNavigation: true
  }
};
# Routing and Navigation Setup

This directory contains the routing configuration and navigation utilities for the React frontend application.

## Files Overview

### `AppRouter.tsx`
Main application router component that defines all routes with lazy loading and authentication guards.

**Features:**
- Route-based code splitting with React.lazy()
- Authentication protection for private routes
- Automatic redirects for authenticated users on auth pages
- 404 handling with catch-all route
- Loading states during route transitions

### `LazyRoutes.tsx`
Exports lazy-loaded page components for code splitting optimization.

**Benefits:**
- Reduces initial bundle size
- Improves application startup performance
- Loads page components only when needed

### `routes/utils.ts`
Route constants, utilities, and navigation helpers.

**Exports:**
- `ROUTES`: Object containing all route paths
- `createChallengeDetailPath()`: Helper for dynamic challenge routes
- `isAuthRoute()`: Checks if path is an authentication route
- `isProtectedRoute()`: Checks if path requires authentication
- `ROUTE_METADATA`: Route information for navigation menus

## Components

### `AuthGuard`
Higher-order component that protects routes requiring authentication.

**Features:**
- Redirects unauthenticated users to login
- Preserves intended destination for post-login redirect
- Shows loading spinner during authentication check
- Customizable fallback component

### `LoadingSpinner`
Reusable loading indicator component with size variants.

## Hooks

### `useNavigation`
Custom hook providing navigation utilities and current location info.

**Methods:**
- `goToDashboard()`, `goToChallenges()`, `goToProfile()`
- `goToLogin()`, `goToRegister()`
- `goToChallengeDetail(id)`
- `goBack()`, `replaceTo(path)`
- `goToLoginWithRedirect()`

**Properties:**
- `currentPath`, `currentSearch`, `currentState`
- `isCurrentRoute(path)`, `isRouteActive(path)`

### `useRouteGuard`
Custom hook for automatic route protection and redirects.

**Features:**
- Redirects authenticated users away from auth pages
- Redirects unauthenticated users away from protected pages
- Handles loading states during authentication checks

## Route Structure

```
/ (redirects to /dashboard)
├── /login (public)
├── /register (public)
├── /dashboard (protected)
├── /challenges (protected)
├── /challenges/:id (protected)
├── /profile (protected)
├── /unauthorized (public)
├── /404 (public)
└── * (redirects to /404)
```

## Usage Examples

### Basic Navigation
```tsx
import { useNavigation } from '../hooks/useNavigation';

const MyComponent = () => {
  const { goToChallenges, goToChallengeDetail } = useNavigation();
  
  return (
    <div>
      <button onClick={() => goToChallenges()}>
        View Challenges
      </button>
      <button onClick={() => goToChallengeDetail(123)}>
        View Challenge 123
      </button>
    </div>
  );
};
```

### Route Protection
```tsx
import AuthGuard from '../components/common/AuthGuard';

const ProtectedPage = () => (
  <AuthGuard>
    <div>This content is only visible to authenticated users</div>
  </AuthGuard>
);
```

### Route Constants
```tsx
import { ROUTES } from '../utils/routes';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
    <Link to={ROUTES.CHALLENGES}>Challenges</Link>
    <Link to={ROUTES.PROFILE}>Profile</Link>
  </nav>
);
```

## Testing

The routing utilities are tested in `src/test/routing.test.tsx` with coverage for:
- Route constant values
- Dynamic path generation
- Route type identification (auth vs protected)
- Navigation utilities

## Integration

The routing system integrates with:
- **AuthContext**: For authentication state management
- **AppContext**: For application state management
- **Vite**: For build-time code splitting
- **React Router v6**: For client-side routing

## Performance Considerations

- **Code Splitting**: Each page is lazy-loaded to reduce initial bundle size
- **Route Guards**: Efficient authentication checks prevent unnecessary renders
- **Memoization**: Navigation utilities use useCallback for performance
- **Bundle Analysis**: Regular monitoring of route-based chunks

## Security

- **Route Protection**: AuthGuard prevents unauthorized access
- **Token Validation**: Automatic token refresh and expiration handling
- **Redirect Prevention**: Secure handling of post-login redirects
- **State Preservation**: Safe handling of navigation state
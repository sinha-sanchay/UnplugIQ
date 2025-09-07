# Authentication Context and State Management

This module provides a comprehensive authentication system for the React frontend application, including context management, custom hooks, and utilities for token handling.

## Features

- **AuthContext**: React context for managing authentication state
- **Custom Hooks**: Easy-to-use hooks for authentication operations
- **Route Guards**: Protect routes based on authentication status and user roles
- **Automatic Token Refresh**: Handle token expiration automatically
- **localStorage Integration**: Persist authentication data securely
- **Error Handling**: Comprehensive error management for auth operations

## Quick Start

### 1. Wrap your app with AuthProvider

```tsx
import { AuthProvider } from '@/context/AuthContext';

function App() {
  return (
    <AuthProvider>
      {/* Your app components */}
    </AuthProvider>
  );
}
```

### 2. Use authentication in components

```tsx
import { useAuth } from '@/hooks/useAuth';

function LoginForm() {
  const { login, isLoading, error } = useAuth();

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      // User is now logged in
    } catch (error) {
      // Error is handled by context
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Form fields */}
      {error && <div>{error}</div>}
      <button disabled={isLoading}>Login</button>
    </form>
  );
}
```

### 3. Protect routes with guards

```tsx
import { useAuthGuard } from '@/hooks/useAuthGuard';

function ProtectedPage() {
  const { shouldShowContent, shouldShowLoading } = useAuthGuard();

  if (shouldShowLoading) return <div>Loading...</div>;
  if (!shouldShowContent) return null; // Will redirect

  return <div>Protected content</div>;
}
```

## API Reference

### AuthContext

The main context that manages authentication state.

#### State Properties

- `user: User | null` - Current authenticated user
- `token: string | null` - JWT authentication token
- `isAuthenticated: boolean` - Whether user is authenticated
- `isLoading: boolean` - Whether auth operation is in progress
- `error: string | null` - Current error message

#### Actions

- `login(credentials: LoginCredentials): Promise<void>` - Authenticate user
- `register(userData: RegisterData): Promise<void>` - Register new user
- `logout(): void` - Log out current user
- `clearError(): void` - Clear current error

### useAuth Hook

Provides easy access to authentication state and actions.

```tsx
const {
  // State
  user,
  token,
  isAuthenticated,
  isLoading,
  error,
  
  // Actions
  login,
  register,
  logout,
  clearError,
  
  // Computed properties
  isLoggedIn,
  hasError,
  
  // User info helpers
  getUserId,
  getUsername,
  getUserEmail,
  getUserRole,
} = useAuth();
```

### useAuthGuard Hook

Protects components and routes that require authentication.

```tsx
const {
  isAuthenticated,
  isLoading,
  hasAccess,
  shouldShowLoading,
  shouldShowContent,
  user,
  redirectToLogin,
} = useAuthGuard({
  redirectTo: '/login',        // Where to redirect unauthenticated users
  immediate: false,            // Whether to redirect immediately
  condition: (user) => true,   // Custom access condition
});
```

### useRoleGuard Hook

Protects components based on user roles.

```tsx
const guardResult = useRoleGuard(['admin', 'moderator'], {
  redirectTo: '/dashboard',
});
```

### useGuestGuard Hook

For components that should only be visible to unauthenticated users (login, register pages).

```tsx
const {
  isAuthenticated,
  isLoading,
  shouldShowContent,
  shouldShowLoading,
} = useGuestGuard('/dashboard');
```

## localStorage Utilities

The `authStorage` utility provides safe localStorage operations:

```tsx
import { authStorage } from '@/utils/localStorage';

// Token operations
authStorage.getToken();
authStorage.setToken(token);
authStorage.removeToken();

// User operations
authStorage.getUser();
authStorage.setUser(user);
authStorage.removeUser();

// Refresh token operations
authStorage.getRefreshToken();
authStorage.setRefreshToken(token);
authStorage.removeRefreshToken();

// Clear all auth data
authStorage.clearAll();

// Check authentication status
authStorage.isAuthenticated();
```

## Token Refresh

The system automatically handles token refresh:

- Checks token expiration every 5 minutes
- Refreshes tokens before they expire
- Handles refresh failures gracefully
- Provides utilities for manual token management

```tsx
import { shouldRefreshToken, refreshTokenWithRetry } from '@/utils/tokenRefresh';

// Check if token needs refresh
if (shouldRefreshToken()) {
  await refreshTokenWithRetry();
}
```

## Error Handling

The authentication system provides comprehensive error handling:

- Network errors are caught and displayed to users
- Authentication failures show appropriate messages
- Token expiration is handled automatically
- Form validation errors are displayed inline

## Security Considerations

- JWT tokens are stored in localStorage (consider httpOnly cookies for production)
- Automatic token refresh prevents session expiration
- Sensitive operations require re-authentication
- All API calls include proper error handling

## Testing

The authentication system includes comprehensive tests:

```bash
npm test -- AuthContext.test.tsx
```

Tests cover:
- Initial authentication state
- Login/logout flows
- Registration process
- Error handling
- Token refresh
- Route protection

## Examples

See `src/examples/AuthExample.tsx` for a complete example of how to use the authentication system in a real application.
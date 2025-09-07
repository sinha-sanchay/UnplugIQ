import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginForm } from '@/components/forms';
import { AuthLayout } from '@/components/layout';
import { useAuth } from '@/hooks';
import { LoginFormData } from '@/types/forms';
import { ROUTES } from '@/utils/constants';

/**
 * Login page component with form integration and error handling
 */
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading, error, login, clearError } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || ROUTES.DASHBOARD;
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Clear any existing errors when component mounts
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, []);

  const handleLogin = async (formData: LoginFormData) => {
    try {
      await login({
        email: formData.email,
        password: formData.password,
      });
      
      // Navigation will be handled by the useEffect above
    } catch (error) {
      // Error is handled by the AuthContext and will be displayed in the form
      console.error('Login failed:', error);
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <AuthLayout>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '200px' 
        }}>
          <div>Loading...</div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to access your challenges"
    >
      <LoginForm
        onSubmit={handleLogin}
        isLoading={isLoading}
        error={error}
      />
    </AuthLayout>
  );
};

export default LoginPage;
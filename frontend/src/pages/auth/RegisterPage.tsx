import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RegisterForm } from '@/components/forms';
import { AuthLayout } from '@/components/layout';
import { useAuth } from '@/hooks';
import { RegisterData } from '@/types/api';
import { ROUTES } from '@/utils/constants';

/**
 * Register page component with form validation and success handling
 */
const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading, error, register, clearError } = useAuth();

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

  const handleRegister = async (formData: RegisterData) => {
    try {
      await register(formData);
      
      // Navigation will be handled by the useEffect above
    } catch (error) {
      // Error is handled by the AuthContext and will be displayed in the form
      console.error('Registration failed:', error);
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
      title="Join Us"
      subtitle="Create your account and start participating in challenges"
    >
      <RegisterForm
        onSubmit={handleRegister}
        isLoading={isLoading}
        error={error}
      />
    </AuthLayout>
  );
};

export default RegisterPage;
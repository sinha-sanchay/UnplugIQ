import React from 'react';
import { LoginFormData } from '@/types/forms';
import { useForm } from '@/hooks/useForm';
import { loginValidationRules } from '@/utils/validation';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import './LoginForm.css';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false, error }) => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm<LoginFormData>({
    initialValues: { email: '', password: '' },
    validationRules: loginValidationRules,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit} className="login-form" noValidate>
      <div className="login-form__header">
        <h2 className="login-form__title">Sign In</h2>
        <p className="login-form__subtitle">
          Welcome back! Please sign in to your account.
        </p>
      </div>

      {error && <div className="login-form__error">{error}</div>}

      <div className="login-form__fields">
        <Input
          type="email"
          label="Email Address"
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          error={touched.email ? errors.email : undefined}
          placeholder="Enter your email"
          fullWidth
          autoComplete="email"
          disabled={isSubmitting || isLoading}
          required
        />

        <Input
          type="password"
          label="Password"
          value={values.password}
          onChange={(e) => handleChange('password', e.target.value)}
          onBlur={() => handleBlur('password')}
          error={touched.password ? errors.password : undefined}
          placeholder="Enter your password"
          fullWidth
          autoComplete="current-password"
          disabled={isSubmitting || isLoading}
          required
        />
      </div>

      <div className="login-form__actions">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isSubmitting || isLoading}
          isLoading={isSubmitting || isLoading}
        >
          {isSubmitting || isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </div>

      <div className="login-form__footer">
        <p className="login-form__register-prompt">
          Don't have an account?{' '}
          <a href="/register" className="login-form__register-link">Sign up here</a>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;

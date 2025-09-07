import React from 'react';
import { RegisterFormData } from '@/types/forms';
import { useForm } from '@/hooks/useForm';
import { registerValidationRules, validateConfirmPassword } from '@/utils/validation';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import './RegisterForm.css';

interface RegisterFormProps {
  onSubmit: (data: { username: string; email: string; password: string }) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isLoading = false, error }) => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm<RegisterFormData>({
    initialValues: { username: '', email: '', password: '', confirmPassword: '' },
    validationRules: registerValidationRules,
    onSubmit: async (formData) => {
      const { confirmPassword, ...submitData } = formData;
      await onSubmit(submitData);
    },
  });

  const confirmPasswordError = touched.confirmPassword
    ? validateConfirmPassword(values.confirmPassword, values.password) || undefined
    : undefined;

  return (
    <form onSubmit={handleSubmit} className="register-form" noValidate>
      <div className="register-form__header">
        <h2 className="register-form__title">Create Account</h2>
        <p className="register-form__subtitle">
          Join our platform and start participating in challenges!
        </p>
      </div>

      {error && <div className="register-form__error">{error}</div>}

      <div className="register-form__fields">
        <Input
          type="text"
          label="Username"
          value={values.username}
          onChange={(e) => handleChange('username', e.target.value)}
          onBlur={() => handleBlur('username')}
          error={touched.username ? errors.username : undefined}
          placeholder="Choose a username"
          fullWidth
          autoComplete="username"
          disabled={isSubmitting || isLoading}
          helperText="3-50 characters, letters, numbers, underscores, and hyphens only"
          required
        />

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
          placeholder="Create a password"
          fullWidth
          autoComplete="new-password"
          disabled={isSubmitting || isLoading}
          helperText="At least 6 characters with uppercase, lowercase, and number"
          required
        />

        <Input
          type="password"
          label="Confirm Password"
          value={values.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          onBlur={() => handleBlur('confirmPassword')}
          error={confirmPasswordError}
          placeholder="Confirm your password"
          fullWidth
          autoComplete="new-password"
          disabled={isSubmitting || isLoading}
          required
        />
      </div>

      <div className="register-form__actions">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isSubmitting || isLoading || !!confirmPasswordError}
          isLoading={isSubmitting || isLoading}
        >
          {isSubmitting || isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </div>

      <div className="register-form__footer">
        <p className="register-form__login-prompt">
          Already have an account?{' '}
          <a href="/login" className="register-form__login-link">Sign in here</a>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;

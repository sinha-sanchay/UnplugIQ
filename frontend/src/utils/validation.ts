import { VALIDATION } from './constants';
import { FormErrors, ValidationRule, ValidationRules } from '@/types/forms';

/**
 * Validate a single field based on validation rules
 */
export function validateField(value: string, rules: ValidationRule): string | null {
  // Required validation
  if (rules.required && (!value || value.trim() === '')) {
    return 'This field is required';
  }

  // Skip other validations if field is empty and not required
  if (!value || value.trim() === '') {
    return null;
  }

  // Min length validation
  if (rules.minLength && value.length < rules.minLength) {
    return `Must be at least ${rules.minLength} characters`;
  }

  // Max length validation
  if (rules.maxLength && value.length > rules.maxLength) {
    return `Must be no more than ${rules.maxLength} characters`;
  }

  // Pattern validation
  if (rules.pattern && !rules.pattern.test(value)) {
    return 'Invalid format';
  }

  // Custom validation
  if (rules.custom) {
    return rules.custom(value);
  }

  return null;
}

/**
 * Validate all fields in a form based on validation rules
 */
export function validateForm<T extends Record<string, string>>(
  values: T,
  rules: ValidationRules
): FormErrors {
  const errors: FormErrors = {};

  Object.keys(rules).forEach((fieldName) => {
    const value = values[fieldName] || '';
    const fieldRules = rules[fieldName];
    const error = validateField(value, fieldRules);
    
    if (error) {
      errors[fieldName] = error;
    }
  });

  return errors;
}

/**
 * Validation rules for login form
 */
export const loginValidationRules: ValidationRules = {
  email: {
    required: true,
    pattern: VALIDATION.EMAIL_REGEX,
    custom: (value: string) => {
      if (!VALIDATION.EMAIL_REGEX.test(value)) {
        return 'Please enter a valid email address';
      }
      return null;
    },
  },
  password: {
    required: true,
    minLength: VALIDATION.PASSWORD_MIN_LENGTH,
  },
};

/**
 * Validation rules for registration form
 */
export const registerValidationRules: ValidationRules = {
  username: {
    required: true,
    minLength: VALIDATION.USERNAME_MIN_LENGTH,
    maxLength: 50,
    custom: (value: string) => {
      if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
        return 'Username can only contain letters, numbers, underscores, and hyphens';
      }
      return null;
    },
  },
  email: {
    required: true,
    pattern: VALIDATION.EMAIL_REGEX,
    custom: (value: string) => {
      if (!VALIDATION.EMAIL_REGEX.test(value)) {
        return 'Please enter a valid email address';
      }
      return null;
    },
  },
  password: {
    required: true,
    minLength: VALIDATION.PASSWORD_MIN_LENGTH,
    custom: (value: string) => {
      if (value.length < VALIDATION.PASSWORD_MIN_LENGTH) {
        return `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`;
      }
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      }
      return null;
    },
  },
  confirmPassword: {
    required: true,
    custom: (value: string, allValues?: Record<string, string>) => {
      if (allValues && value !== allValues.password) {
        return 'Passwords do not match';
      }
      return null;
    },
  },
};

/**
 * Enhanced validation for confirm password that takes all form values
 */
export function validateConfirmPassword(confirmPassword: string, password: string): string | null {
  if (!confirmPassword || confirmPassword.trim() === '') {
    return 'Please confirm your password';
  }
  
  if (confirmPassword !== password) {
    return 'Passwords do not match';
  }
  
  return null;
}

/**
 * Validation rules for submission form
 */
export const submissionValidationRules: ValidationRules = {
  submissionText: {
    required: true,
    minLength: VALIDATION.SUBMISSION_MIN_LENGTH,
    maxLength: VALIDATION.SUBMISSION_MAX_LENGTH,
    custom: (value: string) => {
      const trimmedValue = value.trim();
      if (trimmedValue.length < VALIDATION.SUBMISSION_MIN_LENGTH) {
        return `Response must be at least ${VALIDATION.SUBMISSION_MIN_LENGTH} characters`;
      }
      if (trimmedValue.length > VALIDATION.SUBMISSION_MAX_LENGTH) {
        return `Response must be no more than ${VALIDATION.SUBMISSION_MAX_LENGTH} characters`;
      }
      return null;
    },
  },
};
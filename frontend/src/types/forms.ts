// Form validation and utility types

// Form field validation
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

export interface ValidationRules {
  [fieldName: string]: ValidationRule;
}

export interface FormErrors {
  [fieldName: string]: string;
}

export interface FormState<T> {
  values: T;
  errors: FormErrors;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Specific form types
export interface LoginFormData extends Record<string, string> {
  email: string;
  password: string;
}

export interface RegisterFormData extends Record<string, string> {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SubmissionFormData extends Record<string, string> {
  submissionText: string;
}

// Form validation utility types
export type FormValidator<T> = (values: T) => FormErrors;

export interface UseFormOptions<T> {
  initialValues: T;
  validationRules?: ValidationRules;
  onSubmit: (values: T) => Promise<void> | void;
}

export interface UseFormReturn<T> {
  values: T;
  errors: FormErrors;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
  handleChange: (name: keyof T, value: string) => void;
  handleBlur: (name: keyof T) => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetForm: () => void;
}
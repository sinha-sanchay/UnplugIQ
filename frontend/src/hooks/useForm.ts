import { useState, useCallback } from 'react';
import { FormErrors, UseFormOptions, UseFormReturn } from '@/types/forms';
import { validateForm, validateField } from '@/utils/validation';

/**
 * Custom hook for form state management and validation
 */
export function useForm<T extends Record<string, string>>(
  options: UseFormOptions<T>
): UseFormReturn<T> {
  const { initialValues, validationRules = {}, onSubmit } = options;

  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    {} as Record<keyof T, boolean>
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate if form is valid
  const isValid = Object.keys(errors).length === 0 && 
    Object.keys(touched).length > 0;

  // Handle field value changes
  const handleChange = useCallback((name: keyof T, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name as string]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as string];
        return newErrors;
      });
    }

    // Validate field if it has been touched
    if (touched[name] && validationRules[name as string]) {
      const fieldError = validateField(value, validationRules[name as string]);
      if (fieldError) {
        setErrors(prev => ({ ...prev, [name as string]: fieldError }));
      }
    }
  }, [errors, touched, validationRules]);

  // Handle field blur (when user leaves field)
  const handleBlur = useCallback((name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));

    // Validate field on blur
    if (validationRules[name as string]) {
      const value = values[name] || '';
      const fieldError = validateField(value, validationRules[name as string]);
      
      if (fieldError) {
        setErrors(prev => ({ ...prev, [name as string]: fieldError }));
      }
    }
  }, [values, validationRules]);

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(initialValues).reduce((acc, key) => {
      acc[key as keyof T] = true;
      return acc;
    }, {} as Record<keyof T, boolean>);
    setTouched(allTouched);

    // Validate all fields
    const formErrors = validateForm(values, validationRules);
    
    // Special handling for confirm password validation
    if (validationRules.confirmPassword && 'password' in values && 'confirmPassword' in values) {
      const confirmPasswordError = values.confirmPassword !== values.password 
        ? 'Passwords do not match' 
        : null;
      
      if (confirmPasswordError) {
        formErrors.confirmPassword = confirmPasswordError;
      }
    }

    setErrors(formErrors);

    // If there are errors, don't submit
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    // Submit the form
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      // Error handling is done by the parent component
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validationRules, initialValues, onSubmit]);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({} as Record<keyof T, boolean>);
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
}
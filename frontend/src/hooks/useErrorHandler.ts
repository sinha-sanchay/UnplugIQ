import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { ErrorHandler } from '../services/errorHandler';
import { GlobalErrorHandler } from '../services/globalErrorHandler';
import { ApiError } from '../types/api';
import { ROUTES } from '../utils/routes';

/**
 * Hook for handling errors in components with appropriate user feedback
 */
export const useErrorHandler = () => {
  const { showError, showWarning } = useToast();
  const navigate = useNavigate();

  const handleError = useCallback((error: ApiError, context?: string) => {
    // Log error for debugging
    ErrorHandler.logError(error, context);

    // Handle different error types
    if (ErrorHandler.isAuthError(error)) {
      showError('Authentication Required', 'Please log in to continue.');
      setTimeout(() => navigate(ROUTES.LOGIN), 2000);
    } else if (ErrorHandler.isNetworkError(error)) {
      showError('Connection Error', ErrorHandler.getUserFriendlyMessage(error));
    } else if (ErrorHandler.isServerError(error)) {
      showError('Server Error', ErrorHandler.getUserFriendlyMessage(error));
    } else if (ErrorHandler.isValidationError(error)) {
      showWarning('Validation Error', 'Please check your input and try again.');
    } else {
      showError('Error', ErrorHandler.getUserFriendlyMessage(error));
    }
  }, [showError, showWarning, navigate]);

  const handleSuccess = useCallback((message: string, title: string = 'Success') => {
    GlobalErrorHandler.showSuccess(title, message);
  }, []);

  const handleWarning = useCallback((message: string, title: string = 'Warning') => {
    GlobalErrorHandler.showWarning(title, message);
  }, []);

  const handleInfo = useCallback((message: string, title: string = 'Info') => {
    GlobalErrorHandler.showInfo(title, message);
  }, []);

  const getValidationErrors = useCallback((error: ApiError) => {
    return ErrorHandler.getValidationErrors(error);
  }, []);

  return {
    handleError,
    handleSuccess,
    handleWarning,
    handleInfo,
    getValidationErrors,
    isNetworkError: ErrorHandler.isNetworkError,
    isAuthError: ErrorHandler.isAuthError,
    isServerError: ErrorHandler.isServerError,
    isValidationError: ErrorHandler.isValidationError,
  };
};
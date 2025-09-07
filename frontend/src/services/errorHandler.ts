import { ApiError } from '@/types';

/**
 * Error handler utility functions for consistent error handling across services
 */

export interface RetryConfig {
  maxAttempts: number;
  delay: number;
  backoff: boolean;
}

export class ErrorHandler {
  /**
   * Check if error is a network error
   */
  static isNetworkError(error: ApiError): boolean {
    return error.status === 0 || !error.status;
  }

  /**
   * Check if error is an authentication error
   */
  static isAuthError(error: ApiError): boolean {
    return error.status === 401 || error.status === 403;
  }

  /**
   * Check if error is a validation error
   */
  static isValidationError(error: ApiError): boolean {
    return error.status === 400 && !!error.errors;
  }

  /**
   * Check if error is a server error
   */
  static isServerError(error: ApiError): boolean {
    return error.status >= 500;
  }

  /**
   * Get user-friendly error message
   */
  static getUserFriendlyMessage(error: ApiError): string {
    if (this.isNetworkError(error)) {
      return 'Unable to connect to the server. Please check your internet connection and try again.';
    }

    if (this.isAuthError(error)) {
      return 'Your session has expired. Please log in again.';
    }

    if (this.isServerError(error)) {
      return 'The server is currently experiencing issues. Please try again later.';
    }

    return error.message || 'An unexpected error occurred. Please try again.';
  }

  /**
   * Get validation error messages for form fields
   */
  static getValidationErrors(error: ApiError): Record<string, string> {
    if (!this.isValidationError(error) || !error.errors) {
      return {};
    }

    const fieldErrors: Record<string, string> = {};
    
    Object.entries(error.errors).forEach(([field, messages]) => {
      fieldErrors[field] = Array.isArray(messages) ? messages[0] : messages;
    });

    return fieldErrors;
  }

  /**
   * Log error for debugging purposes
   */
  static logError(error: ApiError, context?: string): void {
    const logContext = context ? `[${context}]` : '';
    console.error(`${logContext} API Error:`, {
      message: error.message,
      status: error.status,
      errors: error.errors,
    });
  }

  /**
   * Create a standardized error object
   */
  static createError(
    message: string,
    status: number = 500,
    errors?: Record<string, string[]>
  ): ApiError {
    return {
      message,
      status,
      errors,
    };
  }

  /**
   * Check if error is retryable
   */
  static isRetryableError(error: ApiError): boolean {
    // Network errors and server errors (5xx) are retryable
    return this.isNetworkError(error) || this.isServerError(error) || error.status === 408; // Request timeout
  }

  /**
   * Get retry configuration based on error type
   */
  static getRetryConfig(error: ApiError): RetryConfig {
    if (this.isNetworkError(error)) {
      return {
        maxAttempts: 3,
        delay: 1000,
        backoff: true,
      };
    }

    if (this.isServerError(error)) {
      return {
        maxAttempts: 2,
        delay: 2000,
        backoff: false,
      };
    }

    // Default config for other retryable errors
    return {
      maxAttempts: 2,
      delay: 1000,
      backoff: false,
    };
  }

  /**
   * Retry an async operation with exponential backoff
   */
  static async retryOperation<T>(
    operation: () => Promise<T>,
    config: RetryConfig
  ): Promise<T> {
    let lastError: any;

    for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;

        // Don't retry on the last attempt
        if (attempt === config.maxAttempts) {
          break;
        }

        // Don't retry non-retryable errors
        if (error instanceof Object && 'status' in error) {
          const apiError = error as ApiError;
          if (!this.isRetryableError(apiError)) {
            break;
          }
        }

        // Calculate delay with optional exponential backoff
        const delay = config.backoff 
          ? config.delay * Math.pow(2, attempt - 1)
          : config.delay;

        // Wait before next attempt
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError;
  }

  /**
   * Handle error with automatic retry for retryable errors
   */
  static async handleErrorWithRetry<T>(
    operation: () => Promise<T>,
    error: ApiError
  ): Promise<T> {
    if (this.isRetryableError(error)) {
      const config = this.getRetryConfig(error);
      return this.retryOperation(operation, config);
    }
    
    throw error;
  }
}
import { ApiError } from '@/types';
import { ErrorHandler } from './errorHandler';

export interface GlobalErrorHandlerConfig {
  showToast?: (type: 'error' | 'warning' | 'info', title: string, message?: string) => void;
  onAuthError?: () => void;
  onNetworkError?: () => void;
  onServerError?: (error: ApiError) => void;
}

/**
 * Global error handler for managing application-wide error handling
 */
export class GlobalErrorHandler {
  private static config: GlobalErrorHandlerConfig = {};

  /**
   * Initialize the global error handler with configuration
   */
  static initialize(config: GlobalErrorHandlerConfig) {
    this.config = config;
    
    // Set up global error listeners
    this.setupGlobalErrorListeners();
  }

  /**
   * Handle API errors globally
   */
  static handleApiError(error: ApiError, context?: string): void {
    ErrorHandler.logError(error, context);

    if (ErrorHandler.isAuthError(error)) {
      this.handleAuthError(error);
    } else if (ErrorHandler.isNetworkError(error)) {
      this.handleNetworkError(error);
    } else if (ErrorHandler.isServerError(error)) {
      this.handleServerError(error);
    } else if (ErrorHandler.isValidationError(error)) {
      this.handleValidationError(error);
    } else {
      this.handleGenericError(error);
    }
  }

  /**
   * Handle authentication errors
   */
  private static handleAuthError(error: ApiError): void {
    const message = ErrorHandler.getUserFriendlyMessage(error);
    
    this.config.showToast?.('error', 'Authentication Error', message);
    
    // Redirect to login or call custom handler
    if (this.config.onAuthError) {
      this.config.onAuthError();
    } else {
      // Default behavior: redirect to login
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }
  }

  /**
   * Handle network errors
   */
  private static handleNetworkError(error: ApiError): void {
    const message = ErrorHandler.getUserFriendlyMessage(error);
    
    this.config.showToast?.('error', 'Connection Error', message);
    
    if (this.config.onNetworkError) {
      this.config.onNetworkError();
    }
  }

  /**
   * Handle server errors
   */
  private static handleServerError(error: ApiError): void {
    const message = ErrorHandler.getUserFriendlyMessage(error);
    
    this.config.showToast?.('error', 'Server Error', message);
    
    if (this.config.onServerError) {
      this.config.onServerError(error);
    }
  }

  /**
   * Handle validation errors
   */
  private static handleValidationError(_error: ApiError): void {
    const message = 'Please check your input and try again.';
    
    this.config.showToast?.('warning', 'Validation Error', message);
  }

  /**
   * Handle generic errors
   */
  private static handleGenericError(error: ApiError): void {
    const message = ErrorHandler.getUserFriendlyMessage(error);
    
    this.config.showToast?.('error', 'Error', message);
  }

  /**
   * Set up global error listeners for unhandled errors
   */
  private static setupGlobalErrorListeners(): void {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      
      // Try to extract API error information
      if (event.reason && typeof event.reason === 'object') {
        if ('status' in event.reason && 'message' in event.reason) {
          this.handleApiError(event.reason as ApiError, 'Unhandled Promise');
          event.preventDefault(); // Prevent default browser error handling
          return;
        }
      }

      // Generic error handling for non-API errors
      this.config.showToast?.(
        'error',
        'Unexpected Error',
        'An unexpected error occurred. Please try refreshing the page.'
      );
    });

    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      console.error('Global JavaScript error:', event.error);
      
      // Don't show toast for every JS error to avoid spam
      // Only log for debugging purposes
    });
  }

  /**
   * Show success message
   */
  static showSuccess(title: string, message?: string): void {
    this.config.showToast?.('info', title, message);
  }

  /**
   * Show warning message
   */
  static showWarning(title: string, message?: string): void {
    this.config.showToast?.('warning', title, message);
  }

  /**
   * Show info message
   */
  static showInfo(title: string, message?: string): void {
    this.config.showToast?.('info', title, message);
  }

  /**
   * Check if user is online
   */
  static isOnline(): boolean {
    return navigator.onLine;
  }

  /**
   * Handle offline state
   */
  static handleOffline(): void {
    this.config.showToast?.(
      'warning',
      'You\'re Offline',
      'Some features may not be available until you reconnect.'
    );
  }

  /**
   * Handle online state restoration
   */
  static handleOnline(): void {
    this.config.showToast?.(
      'info',
      'Connection Restored',
      'You\'re back online!'
    );
  }
}
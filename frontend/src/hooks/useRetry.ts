import { useState, useCallback } from 'react';
import { useToast } from '../context/ToastContext';

export interface RetryOptions {
  maxAttempts?: number;
  delay?: number;
  backoff?: boolean;
  onSuccess?: () => void;
  onFailure?: (error: any) => void;
}

export interface RetryState {
  isRetrying: boolean;
  attempts: number;
  lastError: any;
}

/**
 * Hook for implementing retry mechanisms with exponential backoff
 */
export const useRetry = () => {
  const [retryState, setRetryState] = useState<RetryState>({
    isRetrying: false,
    attempts: 0,
    lastError: null,
  });
  const { showError, showSuccess } = useToast();

  const retry = useCallback(async <T>(
    operation: () => Promise<T>,
    options: RetryOptions = {}
  ): Promise<T | null> => {
    const {
      maxAttempts = 3,
      delay = 1000,
      backoff = true,
      onSuccess,
      onFailure,
    } = options;

    setRetryState(prev => ({ ...prev, isRetrying: true, attempts: 0 }));

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        setRetryState(prev => ({ ...prev, attempts: attempt }));
        
        const result = await operation();
        
        setRetryState({
          isRetrying: false,
          attempts: attempt,
          lastError: null,
        });

        if (attempt > 1) {
          showSuccess('Connection restored', 'Successfully reconnected to the server.');
        }

        onSuccess?.();
        return result;
      } catch (error) {
        setRetryState(prev => ({ ...prev, lastError: error }));

        if (attempt === maxAttempts) {
          setRetryState(prev => ({ ...prev, isRetrying: false }));
          showError(
            'Connection failed',
            `Failed to connect after ${maxAttempts} attempts. Please try again later.`
          );
          onFailure?.(error);
          return null;
        }

        // Wait before next attempt with exponential backoff
        const waitTime = backoff ? delay * Math.pow(2, attempt - 1) : delay;
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }

    return null;
  }, [showError, showSuccess]);

  const reset = useCallback(() => {
    setRetryState({
      isRetrying: false,
      attempts: 0,
      lastError: null,
    });
  }, []);

  return {
    retry,
    reset,
    ...retryState,
  };
};
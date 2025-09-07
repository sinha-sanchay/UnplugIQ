import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiError } from '@/types';
import { ErrorHandler } from './errorHandler';
import { GlobalErrorHandler } from './globalErrorHandler';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Create Axios instance with base configuration
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authentication token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors - redirect to login
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Clear auth data and redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Transform error response
    const apiError: ApiError = {
      message: error.response?.data || error.message || 'An unexpected error occurred',
      status: error.response?.status || 500,
      errors: error.response?.data?.errors,
    };

    // Handle error globally if not in retry mode
    if (!originalRequest._retry) {
      GlobalErrorHandler.handleApiError(apiError, originalRequest.url);
    }

    return Promise.reject(apiError);
  }
);

// Utility function for handling API responses
export const handleApiResponse = <T>(response: AxiosResponse<T>): T => {
  return response.data;
};

// Utility function for handling API errors
export const handleApiError = (error: any): never => {
  if (error.response) {
    // Server responded with error status
    const apiError: ApiError = {
      message: error.response.data?.message || 'Server error occurred',
      status: error.response.status,
      errors: error.response.data?.errors,
    };
    throw apiError;
  } else if (error.request) {
    // Network error
    const networkError: ApiError = {
      message: 'Network error. Please check your connection.',
      status: 0,
    };
    throw networkError;
  } else {
    // Other error
    const genericError: ApiError = {
      message: error.message || 'An unexpected error occurred',
      status: 500,
    };
    throw genericError;
  }
};

// Utility function for making API calls with automatic retry
export const apiCallWithRetry = async <T>(
  operation: () => Promise<AxiosResponse<T>>,
  context?: string
): Promise<T> => {
  try {
    const response = await operation();
    return handleApiResponse(response);
  } catch (error) {
    const apiError = error as ApiError;
    
    // Log error for debugging
    ErrorHandler.logError(apiError, context);
    
    // Try to retry if it's a retryable error
    if (ErrorHandler.isRetryableError(apiError)) {
      try {
        const retriedResponse = await ErrorHandler.handleErrorWithRetry(operation, apiError);
        return handleApiResponse(retriedResponse);
      } catch (retryError) {
        // If retry fails, throw the original error
        throw apiError;
      }
    }
    
    // If not retryable, throw the error
    throw apiError;
  }
};
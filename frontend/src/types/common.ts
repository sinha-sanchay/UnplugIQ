// Common utility types and constants

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Generic utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Route types
export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  protected?: boolean;
  exact?: boolean;
}

// Navigation types
export interface NavigationItem {
  label: string;
  path: string;
  icon?: string;
  protected?: boolean;
}

// Error types
export interface ErrorInfo {
  message: string;
  code?: string;
  details?: unknown;
}

// Pagination types
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Filter types
export interface FilterOptions {
  type?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

// Theme and styling types
export type ThemeMode = 'light' | 'dark';

export interface ThemeConfig {
  mode: ThemeMode;
  primaryColor: string;
  secondaryColor: string;
}
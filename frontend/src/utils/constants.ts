// Application constants

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Challenge Platform'
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0'

// Route paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  CHALLENGES: '/challenges',
  CHALLENGE_DETAIL: '/challenges/:id',
  PROFILE: '/profile',
  SUBMISSIONS: '/submissions',
} as const

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
} as const

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  CHALLENGES: {
    LIST: '/challenges',
    DETAIL: '/challenges',
    BY_TYPE: '/challenges/type',
  },
  SUBMISSIONS: {
    CREATE: '/submissions',
    LIST: '/submissions',
    USER_SUBMISSIONS: '/submissions/user',
  },
} as const

// Challenge types
export const CHALLENGE_TYPES = {
  WRITING: 'WRITING',
  SPEAKING: 'SPEAKING',
  LOGICAL: 'LOGICAL',
} as const

// Form validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  USERNAME_MIN_LENGTH: 3,
  SUBMISSION_MIN_LENGTH: 10,
  SUBMISSION_MAX_LENGTH: 2000,
} as const

// UI constants
export const UI = {
  MOBILE_BREAKPOINT: 768,
  TABLET_BREAKPOINT: 1024,
  DESKTOP_BREAKPOINT: 1280,
  SIDEBAR_WIDTH: 256,
  HEADER_HEIGHT: 64,
} as const

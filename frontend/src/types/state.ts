// State management types

import { User, Challenge, Submission, ChallengeType } from './models';

// Authentication state
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType {
  state: AuthState;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: { username: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Application state
export interface AppState {
  challenges: Challenge[];
  submissions: Submission[];
  selectedChallenge: Challenge | null;
  filters: {
    type: ChallengeType | 'ALL';
  };
  isLoading: boolean;
  error: string | null;
}

export interface AppContextType {
  state: AppState;
  fetchChallenges: () => Promise<void>;
  fetchUserSubmissions: () => Promise<void>;
  selectChallenge: (challenge: Challenge | null) => void;
  setFilter: (type: ChallengeType | 'ALL') => void;
  clearError: () => void;
}

// Action types for reducers
export type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'REGISTER_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean };

export type AppAction =
  | { type: 'FETCH_CHALLENGES_START' }
  | { type: 'FETCH_CHALLENGES_SUCCESS'; payload: Challenge[] }
  | { type: 'FETCH_CHALLENGES_FAILURE'; payload: string }
  | { type: 'FETCH_SUBMISSIONS_START' }
  | { type: 'FETCH_SUBMISSIONS_SUCCESS'; payload: Submission[] }
  | { type: 'FETCH_SUBMISSIONS_FAILURE'; payload: string }
  | { type: 'SELECT_CHALLENGE'; payload: Challenge | null }
  | { type: 'SET_FILTER'; payload: ChallengeType | 'ALL' }
  | { type: 'CLEAR_ERROR' };
import { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { AppState, AppContextType, AppAction, Challenge, ChallengeType } from '@/types';
import { ChallengeService } from '@/services/challengeService';
import { SubmissionService } from '@/services/submissionService';

// Initial application state
const initialAppState: AppState = {
  challenges: [],
  submissions: [],
  selectedChallenge: null,
  filters: {
    type: 'ALL',
  },
  isLoading: false,
  error: null,
};

// Application reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'FETCH_CHALLENGES_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'FETCH_CHALLENGES_SUCCESS':
      return {
        ...state,
        challenges: action.payload,
        isLoading: false,
        error: null,
      };

    case 'FETCH_CHALLENGES_FAILURE':
      return {
        ...state,
        challenges: [],
        isLoading: false,
        error: action.payload,
      };

    case 'FETCH_SUBMISSIONS_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'FETCH_SUBMISSIONS_SUCCESS':
      return {
        ...state,
        submissions: action.payload,
        isLoading: false,
        error: null,
      };

    case 'FETCH_SUBMISSIONS_FAILURE':
      return {
        ...state,
        submissions: [],
        isLoading: false,
        error: action.payload,
      };

    case 'SELECT_CHALLENGE':
      return {
        ...state,
        selectedChallenge: action.payload,
      };

    case 'SET_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          type: action.payload,
        },
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// AppProvider component props
interface AppProviderProps {
  children: ReactNode;
}

// AppProvider component
export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  // Fetch all challenges
  const fetchChallenges = useCallback(async (): Promise<void> => {
    dispatch({ type: 'FETCH_CHALLENGES_START' });

    try {
      const challenges = await ChallengeService.getAllChallenges();
      dispatch({
        type: 'FETCH_CHALLENGES_SUCCESS',
        payload: challenges,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch challenges';
      dispatch({
        type: 'FETCH_CHALLENGES_FAILURE',
        payload: errorMessage,
      });
      throw error;
    }
  }, []);

  // Fetch user submissions
  const fetchUserSubmissions = useCallback(async (): Promise<void> => {
    dispatch({ type: 'FETCH_SUBMISSIONS_START' });

    try {
      const userId = localStorage.getItem('userId') || '1'; // Default to 1 for now
      const submissions = await SubmissionService.getUserSubmissions(parseInt(userId));
      dispatch({
        type: 'FETCH_SUBMISSIONS_SUCCESS',
        payload: submissions,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch submissions';
      dispatch({
        type: 'FETCH_SUBMISSIONS_FAILURE',
        payload: errorMessage,
      });
      throw error;
    }
  }, []);

  // Select a challenge
  const selectChallenge = useCallback((challenge: Challenge | null): void => {
    dispatch({
      type: 'SELECT_CHALLENGE',
      payload: challenge,
    });
  }, []);

  // Set filter type
  const setFilter = useCallback((type: ChallengeType | 'ALL'): void => {
    dispatch({
      type: 'SET_FILTER',
      payload: type,
    });
  }, []);

  // Clear error
  const clearError = useCallback((): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const contextValue: AppContextType = {
    state,
    fetchChallenges,
    fetchUserSubmissions,
    selectChallenge,
    setFilter,
    clearError,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the AppContext
export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  
  return context;
}
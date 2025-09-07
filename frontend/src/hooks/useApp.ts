import { useAppContext } from '@/context/AppContext';
import { Challenge, ChallengeType } from '@/types';

/**
 * Custom hook for accessing application state and actions
 * Provides a convenient interface to the AppContext
 */
export function useApp() {
  const {
    state,
    fetchChallenges,
    fetchUserSubmissions,
    selectChallenge,
    setFilter,
    clearError,
  } = useAppContext();

  return {
    // State
    ...state,
    
    // Actions
    fetchChallenges,
    fetchUserSubmissions,
    selectChallenge,
    setFilter,
    clearError,
    
    // Computed values
    filteredChallenges: getFilteredChallenges(state.challenges, state.filters.type),
    hasSubmissions: state.submissions.length > 0,
    challengeCount: state.challenges.length,
    submissionCount: state.submissions.length,
  };
}

/**
 * Helper function to filter challenges by type
 */
function getFilteredChallenges(challenges: Challenge[], filterType: ChallengeType | 'ALL'): Challenge[] {
  if (filterType === 'ALL') {
    return challenges;
  }
  
  return challenges.filter(challenge => challenge.type === filterType);
}
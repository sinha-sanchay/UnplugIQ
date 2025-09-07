import { useMemo, useCallback } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Challenge, ChallengeType, Submission } from '@/types';

/**
 * Custom hook for challenge-specific operations and computed values
 * Provides enhanced functionality for working with challenges
 */
export function useChallenges() {
  const {
    state,
    fetchChallenges,
    selectChallenge,
    setFilter,
  } = useAppContext();

  // Memoized filtered challenges
  const filteredChallenges = useMemo(() => {
    if (state.filters.type === 'ALL') {
      return state.challenges;
    }
    return state.challenges.filter(challenge => challenge.type === state.filters.type);
  }, [state.challenges, state.filters.type]);

  // Memoized challenges by type
  const challengesByType = useMemo(() => {
    return state.challenges.reduce((acc, challenge) => {
      if (!acc[challenge.type]) {
        acc[challenge.type] = [];
      }
      acc[challenge.type].push(challenge);
      return acc;
    }, {} as Record<ChallengeType, Challenge[]>);
  }, [state.challenges]);

  // Memoized challenge statistics
  const challengeStats = useMemo(() => {
    const total = state.challenges.length;
    const byType = {
      [ChallengeType.WRITING]: challengesByType[ChallengeType.WRITING]?.length || 0,
      [ChallengeType.SPEAKING]: challengesByType[ChallengeType.SPEAKING]?.length || 0,
      [ChallengeType.LOGICAL]: challengesByType[ChallengeType.LOGICAL]?.length || 0,
    };

    return {
      total,
      byType,
      filtered: filteredChallenges.length,
    };
  }, [state.challenges.length, challengesByType, filteredChallenges.length]);

  // Get challenge by ID
  const getChallengeById = useCallback((id: number): Challenge | undefined => {
    return state.challenges.find(challenge => challenge.id === id);
  }, [state.challenges]);

  // Check if user has submitted to a challenge
  const hasUserSubmitted = useCallback((challengeId: number): boolean => {
    return state.submissions.some(submission => submission.challenge.id === challengeId);
  }, [state.submissions]);

  // Get user's submission for a specific challenge
  const getUserSubmissionForChallenge = useCallback((challengeId: number): Submission | undefined => {
    return state.submissions.find(submission => submission.challenge.id === challengeId);
  }, [state.submissions]);

  // Get recent challenges (last 5)
  const getRecentChallenges = useCallback((): Challenge[] => {
    return [...state.challenges]
      .sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime())
      .slice(0, 5);
  }, [state.challenges]);

  // Search challenges by title or description
  const searchChallenges = useCallback((query: string): Challenge[] => {
    if (!query.trim()) {
      return filteredChallenges;
    }

    const lowercaseQuery = query.toLowerCase();
    return filteredChallenges.filter(challenge =>
      challenge.title.toLowerCase().includes(lowercaseQuery) ||
      challenge.description.toLowerCase().includes(lowercaseQuery)
    );
  }, [filteredChallenges]);

  // Filter challenges by multiple criteria
  const filterChallenges = useCallback((criteria: {
    type?: ChallengeType | 'ALL';
    search?: string;
    dateRange?: { start: Date; end: Date };
  }): Challenge[] => {
    let filtered = state.challenges;

    // Filter by type
    if (criteria.type && criteria.type !== 'ALL') {
      filtered = filtered.filter(challenge => challenge.type === criteria.type);
    }

    // Filter by search query
    if (criteria.search?.trim()) {
      const lowercaseQuery = criteria.search.toLowerCase();
      filtered = filtered.filter(challenge =>
        challenge.title.toLowerCase().includes(lowercaseQuery) ||
        challenge.description.toLowerCase().includes(lowercaseQuery)
      );
    }

    // Filter by date range
    if (criteria.dateRange) {
      filtered = filtered.filter(challenge => {
        const challengeDate = new Date(challenge.datePosted);
        return challengeDate >= criteria.dateRange!.start && challengeDate <= criteria.dateRange!.end;
      });
    }

    return filtered;
  }, [state.challenges]);

  return {
    // State
    challenges: state.challenges,
    filteredChallenges,
    selectedChallenge: state.selectedChallenge,
    currentFilter: state.filters.type,
    isLoading: state.isLoading,
    error: state.error,

    // Computed values
    challengesByType,
    challengeStats,
    recentChallenges: getRecentChallenges(),

    // Actions
    fetchChallenges,
    selectChallenge,
    setFilter,

    // Helper functions
    getChallengeById,
    hasUserSubmitted,
    getUserSubmissionForChallenge,
    searchChallenges,
    filterChallenges,
  };
}
import React from 'react';
import { Challenge, ChallengeType } from '@/types';
import ChallengeCard from './ChallengeCard';
import EmptyState from './EmptyState';
import LoadingSpinner from '../common/LoadingSpinner';
import './ChallengeList.css';

interface ChallengeListProps {
  challenges: Challenge[];
  isLoading?: boolean;
  error?: string | null;
  selectedType?: ChallengeType | 'ALL';
  onChallengeClick?: (challenge: Challenge) => void;
  className?: string;
}

/**
 * Grid layout component for displaying challenges with responsive design
 */
const ChallengeList: React.FC<ChallengeListProps> = ({
  challenges,
  isLoading = false,
  error = null,
  selectedType = 'ALL',
  onChallengeClick,
  className = ''
}) => {
  // Loading state
  if (isLoading) {
    return (
      <div className={`challenge-list ${className}`}>
        <div className="challenge-list__loading">
          <LoadingSpinner />
          <p className="challenge-list__loading-text">Loading challenges...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`challenge-list ${className}`}>
        <div className="challenge-list__error">
          <div className="challenge-list__error-icon">⚠️</div>
          <h3 className="challenge-list__error-title">Unable to load challenges</h3>
          <p className="challenge-list__error-message">{error}</p>
          <button 
            className="challenge-list__retry-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!challenges || challenges.length === 0) {
    return (
      <div className={`challenge-list ${className}`}>
        <EmptyState 
          type={selectedType}
          onResetFilter={() => {
            // This would typically be handled by parent component
            console.log('Reset filter requested');
          }}
        />
      </div>
    );
  }

  // Success state with challenges
  return (
    <div className={`challenge-list ${className}`}>
      <div className="challenge-list__header">
        <div className="challenge-list__count">
          <span className="challenge-list__count-number">{challenges.length}</span>
          <span className="challenge-list__count-text">
            {challenges.length === 1 ? 'challenge' : 'challenges'}
            {selectedType !== 'ALL' && (
              <span className="challenge-list__count-filter">
                {' '}in {selectedType.toLowerCase()}
              </span>
            )}
          </span>
        </div>
      </div>

      <div className="challenge-list__grid">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="challenge-list__item">
            <ChallengeCard
              challenge={challenge}
              onClick={onChallengeClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeList;
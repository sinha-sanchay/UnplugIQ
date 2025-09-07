import React from 'react';
import { ChallengeType } from '@/types';
import './ChallengeFilter.css';

interface ChallengeFilterProps {
  selectedType: ChallengeType | 'ALL';
  onFilterChange: (type: ChallengeType | 'ALL') => void;
  challengeCounts?: {
    [key in ChallengeType | 'ALL']: number;
  };
  className?: string;
}

/**
 * Filter component for type-based challenge filtering
 */
const ChallengeFilter: React.FC<ChallengeFilterProps> = ({
  selectedType,
  onFilterChange,
  challengeCounts,
  className = ''
}) => {
  const filterOptions = [
    { value: 'ALL' as const, label: 'All Challenges', icon: '📋' },
    { value: ChallengeType.WRITING, label: 'Writing', icon: '✍️' },
    { value: ChallengeType.SPEAKING, label: 'Speaking', icon: '🎤' },
    { value: ChallengeType.LOGICAL, label: 'Logical', icon: '🧠' }
  ];

  const handleFilterClick = (type: ChallengeType | 'ALL') => {
    onFilterChange(type);
  };



  return (
    <div className={`challenge-filter ${className}`}>
      <div className="challenge-filter__header">
        <h3 className="challenge-filter__title">Filter by Type</h3>
        <p className="challenge-filter__description">
          Choose a challenge type to filter the results
        </p>
      </div>
      
      <div className="challenge-filter__options">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            className={`challenge-filter__option ${
              selectedType === option.value ? 'challenge-filter__option--active' : ''
            }`}
            onClick={() => handleFilterClick(option.value)}
            aria-pressed={selectedType === option.value}
          >
            <div className="challenge-filter__option-content">
              <div className="challenge-filter__option-header">
                <span className="challenge-filter__option-icon" aria-hidden="true">
                  {option.icon}
                </span>
                <span className="challenge-filter__option-label">
                  {option.label}
                </span>
              </div>
              
              {challengeCounts && challengeCounts[option.value] !== undefined && (
                <span className="challenge-filter__count">
                  {challengeCounts[option.value]}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
      
      {/* Mobile-friendly horizontal scroll version */}
      <div className="challenge-filter__mobile">
        <div className="challenge-filter__mobile-scroll">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              className={`challenge-filter__mobile-option ${
                selectedType === option.value ? 'challenge-filter__mobile-option--active' : ''
              }`}
              onClick={() => handleFilterClick(option.value)}
              aria-pressed={selectedType === option.value}
            >
              <span className="challenge-filter__mobile-icon" aria-hidden="true">
                {option.icon}
              </span>
              <span className="challenge-filter__mobile-label">
                {option.value === 'ALL' ? 'All' : option.label}
              </span>
              {challengeCounts && challengeCounts[option.value] !== undefined && (
                <span className="challenge-filter__mobile-count">
                  {challengeCounts[option.value]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengeFilter;
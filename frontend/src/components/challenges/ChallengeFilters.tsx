import { ChallengeType } from '../../types/models';
import './ChallengeFilters.css';

interface ChallengeFiltersProps {
  selectedType: ChallengeType | 'ALL';
  searchTerm: string;
  onTypeChange: (type: ChallengeType | 'ALL') => void;
  onSearchChange: (term: string) => void;
}

const ChallengeFilters = ({
  selectedType,
  searchTerm,
  onTypeChange,
  onSearchChange,
}: ChallengeFiltersProps) => {
  const filterOptions = [
    { value: 'ALL', label: 'All Challenges', icon: '🎯' },
    { value: 'WRITING', label: 'Writing', icon: '✍️' },
    { value: 'SPEAKING', label: 'Speaking', icon: '🎤' },
    { value: 'LOGICAL', label: 'Logical', icon: '🧠' },
  ];

  return (
    <div className="challenge-filters">
      <div className="filters-container">
        {/* Search Bar */}
        <div className="search-container">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search challenges..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button
                className="clear-search"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Type Filters */}
        <div className="type-filters">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              className={`filter-btn ${
                selectedType === option.value ? 'active' : ''
              }`}
              onClick={() => onTypeChange(option.value as ChallengeType | 'ALL')}
            >
              <span className="filter-icon">{option.icon}</span>
              <span className="filter-label">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengeFilters;
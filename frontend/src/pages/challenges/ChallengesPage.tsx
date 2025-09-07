import { useState, useEffect } from 'react';
import { useChallenges } from '../../hooks/useChallenges';
import { Challenge, ChallengeType } from '../../types/models';
import ChallengeCard from '../../components/challenges/ChallengeCard';
import ChallengeFilters from '../../components/challenges/ChallengeFilters';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import './ChallengesPage.css';

const ChallengesPage = () => {
  const { challenges, loading, error, fetchChallenges } = useChallenges();
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  const [selectedType, setSelectedType] = useState<ChallengeType | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  useEffect(() => {
    let filtered = challenges;

    // Filter by type
    if (selectedType !== 'ALL') {
      filtered = filtered.filter(challenge => challenge.type === selectedType);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(challenge =>
        challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredChallenges(filtered);
  }, [challenges, selectedType, searchTerm]);

  const handleTypeFilter = (type: ChallengeType | 'ALL') => {
    setSelectedType(type);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  if (loading) {
    return (
      <div className="challenges-page">
        <div className="container">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="challenges-page">
        <div className="container">
          <div className="error-message">
            <h2>Error Loading Challenges</h2>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={fetchChallenges}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="challenges-page animate-fade-in">
      <div className="container">
        {/* Header Section */}
        <div className="challenges-header">
          <div className="header-content">
            <h1 className="page-title">
              <span className="gradient-text">Skill Challenges</span>
            </h1>
            <p className="page-subtitle">
              Test your abilities across writing, speaking, and logical reasoning
            </p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{challenges.length}</div>
              <div className="stat-label">Total Challenges</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {challenges.filter(c => c.type === 'WRITING').length}
              </div>
              <div className="stat-label">Writing</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {challenges.filter(c => c.type === 'SPEAKING').length}
              </div>
              <div className="stat-label">Speaking</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {challenges.filter(c => c.type === 'LOGICAL').length}
              </div>
              <div className="stat-label">Logical</div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <ChallengeFilters
          selectedType={selectedType}
          searchTerm={searchTerm}
          onTypeChange={handleTypeFilter}
          onSearchChange={handleSearch}
        />

        {/* Challenges Grid */}
        <div className="challenges-grid">
          {filteredChallenges.length > 0 ? (
            filteredChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
              />
            ))
          ) : (
            <div className="no-challenges">
              <div className="no-challenges-icon">🎯</div>
              <h3>No challenges found</h3>
              <p>
                {searchTerm || selectedType !== 'ALL'
                  ? 'Try adjusting your filters to see more challenges.'
                  : 'No challenges available at the moment.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengesPage;
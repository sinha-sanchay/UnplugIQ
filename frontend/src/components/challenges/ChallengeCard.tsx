import { useState } from 'react';
import { Challenge } from '../../types/models';
import { useNavigation } from '../../hooks/useNavigation';
import './ChallengeCard.css';

interface ChallengeCardProps {
  challenge: Challenge;
}

const ChallengeCard = ({ challenge }: ChallengeCardProps) => {
  const { navigateTo } = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'WRITING':
        return '✍️';
      case 'SPEAKING':
        return '🎤';
      case 'LOGICAL':
        return '🧠';
      default:
        return '📝';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'WRITING':
        return 'var(--accent-primary)';
      case 'SPEAKING':
        return 'var(--accent-secondary)';
      case 'LOGICAL':
        return 'var(--accent-success)';
      default:
        return 'var(--text-secondary)';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'EASY':
        return 'var(--accent-success)';
      case 'MEDIUM':
        return 'var(--accent-warning)';
      case 'HARD':
        return 'var(--accent-secondary)';
      case 'EXPERT':
        return 'var(--accent-error)';
      default:
        return 'var(--text-secondary)';
    }
  };

  const handleStartChallenge = () => {
    navigateTo(`/challenges/${challenge.id}`);
  };

  const truncateDescription = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="challenge-card animate-fade-in">
      <div className="challenge-header">
        <div className="challenge-type" style={{ color: getTypeColor(challenge.type) }}>
          <span className="type-icon">{getTypeIcon(challenge.type)}</span>
          <span className="type-text">{challenge.type}</span>
        </div>
        <div className="challenge-difficulty" style={{ color: getDifficultyColor(challenge.difficulty || 'MEDIUM') }}>
          {challenge.difficulty || 'MEDIUM'}
        </div>
      </div>

      <div className="challenge-content">
        <h3 className="challenge-title">{challenge.title}</h3>
        <p className="challenge-description">
          {isExpanded ? challenge.description : truncateDescription(challenge.description)}
          {challenge.description.length > 150 && (
            <button
              className="expand-btn"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </p>
      </div>

      <div className="challenge-meta">
        <div className="meta-item">
          <span className="meta-icon">🏆</span>
          <span className="meta-text">{challenge.maxScore || 100} points</span>
        </div>
        {challenge.timeLimit && (
          <div className="meta-item">
            <span className="meta-icon">⏱️</span>
            <span className="meta-text">{challenge.timeLimit} min</span>
          </div>
        )}
        <div className="meta-item">
          <span className="meta-icon">📅</span>
          <span className="meta-text">
            {new Date(challenge.datePosted).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="challenge-actions">
        <button
          className="btn btn-primary challenge-start-btn"
          onClick={handleStartChallenge}
        >
          <span>Start Challenge</span>
          <span className="btn-icon">→</span>
        </button>
      </div>
    </div>
  );
};

export default ChallengeCard;
import React from 'react';
import { ChallengeType } from '@/types';
import './ChallengeTypeBadge.css';

interface ChallengeTypeBadgeProps {
  type: ChallengeType;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

/**
 * Badge component for visual categorization of challenge types
 */
const ChallengeTypeBadge: React.FC<ChallengeTypeBadgeProps> = ({
  type,
  size = 'medium',
  className = ''
}) => {
  const getBadgeConfig = (challengeType: ChallengeType) => {
    switch (challengeType) {
      case ChallengeType.WRITING:
        return {
          label: 'Writing',
          icon: '✍️',
          colorClass: 'challenge-badge--writing'
        };
      case ChallengeType.SPEAKING:
        return {
          label: 'Speaking',
          icon: '🎤',
          colorClass: 'challenge-badge--speaking'
        };
      case ChallengeType.LOGICAL:
        return {
          label: 'Logical',
          icon: '🧠',
          colorClass: 'challenge-badge--logical'
        };
      default:
        return {
          label: 'Unknown',
          icon: '❓',
          colorClass: 'challenge-badge--default'
        };
    }
  };

  const config = getBadgeConfig(type);
  const badgeClasses = [
    'challenge-badge',
    `challenge-badge--${size}`,
    config.colorClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={badgeClasses} role="badge" aria-label={`${config.label} challenge`}>
      <span className="challenge-badge__icon" aria-hidden="true">
        {config.icon}
      </span>
      <span className="challenge-badge__label">
        {config.label}
      </span>
    </span>
  );
};

export default ChallengeTypeBadge;
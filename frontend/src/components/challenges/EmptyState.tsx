import React from 'react';
import { ChallengeType } from '@/types';
import Button from '../common/Button';
import './EmptyState.css';

interface EmptyStateProps {
  type?: ChallengeType | 'ALL';
  onResetFilter?: () => void;
  className?: string;
}

/**
 * Empty state component for when no challenges are available
 */
const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'ALL',
  onResetFilter,
  className = ''
}) => {
  const getEmptyStateConfig = () => {
    if (type === 'ALL') {
      return {
        icon: '📝',
        title: 'No challenges available',
        description: 'There are currently no challenges to display. Check back later for new challenges to participate in.',
        actionText: 'Refresh Page',
        action: () => window.location.reload()
      };
    }

    const typeConfigs = {
      [ChallengeType.WRITING]: {
        icon: '✍️',
        title: 'No writing challenges found',
        description: 'There are currently no writing challenges available. Try exploring other challenge types or check back later.',
        actionText: 'View All Challenges',
        action: onResetFilter
      },
      [ChallengeType.SPEAKING]: {
        icon: '🎤',
        title: 'No speaking challenges found',
        description: 'There are currently no speaking challenges available. Try exploring other challenge types or check back later.',
        actionText: 'View All Challenges',
        action: onResetFilter
      },
      [ChallengeType.LOGICAL]: {
        icon: '🧠',
        title: 'No logical challenges found',
        description: 'There are currently no logical challenges available. Try exploring other challenge types or check back later.',
        actionText: 'View All Challenges',
        action: onResetFilter
      }
    };

    return typeConfigs[type] || typeConfigs[ChallengeType.WRITING];
  };

  const config = getEmptyStateConfig();

  return (
    <div className={`empty-state ${className}`}>
      <div className="empty-state__content">
        <div className="empty-state__icon" role="img" aria-label="Empty state icon">
          {config.icon}
        </div>
        
        <h3 className="empty-state__title">
          {config.title}
        </h3>
        
        <p className="empty-state__description">
          {config.description}
        </p>
        
        <div className="empty-state__actions">
          {config.action && (
            <Button
              variant="primary"
              onClick={config.action}
              className="empty-state__primary-action"
            >
              {config.actionText}
            </Button>
          )}
          
          {type !== 'ALL' && onResetFilter && (
            <Button
              variant="outline"
              onClick={onResetFilter}
              className="empty-state__secondary-action"
            >
              Clear Filter
            </Button>
          )}
        </div>
        
        {/* Additional helpful information */}
        <div className="empty-state__help">
          <div className="empty-state__help-item">
            <span className="empty-state__help-icon">💡</span>
            <span className="empty-state__help-text">
              New challenges are added regularly
            </span>
          </div>
          
          <div className="empty-state__help-item">
            <span className="empty-state__help-icon">🔄</span>
            <span className="empty-state__help-text">
              Try refreshing the page or changing filters
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
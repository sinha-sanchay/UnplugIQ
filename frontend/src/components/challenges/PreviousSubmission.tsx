import React from 'react';
import { Card } from '@/components/common';
import { Submission } from '@/types/models';
import './PreviousSubmission.css';

interface PreviousSubmissionProps {
  submission: Submission;
  onEdit?: () => void;
  showEditButton?: boolean;
}

/**
 * PreviousSubmission component displays user's existing submission
 * with option to edit if allowed
 */
const PreviousSubmission: React.FC<PreviousSubmissionProps> = ({
  submission,
  onEdit,
  showEditButton = true,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  return (
    <Card variant="outlined" className="previous-submission">
      <div className="previous-submission__header">
        <h3 className="previous-submission__title">Your Previous Submission</h3>
        <div className="previous-submission__meta">
          <span className="previous-submission__date">
            Submitted on {formatDate(submission.submittedAt)}
          </span>
        </div>
      </div>

      <div className="previous-submission__content">
        <div className="previous-submission__text">
          {submission.submissionText}
        </div>
        
        <div className="previous-submission__stats">
          <span className="previous-submission__stat">
            {submission.submissionText.length} characters
          </span>
          <span className="previous-submission__stat">
            {getWordCount(submission.submissionText)} words
          </span>
        </div>
      </div>

      {showEditButton && onEdit && (
        <div className="previous-submission__actions">
          <button
            type="button"
            onClick={onEdit}
            className="previous-submission__edit-button"
          >
            Edit Submission
          </button>
        </div>
      )}
    </Card>
  );
};

export default PreviousSubmission;
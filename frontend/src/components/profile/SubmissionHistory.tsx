import React, { useState, useEffect } from 'react';
import { Submission } from '@/types';
import { Card, LoadingSpinner, Button } from '@/components/common';
import { SubmissionService } from '@/services';
import { useNavigation } from '@/hooks';
import '../../styles/components/SubmissionHistory.css';

interface SubmissionHistoryProps {
  userId?: number;
  limit?: number;
}

/**
 * SubmissionHistory component with submissions list
 */
const SubmissionHistory: React.FC<SubmissionHistoryProps> = ({ userId, limit }) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { goToChallengeDetail, goToChallenges } = useNavigation();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        setError(null);

        const userSubmissions: Submission[] = limit
          ? await SubmissionService.getRecentUserSubmissions(limit)
          : await SubmissionService.getUserSubmissions(userId || 1);

        setSubmissions(userSubmissions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load submissions');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [userId, limit]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

  const truncateText = (text: string, maxLength = 100) =>
    text.length <= maxLength ? text : text.substring(0, maxLength) + '...';

  if (loading)
    return (
      <Card className="submission-history">
        <div className="submission-history__loading">
          <LoadingSpinner />
          <p>Loading submissions...</p>
        </div>
      </Card>
    );

  if (error)
    return (
      <Card variant="outlined" className="submission-history">
        <div className="submission-history__error">
          <p>Error loading submissions: {error}</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </Card>
    );

  if (submissions.length === 0)
    return (
      <Card variant="outlined" className="submission-history submission-history__empty-state">
        <div className="submission-history__empty-content">
          <div className="submission-history__empty-icon">📝</div>
          <h3>No Submissions Yet</h3>
          <p>Start participating to see your submission history here!</p>
          <Button variant="primary" onClick={() => goToChallenges()}>
            Browse Challenges
          </Button>
        </div>
      </Card>
    );

  return (
    <div className="submission-history">
      <div className="submission-history__header">
        <h3>{limit ? `Recent Submissions (${submissions.length})` : `All Submissions (${submissions.length})`}</h3>
      </div>

      <div className="submission-history__list">
        {submissions.map((submission) => (
          <Card key={submission.id} variant="outlined" className="submission-history__item" hoverable>
            <div className="submission-history__item-header">
              <h4
                className="submission-history__challenge-title"
                onClick={() => goToChallengeDetail(submission.challenge.id)}
              >
                {submission.challenge.title}
              </h4>
              <span className={`submission-history__challenge-type type-${submission.challenge.type.toLowerCase()}`}>
                {submission.challenge.type}
              </span>
            </div>

            <div className="submission-history__item-content">
              <p className="submission-history__submission-text">{truncateText(submission.submissionText)}</p>

              <div className="submission-history__item-footer">
                <span className="submission-history__date">Submitted {formatDate(submission.submittedAt)}</span>
                <Button variant="outline" size="small" onClick={() => goToChallengeDetail(submission.challenge.id)}>
                  View Challenge
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubmissionHistory;

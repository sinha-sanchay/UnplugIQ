import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, LoadingSpinner, Button } from '@/components/common';
import { ChallengeTypeBadge, PreviousSubmission } from '@/components/challenges';
import { SubmissionForm } from '@/components/forms';
import { useAuth } from '@/hooks/useAuth';
import { ChallengeService } from '@/services/challengeService';
import { SubmissionService } from '@/services/submissionService';
import { Challenge, Submission } from '@/types/models';
import './ChallengeDetailPage.css';

/**
 * Challenge detail page component with full challenge information
 * and submission functionality
 */
const ChallengeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [existingSubmission, setExistingSubmission] = useState<Submission | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

  const challengeId = id ? parseInt(id, 10) : null;

  useEffect(() => {
    if (!challengeId) {
      setError('Invalid challenge ID');
      setIsLoading(false);
      return;
    }

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    loadChallengeData();
  }, [challengeId, isAuthenticated, navigate]);

  const loadChallengeData = async () => {
    if (!challengeId) return;

    try {
      setIsLoading(true);
      setError(null);

      // Load challenge details
      const challengeData = await ChallengeService.getChallengeById(challengeId);
      setChallenge(challengeData);

      // Check for existing submission
      const submission = await SubmissionService.getUserSubmissionForChallenge(challengeId);
      setExistingSubmission(submission);

      // Show form if no existing submission
      setShowSubmissionForm(!submission);
    } catch (err) {
      console.error('Error loading challenge data:', err);
      setError('Failed to load challenge details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmission = async (submissionText: string) => {
    if (!challengeId) return;

    try {
      setIsSubmitting(true);
      setError(null);

      if (existingSubmission) {
        // Update existing submission
        const updatedSubmission = await SubmissionService.updateSubmission(
          existingSubmission.id,
          submissionText
        );
        setExistingSubmission(updatedSubmission);
      } else {
        // Create new submission
        const userId = parseInt(localStorage.getItem('userId') || '1');
        const newSubmission = await SubmissionService.submitResponse({
          challengeId,
          submissionText,
          userId,
        });
        setExistingSubmission(newSubmission);
      }

      setShowSubmissionForm(false);
    } catch (err) {
      console.error('Error submitting response:', err);
      setError('Failed to submit your response. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmission = () => {
    setShowSubmissionForm(true);
    setError(null);
  };

  const handleBackToChallenges = () => {
    navigate('/challenges');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="challenge-detail-page">
        <div className="challenge-detail-page__loading">
          <LoadingSpinner size="large" message="Loading challenge details..." />
        </div>
      </div>
    );
  }

  if (error && !challenge) {
    return (
      <div className="challenge-detail-page">
        <Card variant="outlined" className="challenge-detail-page__error">
          <h2>Error Loading Challenge</h2>
          <p>{error}</p>
          <div className="challenge-detail-page__error-actions">
            <Button onClick={loadChallengeData} variant="primary">
              Try Again
            </Button>
            <Button onClick={handleBackToChallenges} variant="outline">
              Back to Challenges
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="challenge-detail-page">
        <Card variant="outlined" className="challenge-detail-page__not-found">
          <h2>Challenge Not Found</h2>
          <p>The challenge you're looking for doesn't exist or has been removed.</p>
          <Button onClick={handleBackToChallenges} variant="primary">
            Back to Challenges
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="challenge-detail-page">
      <div className="challenge-detail-page__header">
        <Button
          variant="outline"
          onClick={handleBackToChallenges}
          className="challenge-detail-page__back-button"
        >
          ← Back to Challenges
        </Button>
      </div>

      <Card variant="elevated" className="challenge-detail-page__challenge">
        <div className="challenge-detail-page__challenge-header">
          <div className="challenge-detail-page__challenge-meta">
            <ChallengeTypeBadge type={challenge.type} />
            <span className="challenge-detail-page__date">
              Posted on {formatDate(challenge.datePosted)}
            </span>
          </div>
          <h1 className="challenge-detail-page__title">{challenge.title}</h1>
        </div>

        <div className="challenge-detail-page__description">
          <h2>Challenge Description</h2>
          <div className="challenge-detail-page__description-content">
            {challenge.description}
          </div>
        </div>
      </Card>

      <div className="challenge-detail-page__submission-section">
        <h2 className="challenge-detail-page__section-title">Your Response</h2>
        
        {existingSubmission && !showSubmissionForm && (
          <PreviousSubmission
            submission={existingSubmission}
            onEdit={handleEditSubmission}
            showEditButton={true}
          />
        )}

        {showSubmissionForm && (
          <Card variant="outlined" className="challenge-detail-page__submission-form">
            <SubmissionForm
              challengeId={challengeId!}
              onSubmit={handleSubmission}
              isLoading={isSubmitting}
              error={error}
              existingSubmission={existingSubmission?.submissionText}
              maxLength={2000}
            />
          </Card>
        )}

        {!existingSubmission && !showSubmissionForm && (
          <Card variant="outlined" className="challenge-detail-page__no-submission">
            <h3>Ready to participate?</h3>
            <p>Share your thoughts and submit your response to this challenge.</p>
            <Button
              onClick={() => setShowSubmissionForm(true)}
              variant="primary"
              fullWidth
            >
              Start Your Response
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ChallengeDetailPage;
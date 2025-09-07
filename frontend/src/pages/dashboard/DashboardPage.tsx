import React, { useState, useEffect } from 'react';
import { Card, LoadingSpinner } from '@/components/common';
import { SubmissionHistory } from '@/components/profile';
import { SubmissionService } from '@/services';
import { useAuth } from '@/hooks';
import '../../styles/pages/DashboardPage.css';

interface DashboardStats {
  totalSubmissions: number;
  challengesCompleted: number;
  averageSubmissionLength: number;
  submissionsByType: Record<string, number>;
}

/**
 * Dashboard page with user statistics and recent activity
 * Requirements 4.1, 4.4: Show summary statistics and dashboard view
 */
const DashboardPage: React.FC = () => {
  const authState = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const userStats = await SubmissionService.getUserSubmissionStats();
        setStats(userStats);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    if (authState.user) {
      fetchDashboardData();
    }
  }, [authState.user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-page__loading">
          <LoadingSpinner />
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-page__error">
          <h1>Dashboard</h1>
          <Card variant="outlined" className="dashboard-page__error-card">
            <p>Error loading dashboard: {error}</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-page__header">
        <h1>Welcome back, {authState.user?.username}!</h1>
        <p className="dashboard-page__subtitle">
          Member since {authState.user ? formatDate(authState.user.createdAt) : ''}
        </p>
      </div>

      {/* Statistics Cards - Requirement 4.4 */}
      <div className="dashboard-page__stats">
        <Card variant="elevated" className="dashboard-stat-card">
          <div className="dashboard-stat-card__content">
            <div className="dashboard-stat-card__icon">📝</div>
            <div className="dashboard-stat-card__info">
              <h3 className="dashboard-stat-card__value">
                {stats?.totalSubmissions || 0}
              </h3>
              <p className="dashboard-stat-card__label">Total Submissions</p>
            </div>
          </div>
        </Card>

        <Card variant="elevated" className="dashboard-stat-card">
          <div className="dashboard-stat-card__content">
            <div className="dashboard-stat-card__icon">🎯</div>
            <div className="dashboard-stat-card__info">
              <h3 className="dashboard-stat-card__value">
                {stats?.challengesCompleted || 0}
              </h3>
              <p className="dashboard-stat-card__label">Challenges Completed</p>
            </div>
          </div>
        </Card>

        <Card variant="elevated" className="dashboard-stat-card">
          <div className="dashboard-stat-card__content">
            <div className="dashboard-stat-card__icon">📊</div>
            <div className="dashboard-stat-card__info">
              <h3 className="dashboard-stat-card__value">
                {stats?.averageSubmissionLength ? Math.round(stats.averageSubmissionLength) : 0}
              </h3>
              <p className="dashboard-stat-card__label">Avg. Words per Submission</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Challenge Type Breakdown */}
      {stats && Object.keys(stats.submissionsByType).length > 0 && (
        <Card variant="outlined" className="dashboard-page__breakdown">
          <h3>Submissions by Challenge Type</h3>
          <div className="dashboard-breakdown__items">
            {Object.entries(stats.submissionsByType).map(([type, count]) => (
              <div key={type} className="dashboard-breakdown__item">
                <span className="dashboard-breakdown__type">{type}</span>
                <span className="dashboard-breakdown__count">{count}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recent Activity */}
      <div className="dashboard-page__recent">
        <SubmissionHistory limit={5} />
      </div>
    </div>
  );
};

export default DashboardPage;
import React from 'react';
import { ProfileView, SubmissionHistory } from '@/components/profile';
import { useAuth } from '@/hooks';
import { LoadingSpinner } from '@/components/common';
import '../../styles/pages/ProfilePage.css';

/**
 * Profile page component displaying user information and submission history
 * Requirements 4.1, 4.2, 4.5: Display user profile and allow viewing account information
 */
const ProfilePage: React.FC = () => {
  const authState = useAuth();

  if (authState.isLoading) {
    return (
      <div className="profile-page">
        <div className="profile-page__loading">
          <LoadingSpinner />
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!authState.user) {
    return (
      <div className="profile-page">
        <div className="profile-page__error">
          <h1>Profile</h1>
          <p>Unable to load user profile. Please try logging in again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-page__header">
        <h1>My Profile</h1>
        <p className="profile-page__subtitle">
          Manage your account information and view your activity
        </p>
      </div>

      <div className="profile-page__content">
        <div className="profile-page__profile-section">
          <ProfileView user={authState.user} />
        </div>

        <div className="profile-page__history-section">
          <SubmissionHistory />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
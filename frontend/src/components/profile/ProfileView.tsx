import React from 'react';
import { User } from '@/types';
import { Card } from '@/components/common';
import '../../styles/components/ProfileView.css';

interface ProfileViewProps {
  user: User;
}

/**
 * ProfileView component displaying user information
 */
const ProfileView: React.FC<ProfileViewProps> = ({ user }) => {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

  return (
    <Card variant="outlined" className="profile-view">
      <div className="profile-view__header">
        <div className="profile-view__avatar">
          <span className="profile-view__avatar-text">
            {user.username.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="profile-view__info">
          <h2 className="profile-view__username">{user.username}</h2>
          <p className="profile-view__role">{user.role}</p>
        </div>
      </div>

      <div className="profile-view__details">
        <div className="profile-view__field">
          <label className="profile-view__label">Email</label>
          <span className="profile-view__value">{user.email}</span>
        </div>

        <div className="profile-view__field">
          <label className="profile-view__label">Member Since</label>
          <span className="profile-view__value">{formatDate(user.createdAt)}</span>
        </div>

        <div className="profile-view__field">
          <label className="profile-view__label">User ID</label>
          <span className="profile-view__value">#{user.id}</span>
        </div>
      </div>
    </Card>
  );
};

export default ProfileView;

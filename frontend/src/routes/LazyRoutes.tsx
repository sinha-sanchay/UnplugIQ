import { lazy } from 'react';

// Lazy-loaded page components for code splitting
export const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
export const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));
export const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage'));
export const ChallengesPage = lazy(() => import('../pages/challenges/ChallengesPage'));
export const ChallengeDetailPage = lazy(() => import('../pages/challenges/ChallengeDetailPage'));
export const ProfilePage = lazy(() => import('../pages/profile/ProfilePage'));
export const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
export const UnauthorizedPage = lazy(() => import('../pages/UnauthorizedPage'));
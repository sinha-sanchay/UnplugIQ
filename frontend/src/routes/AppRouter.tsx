import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import AuthGuard from '../components/common/AuthGuard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {
  LoginPage,
  RegisterPage,
  DashboardPage,
  ChallengesPage,
  ChallengeDetailPage,
  ProfilePage,
  NotFoundPage,
  UnauthorizedPage
} from './LazyRoutes';

/**
 * Main application router with route definitions and lazy loading
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
        <Routes>
          {/* Public routes */}
          <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          
          {/* Protected routes */}
          <Route 
            path={ROUTES.DASHBOARD} 
            element={
              <AuthGuard>
                <DashboardPage />
              </AuthGuard>
            } 
          />
          <Route 
            path={ROUTES.CHALLENGES} 
            element={
              <AuthGuard>
                <ChallengesPage />
              </AuthGuard>
            } 
          />
          <Route 
            path={ROUTES.CHALLENGE_DETAIL} 
            element={
              <AuthGuard>
                <ChallengeDetailPage />
              </AuthGuard>
            } 
          />
          <Route 
            path={ROUTES.PROFILE} 
            element={
              <AuthGuard>
                <ProfilePage />
              </AuthGuard>
            } 
          />
          
          {/* Error routes */}
          <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
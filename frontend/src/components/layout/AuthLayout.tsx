import React from 'react';
import './AuthLayout.css';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

/**
 * Layout component for authentication pages
 */
const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  title = 'Challenge Platform',
  subtitle = 'Welcome to our challenge platform'
}) => {
  return (
    <div className="auth-layout">
      <div className="auth-layout__container">
        <div className="auth-layout__header">
          <h1 className="auth-layout__brand">{title}</h1>
          {subtitle && (
            <p className="auth-layout__description">{subtitle}</p>
          )}
        </div>
        
        <div className="auth-layout__content">
          {children}
        </div>
        
        <div className="auth-layout__footer">
          <p className="auth-layout__footer-text">
            © 2024 Challenge Platform. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
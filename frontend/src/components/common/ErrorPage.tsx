import { ReactNode } from 'react';
import Button from './Button';
import '../../styles/components/ErrorPage.css';

export interface ErrorPageProps {
  title: string;
  message: string;
  icon?: ReactNode;
  actions?: ReactNode;
  showRetry?: boolean;
  onRetry?: () => void;
  showHome?: boolean;
  onHome?: () => void;
}

/**
 * Generic error page component for different error types
 */
const ErrorPage: React.FC<ErrorPageProps> = ({
  title,
  message,
  icon,
  actions,
  showRetry = false,
  onRetry,
  showHome = true,
  onHome,
}) => {
  const handleHome = () => {
    if (onHome) {
      onHome();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="error-page">
      <div className="error-page__container">
        {icon && <div className="error-page__icon">{icon}</div>}
        <h1 className="error-page__title">{title}</h1>
        <p className="error-page__message">{message}</p>
        
        <div className="error-page__actions">
          {showRetry && onRetry && (
            <Button onClick={onRetry} variant="primary">
              Try Again
            </Button>
          )}
          {showHome && (
            <Button onClick={handleHome} variant={showRetry ? 'outline' : 'primary'}>
              Go Home
            </Button>
          )}
          {actions}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
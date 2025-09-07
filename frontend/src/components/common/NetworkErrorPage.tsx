import { useState, useEffect } from 'react';
import ErrorPage from './ErrorPage';
import Button from './Button';

export interface NetworkErrorPageProps {
  onRetry?: () => void;
  onHome?: () => void;
}

/**
 * Network error page with offline detection and retry functionality
 */
const NetworkErrorPage: React.FC<NetworkErrorPageProps> = ({ onRetry, onHome }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = async () => {
    if (!isOnline) return;
    
    setIsRetrying(true);
    try {
      if (onRetry) {
        await onRetry();
      } else {
        // Default retry: reload the page
        window.location.reload();
      }
    } catch (error) {
      console.error('Retry failed:', error);
    } finally {
      setIsRetrying(false);
    }
  };

  const getTitle = () => {
    if (!isOnline) {
      return 'You\'re Offline';
    }
    return 'Connection Problem';
  };

  const getMessage = () => {
    if (!isOnline) {
      return 'Please check your internet connection and try again when you\'re back online.';
    }
    return 'We\'re having trouble connecting to our servers. Please check your internet connection and try again.';
  };

  const getIcon = () => {
    if (!isOnline) {
      return '📡';
    }
    return '🌐';
  };

  const customActions = (
    <>
      {isOnline && (
        <Button
          onClick={handleRetry}
          variant="primary"
          disabled={isRetrying}
        >
          {isRetrying ? 'Retrying...' : 'Try Again'}
        </Button>
      )}
      {!isOnline && (
        <div className="network-status">
          <span className="network-status__indicator network-status__indicator--offline">
            Offline
          </span>
          <p className="network-status__message">
            You'll be able to retry once your connection is restored.
          </p>
        </div>
      )}
    </>
  );

  return (
    <ErrorPage
      title={getTitle()}
      message={getMessage()}
      icon={getIcon()}
      actions={customActions}
      showRetry={false} // We handle retry in custom actions
      showHome={true}
      onHome={onHome}
    />
  );
};

export default NetworkErrorPage;
import ErrorPage from './ErrorPage';

export interface ServerErrorPageProps {
  statusCode?: number;
  onRetry?: () => void;
  onHome?: () => void;
}

/**
 * Server error page for 5xx errors
 */
const ServerErrorPage: React.FC<ServerErrorPageProps> = ({
  statusCode = 500,
  onRetry,
  onHome,
}) => {
  const getTitle = () => {
    switch (statusCode) {
      case 502:
        return 'Bad Gateway';
      case 503:
        return 'Service Unavailable';
      case 504:
        return 'Gateway Timeout';
      default:
        return 'Server Error';
    }
  };

  const getMessage = () => {
    switch (statusCode) {
      case 502:
        return 'The server received an invalid response. Our team has been notified and is working to fix this issue.';
      case 503:
        return 'The service is temporarily unavailable due to maintenance or high load. Please try again in a few minutes.';
      case 504:
        return 'The server took too long to respond. Please try again in a moment.';
      default:
        return 'Something went wrong on our end. Our team has been notified and is working to fix this issue.';
    }
  };

  return (
    <ErrorPage
      title={getTitle()}
      message={getMessage()}
      icon="🔧"
      showRetry={true}
      onRetry={onRetry}
      showHome={true}
      onHome={onHome}
    />
  );
};

export default ServerErrorPage;
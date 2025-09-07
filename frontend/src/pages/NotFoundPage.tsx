import { useNavigate } from 'react-router-dom';
import { ErrorPage } from '../components/common';
import { ROUTES } from '../utils/routes';

/**
 * 404 Not Found page component
 */
const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <ErrorPage
      title="Page Not Found"
      message="The page you're looking for doesn't exist or may have been moved."
      icon="🔍"
      showHome={true}
      onHome={handleGoHome}
    />
  );
};

export default NotFoundPage;
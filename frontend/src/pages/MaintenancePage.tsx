import { ErrorPage } from '../components/common';

/**
 * Maintenance page component
 */
const MaintenancePage = () => {
  return (
    <ErrorPage
      title="Under Maintenance"
      message="We're currently performing scheduled maintenance to improve your experience. Please check back in a few minutes."
      icon="🔧"
      showHome={false}
      showRetry={true}
      onRetry={() => window.location.reload()}
    />
  );
};

export default MaintenancePage;
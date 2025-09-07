import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/routes';

/**
 * Unauthorized access page component
 */
const UnauthorizedPage = () => {
  return (
    <div className="unauthorized-page">
      <h1>401 - Unauthorized</h1>
      <p>You don't have permission to access this page.</p>
      <Link to={ROUTES.LOGIN}>Go to Login</Link>
    </div>
  );
};

export default UnauthorizedPage;
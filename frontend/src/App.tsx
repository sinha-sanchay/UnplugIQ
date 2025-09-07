import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { GlobalErrorHandler } from './services/globalErrorHandler';
import { useNetworkStatus } from './hooks/useNetworkStatus';
import AppRouter from './routes/AppRouter';
import ErrorBoundary from './components/common/ErrorBoundary';
import './styles/App.css';

// Inner App component that has access to toast context
function AppContent() {
  const { showError, showWarning, showInfo } = useToast();
  const { isOnline, wasOffline } = useNetworkStatus();

  useEffect(() => {
    // Initialize global error handler
    GlobalErrorHandler.initialize({
      showToast: (type, title, message) => {
        switch (type) {
          case 'error':
            showError(title, message);
            break;
          case 'warning':
            showWarning(title, message);
            break;
          case 'info':
            showInfo(title, message);
            break;
        }
      },
      onAuthError: () => {
        // Custom auth error handling can be added here
        console.log('Authentication error occurred');
      },
      onNetworkError: () => {
        // Custom network error handling can be added here
        console.log('Network error occurred');
      },
      onServerError: (error) => {
        // Custom server error handling can be added here
        console.log('Server error occurred:', error);
      },
    });
  }, [showError, showWarning, showInfo]);

  // Handle network status changes
  useEffect(() => {
    if (!isOnline) {
      GlobalErrorHandler.handleOffline();
    } else if (wasOffline && isOnline) {
      GlobalErrorHandler.handleOnline();
    }
  }, [isOnline, wasOffline]);

  return (
    <div className="app">
      <AppRouter />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <AppProvider>
            <AppContent />
          </AppProvider>
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { ToastProps } from '../components/common/Toast';
import ToastContainer from '../components/common/ToastContainer';

interface ToastState {
  toasts: ToastProps[];
}

type ToastAction =
  | { type: 'ADD_TOAST'; payload: Omit<ToastProps, 'onClose'> }
  | { type: 'REMOVE_TOAST'; payload: string };

interface ToastContextType {
  addToast: (toast: Omit<ToastProps, 'id' | 'onClose'>) => void;
  removeToast: (id: string) => void;
  showSuccess: (title: string, message?: string) => void;
  showError: (title: string, message?: string) => void;
  showWarning: (title: string, message?: string) => void;
  showInfo: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, { ...action.payload, onClose: () => {} }],
      };
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload),
      };
    default:
      return state;
  }
};

interface ToastProviderProps {
  children: ReactNode;
}

/**
 * Toast context provider for managing toast notifications
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });

  const generateId = () => `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const addToast = (toast: Omit<ToastProps, 'id' | 'onClose'>) => {
    const id = generateId();
    dispatch({
      type: 'ADD_TOAST',
      payload: { ...toast, id },
    });
  };

  const removeToast = (id: string) => {
    dispatch({ type: 'REMOVE_TOAST', payload: id });
  };

  const showSuccess = (title: string, message?: string) => {
    addToast({ type: 'success', title, message });
  };

  const showError = (title: string, message?: string) => {
    addToast({ type: 'error', title, message, duration: 7000 }); // Longer duration for errors
  };

  const showWarning = (title: string, message?: string) => {
    addToast({ type: 'warning', title, message });
  };

  const showInfo = (title: string, message?: string) => {
    addToast({ type: 'info', title, message });
  };

  const contextValue: ToastContextType = {
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={state.toasts} onRemoveToast={removeToast} />
    </ToastContext.Provider>
  );
};

/**
 * Hook for using toast notifications
 */
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastContext;
import { createPortal } from 'react-dom';
import Toast, { ToastProps } from './Toast';
import '../../styles/components/ToastContainer.css';

export interface ToastContainerProps {
  toasts: ToastProps[];
  onRemoveToast: (id: string) => void;
}

/**
 * Container for managing multiple toast notifications
 */
const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemoveToast }) => {
  if (toasts.length === 0) return null;

  return createPortal(
    <div className="toast-container" aria-live="polite" aria-label="Notifications">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={onRemoveToast}
        />
      ))}
    </div>,
    document.body
  );
};

export default ToastContainer;
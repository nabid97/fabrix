import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

// Toast types
export type ToastType = 'success' | 'error' | 'info' | 'warning';

// Toast item interface
export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  title?: string;
}

// Context interface
interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  removeAllToasts: () => void;
}

// Create context with default values
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Custom hook to use the toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
};

// Toast Provider props
interface ToastProviderProps {
  children: ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  maxToasts?: number;
}

// Toast Provider component
export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'top-right',
  maxToasts = 5,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  // Generate position classes
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'top-4 right-4';
    }
  };
  
  // Add a new toast
  const addToast = useCallback(
    ({ message, type, duration = 5000, title }: Omit<Toast, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
      // Add the new toast to the list
      setToasts((prevToasts) => {
        // Keep only the most recent toasts if we exceed maxToasts
        const updatedToasts = [...prevToasts, { id, message, type, duration, title }];
        
        if (updatedToasts.length > maxToasts) {
          return updatedToasts.slice(updatedToasts.length - maxToasts);
        }
        
        return updatedToasts;
      });
      
      // Remove the toast after its duration
      if (duration !== Infinity) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [maxToasts]
  );
  
  // Remove a toast by id
  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);
  
  // Remove all toasts
  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);
  
  // Get the appropriate icon based on toast type
  const getToastIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };
  
  // Get the appropriate background color based on toast type
  const getToastStyles = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-white border-gray-200';
    }
  };
  
  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, removeAllToasts }}>
      {children}
      
      {/* Toast container */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className={`fixed z-50 w-full md:max-w-sm flex flex-col space-y-4 ${getPositionClasses()}`}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${getToastStyles(
              toast.type
            )} border p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-y-0 opacity-100 flex items-start`}
            role="alert"
          >
            <div className="flex-shrink-0 mr-3">{getToastIcon(toast.type)}</div>
            <div className="flex-1 mr-2">
              {toast.title && <h4 className="text-sm font-medium">{toast.title}</h4>}
              <div className="text-sm text-gray-600">{toast.message}</div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-700 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastContext;
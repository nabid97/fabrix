import React from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { ToastType } from '../../contexts/ToastContext';

export interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
  onClose: (id: string) => void;
}

/**
 * Individual Toast component
 */
const Toast: React.FC<ToastProps> = ({ id, type, message, title, onClose }) => {
  const getIcon = () => {
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
  
  const getStyles = () => {
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
    <div
      className={`${getStyles()} border p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-y-0 opacity-100 flex items-start w-full`}
      role="alert"
    >
      <div className="flex-shrink-0 mr-3">{getIcon()}</div>
      <div className="flex-1 mr-2">
        {title && <h4 className="text-sm font-medium">{title}</h4>}
        <div className="text-sm text-gray-600">{message}</div>
      </div>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-700 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;
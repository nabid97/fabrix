import React, { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
  closeOnEsc?: boolean;
  closeOnOutsideClick?: boolean;
  className?: string;
}

/**
 * Reusable side panel component
 */
const SidePanel: React.FC<SidePanelProps> = ({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
  size = 'md',
  showCloseButton = true,
  closeOnEsc = true,
  closeOnOutsideClick = true,
  className = '',
}) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (closeOnEsc && isOpen && event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      // Prevent body scrolling when panel is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      // Restore body scrolling when panel is closed
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, closeOnEsc]);

  // Handle outside click
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOutsideClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  // Determine width based on size
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  }[size];

  // Determine position classes
  const positionClasses = {
    left: 'left-0',
    right: 'right-0',
  }[position];

  // Animation classes based on position
  const animationClasses = isOpen
    ? position === 'right'
      ? 'translate-x-0'
      : 'translate-x-0'
    : position === 'right'
    ? 'translate-x-full'
    : '-translate-x-full';

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex"
      onClick={handleOutsideClick}
    >
      <div
        className={`${sizeClasses} ${positionClasses} ${animationClasses} w-full h-full bg-white shadow-xl transition-transform duration-300 ease-in-out flex flex-col ${className}`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          {showCloseButton && (
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close panel"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
};

export default SidePanel;
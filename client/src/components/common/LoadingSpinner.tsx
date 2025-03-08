import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = 'teal',
  message = 'Loading...'
}) => {
  // Determine size class
  const sizeClass = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  }[size];
  
  // Determine color class
  const colorClass = {
    teal: 'border-teal-600',
    blue: 'border-blue-600',
    indigo: 'border-indigo-600',
    purple: 'border-purple-600',
    gray: 'border-gray-600'
  }[color as string] || 'border-teal-600';

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className={`${sizeClass} border-4 ${colorClass} border-t-transparent rounded-full animate-spin`}></div>
      {message && <p className="mt-4 text-gray-600">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
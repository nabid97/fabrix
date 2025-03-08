import React, { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';

// Common props for all form elements
interface BaseProps {
  label?: string;
  error?: string;
  hint?: string;
  className?: string;
  fullWidth?: boolean;
  required?: boolean;
}

// Input component props
export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, BaseProps {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

// Textarea component props
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, BaseProps {}

// Select component props
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>, BaseProps {
  options: Array<{ value: string; label: string }>;
  fullWidth?: boolean;
  placeholder?: string;  // Add this line
}

// Checkbox component props
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>, BaseProps {
  checkboxLabel: string;
}

/**
 * Input component with integrated label, error, and hint text
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      className = '',
      fullWidth = true,
      required = false,
      icon,
      iconPosition = 'left',
      ...props
    },
    ref
  ) => {
    const hasError = !!error;
    
    return (
      <div className={`mb-4 ${fullWidth ? 'w-full' : 'w-auto'} ${className}`}>
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`appearance-none block ${fullWidth ? 'w-full' : 'w-auto'} px-3 py-2 border ${
              hasError
                ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500'
            } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              icon && iconPosition === 'left' ? 'pl-10' : ''
            } ${icon && iconPosition === 'right' ? 'pr-10' : ''} disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed`}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${props.id}-error` : undefined}
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
        </div>
        {hint && !hasError && <p className="mt-1 text-sm text-gray-500">{hint}</p>}
        {hasError && (
          <p className="mt-1 text-sm text-red-600 flex items-center" id={`${props.id}-error`}>
            <AlertCircle className="h-4 w-4 mr-1" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

/**
 * Textarea component with integrated label, error, and hint text
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = '', fullWidth = true, required = false, ...props }, ref) => {
    const hasError = !!error;
    
    return (
      <div className={`mb-4 ${fullWidth ? 'w-full' : 'w-auto'} ${className}`}>
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={`appearance-none block ${fullWidth ? 'w-full' : 'w-auto'} px-3 py-2 border ${
            hasError
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500'
          } rounded-md shadow-sm focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed`}
          rows={4}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${props.id}-error` : undefined}
          {...props}
        />
        {hint && !hasError && <p className="mt-1 text-sm text-gray-500">{hint}</p>}
        {hasError && (
          <p className="mt-1 text-sm text-red-600 flex items-center" id={`${props.id}-error`}>
            <AlertCircle className="h-4 w-4 mr-1" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

/**
 * Select component with integrated label, error, and hint text
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, hint, className = '', fullWidth = true, required = false, options = [], ...props },
    ref
  ) => {
    const hasError = !!error;
    
    return (
      <div className={`mb-4 ${fullWidth ? 'w-full' : 'w-auto'} ${className}`}>
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={`appearance-none block ${fullWidth ? 'w-full' : 'w-auto'} px-3 py-2 border ${
            hasError
              ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-teal-500 focus:border-teal-500'
          } rounded-md shadow-sm focus:outline-none focus:ring-2 bg-white disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed`}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${props.id}-error` : undefined}
          {...props}
        >
          {!props.value && !props.defaultValue && (
            <option value="" disabled>
              {props.placeholder || 'Select an option'}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {hint && !hasError && <p className="mt-1 text-sm text-gray-500">{hint}</p>}
        {hasError && (
          <p className="mt-1 text-sm text-red-600 flex items-center" id={`${props.id}-error`}>
            <AlertCircle className="h-4 w-4 mr-1" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

/**
 * Checkbox component with integrated label, error, and hint text
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { checkboxLabel, label, error, hint, className = '', fullWidth = true, required = false, ...props },
    ref
  ) => {
    const hasError = !!error;
    
    return (
      <div className={`mb-4 ${fullWidth ? 'w-full' : 'w-auto'} ${className}`}>
        {label && (
          <div className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
          </div>
        )}
        <div className="flex items-center">
          <input
            ref={ref}
            type="checkbox"
            className={`h-4 w-4 ${
              hasError
                ? 'text-red-600 border-red-300 focus:ring-red-500'
                : 'text-teal-600 border-gray-300 focus:ring-teal-500'
            } rounded focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${props.id}-error` : undefined}
            {...props}
          />
          <label htmlFor={props.id} className="ml-2 block text-sm text-gray-700">
            {checkboxLabel}
          </label>
        </div>
        {hint && !hasError && <p className="mt-1 text-sm text-gray-500">{hint}</p>}
        {hasError && (
          <p className="mt-1 text-sm text-red-600 flex items-center" id={`${props.id}-error`}>
            <AlertCircle className="h-4 w-4 mr-1" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

/**
 * Radio group component
 */
export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends BaseProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  direction?: 'horizontal' | 'vertical';
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  error,
  hint,
  className = '',
  fullWidth = true,
  required = false,
  name,
  options,
  value,
  onChange,
  direction = 'vertical',
}) => {
  const hasError = !!error;
  
  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : 'w-auto'} ${className}`}>
      {label && (
        <div className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </div>
      )}
      <div
        className={`space-${direction === 'vertical' ? 'y' : 'x'}-4 ${
          direction === 'horizontal' ? 'flex items-center flex-wrap' : ''
        }`}
      >
        {options.map((option) => (
          <div key={option.value} className={`flex items-center ${direction === 'horizontal' ? 'mr-4' : ''}`}>
            <input
              id={`${name}-${option.value}`}
              name={name}
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              disabled={option.disabled}
              className={`h-4 w-4 ${
                hasError
                  ? 'text-red-600 border-red-300 focus:ring-red-500'
                  : 'text-teal-600 border-gray-300 focus:ring-teal-500'
              } focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            <label htmlFor={`${name}-${option.value}`} className="ml-2 block text-sm text-gray-700">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {hint && !hasError && <p className="mt-1 text-sm text-gray-500">{hint}</p>}
      {hasError && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

/**
 * Form section component to group related form elements
 */
export interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  className = '',
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      {title && <h3 className="text-lg font-medium text-gray-800 mb-2">{title}</h3>}
      {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}
      <div className="space-y-4">{children}</div>
    </div>
  );
};

/**
 * Form error summary component to display form-level errors
 */
export interface FormErrorSummaryProps {
  errors?: string | string[];
  className?: string;
}

export const FormErrorSummary: React.FC<FormErrorSummaryProps> = ({ errors, className = '' }) => {
  if (!errors || (Array.isArray(errors) && errors.length === 0)) {
    return null;
  }
  
  const errorArray = typeof errors === 'string' ? [errors] : errors;
  
  return (
    <div
      className={`mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg ${className}`}
      role="alert"
    >
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-sm font-medium">There were errors with your submission</h3>
          {errorArray.length > 1 ? (
            <ul className="mt-2 ml-4 text-sm list-disc">
              {errorArray.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-sm">{errorArray[0]}</p>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Form component with error handling and submission state
 */
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errors?: string | string[];
  isSubmitting?: boolean;
  submitText?: string;
  cancelText?: string;
  onCancel?: () => void;
  className?: string;
}

export const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  errors,
  isSubmitting = false,
  submitText = 'Submit',
  cancelText = 'Cancel',
  onCancel,
  className = '',
  ...props
}) => {
  return (
    <form onSubmit={onSubmit} className={className} noValidate {...props}>
      <FormErrorSummary errors={errors} />
      {children}
      <div className="flex justify-end space-x-4 mt-8">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            disabled={isSubmitting}
          >
            {cancelText}
          </button>
        )}
        <button
          type="submit"
          className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            submitText
          )}
        </button>
      </div>
    </form>
  );
};
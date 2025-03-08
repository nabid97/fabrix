import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AlertCircle } from 'lucide-react';
import { isValidEmail, isValidPassword } from '../utils/validationUtils';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect URL from query params
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect') || '/';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, redirectTo]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate name
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Validate email
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!isValidPassword(password)) {
      newErrors.password = 'Password must be at least 8 characters with at least one uppercase, lowercase, number, and special character';
    }

    // Validate confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await register(email, password, name);
      // Registration successful, navigate to redirectTo
      navigate(redirectTo);
    } catch (error: any) {
      setApiError(error.message || 'Registration failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Create an Account</h1>
          <p className="mt-2 text-gray-600">
            Join FabriX to access custom clothing and premium fabrics.
          </p>
        </div>

        {apiError && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
            <AlertCircle className="mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
            <span>{apiError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`appearance-none relative block w-full px-3 py-2 border ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm`}
              placeholder="John Doe"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`appearance-none relative block w-full px-3 py-2 border ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm`}
              placeholder="email@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`appearance-none relative block w-full px-3 py-2 border ${
                errors.password ? 'border-red-300' : 'border-gray-300'
              } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm`}
              placeholder="********"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`appearance-none relative block w-full px-3 py-2 border ${
                errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
              } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm`}
              placeholder="********"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
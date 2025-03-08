import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design with media queries
 * @param query - CSS media query string
 * @returns Boolean indicating if the media query matches
 */
const useMediaQuery = (query: string): boolean => {
  // Initialize with false to avoid SSR mismatch issues
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Return early if not in browser environment
    if (typeof window === 'undefined') {
      return;
    }

    // Create media query list
    const mediaQuery = window.matchMedia(query);
    
    // Update matches state based on query result
    const updateMatches = () => setMatches(mediaQuery.matches);
    
    // Set initial value
    updateMatches();
    
    // Listen for changes
    mediaQuery.addEventListener('change', updateMatches);
    
    // Clean up
    return () => mediaQuery.removeEventListener('change', updateMatches);
  }, [query]);

  return matches;
};

// Preset breakpoints
export const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
};

// Convenience functions for common breakpoints
export const useIsMobile = (): boolean => !useMediaQuery(breakpoints.md);
export const useIsTablet = (): boolean => 
  useMediaQuery(breakpoints.md) && !useMediaQuery(breakpoints.lg);
export const useIsDesktop = (): boolean => useMediaQuery(breakpoints.lg);

export default useMediaQuery;
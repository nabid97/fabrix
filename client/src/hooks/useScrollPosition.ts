import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll position
 * @param threshold - Optional threshold value to determine when scroll position is considered "scrolled"
 * @returns Object containing scroll position and boolean indicating if scrolled past threshold
 */
const useScrollPosition = (threshold: number = 100): { 
  scrollY: number;
  isScrolled: boolean;
} => {
  const [scrollY, setScrollY] = useState<number>(
    typeof window !== 'undefined' ? window.scrollY : 0
  );
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    // Function to run on scroll
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > threshold);
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Call handler right away to get initial state
    handleScroll();
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { scrollY, isScrolled };
};

export default useScrollPosition;
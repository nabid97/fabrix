// Theme colors for the application
export const colors = {
    primary: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6',
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a',
      950: '#042f2e',
    },
    secondary: {
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
      950: '#2e1065',
    },
    success: '#10b981', // emerald-500
    warning: '#f59e0b', // amber-500
    error: '#ef4444',   // red-500
    info: '#3b82f6',    // blue-500
  };
  
  // Font settings
  export const fonts = {
    sans: 'Inter, system-ui, sans-serif',
    heading: 'Montserrat, sans-serif',
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
    },
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  };
  
  // Border radius
  export const radius = {
    none: '0',
    sm: '0.125rem',     // 2px
    DEFAULT: '0.25rem', // 4px
    md: '0.375rem',     // 6px
    lg: '0.5rem',       // 8px
    xl: '0.75rem',      // 12px
    '2xl': '1rem',      // 16px
    '3xl': '1.5rem',    // 24px
    full: '9999px',     // Full round (circles)
  };
  
  // Spacing scale (can be used for margin, padding, etc.)
  export const spacing = {
    px: '1px',
    0: '0',
    0.5: '0.125rem',    // 2px
    1: '0.25rem',       // 4px
    1.5: '0.375rem',    // 6px
    2: '0.5rem',        // 8px
    2.5: '0.625rem',    // 10px
    3: '0.75rem',       // 12px
    4: '1rem',          // 16px
    5: '1.25rem',       // 20px
    6: '1.5rem',        // 24px
    8: '2rem',          // 32px
    10: '2.5rem',       // 40px
    12: '3rem',         // 48px
    16: '4rem',         // 64px
    20: '5rem',         // 80px
    24: '6rem',         // 96px
    32: '8rem',         // 128px
    40: '10rem',        // 160px
    48: '12rem',        // 192px
    56: '14rem',        // 224px
    64: '16rem',        // 256px
    72: '18rem',        // 288px
    80: '20rem',        // 320px
  };
  
  // Breakpoints for responsive design
  export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  };
  
  // Z-index values
  export const zIndex = {
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    auto: 'auto',
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    drawer: '1040',
    modal: '1050',
    popover: '1060',
    tooltip: '1070',
  };
  
  // Shadow styles
  export const shadows = {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
  };
  
  // Animation durations
  export const durations = {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms',
  };
  
  // Common styling presets
  export const presets = {
    card: {
      base: 'bg-white rounded-xl shadow-md overflow-hidden',
      hover: 'hover:shadow-lg transition-shadow duration-300',
    },
    button: {
      base: 'font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2',
      primary: 'bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500',
      secondary: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
      outline: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50',
      sizes: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
      }
    },
    input: {
      base: 'block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500',
      error: 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500',
    }
  };
  
  // Combined theme object
  const theme = {
    colors,
    fonts,
    radius,
    spacing,
    breakpoints,
    zIndex,
    shadows,
    durations,
    presets,
  };
  
  export default theme;
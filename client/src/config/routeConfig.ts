/**
 * Route configuration for the application
 */

// Define route path constants
export const ROUTES = {
    // Public routes
    HOME: '/',
    CLOTHING: '/clothing',
    CLOTHING_DETAIL: '/clothing/:id',
    FABRICS: '/fabrics',
    FABRIC_DETAIL: '/fabrics/:id',
    LOGO_GENERATOR: '/logo-generator',
    CONTACT: '/contact',
    FAQ: '/faq',
    LOGIN: '/login',
    REGISTER: '/register',
    CART: '/cart',
    
    // Protected routes (require authentication)
    CHECKOUT: '/checkout',
    ORDER_CONFIRMATION: '/order-confirmation/:orderId',
    PROFILE: '/profile',
    MY_ORDERS: '/orders',
    ORDER_DETAIL: '/orders/:id',
    
    // Admin routes
    ADMIN: '/admin',
    ADMIN_DASHBOARD: '/admin/dashboard',
    ADMIN_PRODUCTS: '/admin/products',
    ADMIN_ORDERS: '/admin/orders',
    ADMIN_CUSTOMERS: '/admin/customers',
  };
  
  // Navigation items for header
  export const HEADER_NAV_ITEMS = [
    { name: 'Home', path: ROUTES.HOME },
    { name: 'Clothing', path: ROUTES.CLOTHING },
    { name: 'Fabrics', path: ROUTES.FABRICS },
    { name: 'Logo Generator', path: ROUTES.LOGO_GENERATOR },
  ];
  
  // Footer navigation categories
  export const FOOTER_NAV_CATEGORIES = [
    {
      title: 'Products',
      items: [
        { name: 'Clothing', path: ROUTES.CLOTHING },
        { name: 'Fabrics', path: ROUTES.FABRICS },
        { name: 'Logo Generator', path: ROUTES.LOGO_GENERATOR },
      ],
    },
    {
      title: 'Customer Support',
      items: [
        { name: 'FAQ', path: ROUTES.FAQ },
        { name: 'Contact Us', path: ROUTES.CONTACT },
        { name: 'Shipping Policy', path: '/shipping' },
        { name: 'Returns & Refunds', path: '/returns' },
      ],
    },
    {
      title: 'Company',
      items: [
        { name: 'About Us', path: '/about' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Careers', path: '/careers' },
      ],
    },
  ];
  
  // Account navigation (when user is logged in)
  export const ACCOUNT_NAV_ITEMS = [
    { name: 'My Profile', path: ROUTES.PROFILE },
    { name: 'My Orders', path: ROUTES.MY_ORDERS },
  ];
  
  // Admin navigation items
  export const ADMIN_NAV_ITEMS = [
    { name: 'Dashboard', path: ROUTES.ADMIN_DASHBOARD },
    { name: 'Products', path: ROUTES.ADMIN_PRODUCTS },
    { name: 'Orders', path: ROUTES.ADMIN_ORDERS },
    { name: 'Customers', path: ROUTES.ADMIN_CUSTOMERS },
  ];
  
  /**
   * Check if a route is a protected route
   * @param path - Route path
   * @returns Boolean indicating if route requires authentication
   */
  export const isProtectedRoute = (path: string): boolean => {
    // Split path to handle dynamic routes
    const basePath = path.split('/').slice(0, 2).join('/');
    
    const protectedPaths = [
      '/checkout',
      '/order-confirmation',
      '/profile',
      '/orders',
      '/admin',
    ];
    
    return protectedPaths.some(p => basePath.startsWith(p));
  };
  
  /**
   * Check if a route is an admin route
   * @param path - Route path
   * @returns Boolean indicating if route requires admin privileges
   */
  export const isAdminRoute = (path: string): boolean => {
    return path.startsWith('/admin');
  };
  
  export default ROUTES;
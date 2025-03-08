// Export all configs from a central file
import configureAmplify from './amplifyConfig';
import api from './apiConfig';
import theme from './themeConfig';
import * as constants from './constants';
import ROUTES, { 
  HEADER_NAV_ITEMS,
  FOOTER_NAV_CATEGORIES,
  ACCOUNT_NAV_ITEMS,
  ADMIN_NAV_ITEMS,
  isProtectedRoute,
  isAdminRoute
} from './routeConfig';

// Main config object
const config = {
  api,
  theme,
  routes: {
    paths: ROUTES,
    headerNavItems: HEADER_NAV_ITEMS,
    footerNavCategories: FOOTER_NAV_CATEGORIES,
    accountNavItems: ACCOUNT_NAV_ITEMS,
    adminNavItems: ADMIN_NAV_ITEMS,
    isProtectedRoute,
    isAdminRoute
  },
  constants,
  configureAmplify
};

// Named exports
export {
  api,
  configureAmplify,
  theme,
  constants,
  ROUTES,
  HEADER_NAV_ITEMS,
  FOOTER_NAV_CATEGORIES,
  ACCOUNT_NAV_ITEMS,
  ADMIN_NAV_ITEMS,
  isProtectedRoute,
  isAdminRoute
};

// Default export
export default config;
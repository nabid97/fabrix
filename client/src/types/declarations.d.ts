/**
 * Type declarations for modules without type definitions
 */

// Declare image file modules
declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }
  
  declare module '*.jpg' {
    const content: string;
    export default content;
  }
  
  declare module '*.png' {
    const content: string;
    export default content;
  }
  
  declare module '*.jpeg' {
    const content: string;
    export default content;
  }
  
  declare module '*.gif' {
    const content: string;
    export default content;
  }
  
  declare module '*.webp' {
    const content: string;
    export default content;
  }
  
  // Declare font file modules
  declare module '*.woff' {
    const content: string;
    export default content;
  }
  
  declare module '*.woff2' {
    const content: string;
    export default content;
  }
  
  declare module '*.ttf' {
    const content: string;
    export default content;
  }
  
  declare module '*.eot' {
    const content: string;
    export default content;
  }
  
  // Declare JSON modules
  declare module '*.json' {
    const content: any;
    export default content;
  }
  
  // Declare CSS/SCSS modules
  declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
  }
  
  declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
  }
  
  // Declare environment variables
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    REACT_APP_API_URL: string;
    REACT_APP_AWS_REGION: string;
    REACT_APP_AWS_USER_POOL_ID: string;
    REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID: string;
    REACT_APP_STRIPE_PUBLISHABLE_KEY: string;
    [key: string]: string | undefined;
  }
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '../../config/constants';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  schemaData?: Record<string, any>;
}

/**
 * SEO component for managing document head data
 */
const SEO: React.FC<SEOProps> = ({
  title,
  description = SITE_DESCRIPTION,
  canonicalUrl,
  image,
  type = 'website',
  schemaData
}) => {
  // Format the title
  const formattedTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  
  // Determine the canonical URL
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');
  
  // Default OG image
  const ogImage = image || `${SITE_URL}/og-image.jpg`;
  
  // Build schema.org structured data
  const schema = schemaData || {
    '@context': 'http://schema.org',
    '@type': type === 'product' ? 'Product' : (type === 'article' ? 'Article' : 'WebSite'),
    name: title || SITE_NAME,
    description,
    url: currentUrl,
  };
  
  if (type === 'product' && !schemaData) {
    schema.image = ogImage;
  }

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{formattedTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default SEO;
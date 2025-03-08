// src/components/common/SEO.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '../../config/constants';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  schemaMarkup?: Record<string, any>;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description = SITE_DESCRIPTION,
  canonical,
  image,
  type = 'website',
  schemaMarkup,
}) => {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const pageUrl = canonical || SITE_URL;
  const imageUrl = image ? `${SITE_URL}${image}` : `${SITE_URL}/og-image.jpg`;

  return (
    <>
      <Helmet>
        {/* Basic meta tags */}
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph tags */}
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={type} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:site_name" content={SITE_NAME} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />

        {/* Schema.org markup */}
        {schemaMarkup && (
          <script type="application/ld+json">
            {JSON.stringify(schemaMarkup)}
          </script>
        )}
      </Helmet>
    </>
  );
};

export default SEO;
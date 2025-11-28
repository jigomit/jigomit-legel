import { useHead } from '@unhead/vue'

/**
 * Composable for managing SEO meta tags across the application
 * Provides dynamic meta tags, Open Graph, Twitter Cards, and canonical URLs
 */
export function useSEO(options = {}) {
  const {
    title = 'Legal Crest - Legal Marketing Studio',
    description = 'Elite legal marketing studio for Am Law 100 firms and boutiques',
    keywords = 'legal marketing, law firm marketing, lawyer services, legal consultation',
    canonical = '',
    ogImage = '/og-image.jpg',
    ogType = 'website',
    twitterCard = 'summary_large_image',
    author = 'Legal Crest',
    publishedTime = null,
    modifiedTime = null,
    locale = 'en_US',
    siteName = 'Legal Crest',
    ogImageAlt = 'Legal Crest legal marketing experts collaborating with clients',
    twitterHandle = '@legalcrest',
    twitterImageAlt = null,
  } = options

  const baseUrl = 'https://legalcrest.com'
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`
  const computedTwitterImageAlt = twitterImageAlt || ogImageAlt

  const headConfig = {
    title,
    meta: [
      // Primary Meta Tags
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: author },
      { name: 'robots', content: 'index, follow' },
       { name: 'language', content: locale },

      // Open Graph
      { property: 'og:type', content: ogType },
      { property: 'og:url', content: fullCanonical },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: fullOgImage },
      { property: 'og:image:alt', content: ogImageAlt },
      { property: 'og:site_name', content: siteName },
      { property: 'og:locale', content: locale },

      // Twitter Card
      { name: 'twitter:card', content: twitterCard },
      { name: 'twitter:site', content: twitterHandle },
      { name: 'twitter:creator', content: twitterHandle },
      { name: 'twitter:url', content: fullCanonical },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: fullOgImage },
      { name: 'twitter:image:alt', content: computedTwitterImageAlt },
    ],
    link: [
      // Canonical URL
      { rel: 'canonical', href: fullCanonical },
      { rel: 'alternate', hreflang: 'en', href: fullCanonical },
    ],
  }

  // Add article-specific meta tags if provided
  if (publishedTime) {
    headConfig.meta.push({ property: 'article:published_time', content: publishedTime })
  }
  if (modifiedTime) {
    headConfig.meta.push({ property: 'article:modified_time', content: modifiedTime })
  }

  useHead(headConfig)
}

/**
 * Helper function to create structured data (JSON-LD)
 * Returns a script tag configuration for useHead
 */
export function useStructuredData(schema) {
  return {
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(schema),
      },
    ],
  }
}

/**
 * Generate Organization schema
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Legal Crest',
    description: 'Elite legal marketing studio specializing in regulatory strategy, litigation campaigns, deal velocity, crisis management, and thought leadership for Am Law 100 firms and boutiques.',
    url: 'https://legalcrest.com',
    logo: 'https://legalcrest.com/favicon.svg',
    telephone: '+1-332-555-7180',
    email: 'intake@legalcrest.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'New York',
      addressRegion: 'NY',
      addressCountry: 'US',
    },
    areaServed: 'Worldwide',
    sameAs: [
      'https://linkedin.com/company/legalcrest',
      'https://twitter.com/legalcrest',
    ],
    priceRange: '$$$$',
  }
}

/**
 * Generate WebSite schema with SearchAction for sitelinks search enhancements
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Legal Crest',
    url: 'https://legalcrest.com',
    inLanguage: 'en-US',
    publisher: {
      '@type': 'Organization',
      name: 'Legal Crest',
      url: 'https://legalcrest.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://legalcrest.com/favicon.svg',
      },
    },
    sameAs: [
      'https://linkedin.com/company/legalcrest',
      'https://twitter.com/legalcrest',
    ],
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://legalcrest.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * Generate LocalBusiness schema
 */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Legal Crest',
    description: 'Full-service law firm providing expert legal counsel across corporate law, litigation, real estate, and crisis management.',
    url: 'https://legalcrest.com',
    logo: 'https://legalcrest.com/favicon.svg',
    image: 'https://legalcrest.com/og-image.jpg',
    telephone: '+1-332-555-7180',
    email: 'intake@legalcrest.com',
    priceRange: '$$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7128,
      longitude: -74.0060,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
    },
  }
}

/**
 * Generate schema for the entire services catalog
 */
export function getServiceCatalogSchema(services = [], baseUrl = 'https://legalcrest.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Legal Crest Legal Marketing Services',
    url: `${baseUrl}/services`,
    itemListElement: services.map((service, index) => ({
      '@type': 'Offer',
      position: index + 1,
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        url: `${baseUrl}/services/${service.slug}`,
      },
    })),
  }
}

/**
 * Generate Service schema for individual legal services
 */
export function getServiceSchema(service, baseUrl = 'https://legalcrest.com') {
  const url = `${baseUrl}/services/${service.slug}`
  const imagePath = service.image || '/og-image.jpg'
  const image = imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: service.title,
    alternateName: service.focus || service.title,
    description: service.fullDescription || service.description,
    url,
    image,
    provider: {
      '@type': 'Organization',
      name: 'Legal Crest',
      url: baseUrl,
      sameAs: [
        'https://linkedin.com/company/legalcrest',
        'https://twitter.com/legalcrest',
      ],
    },
    brand: {
      '@type': 'Brand',
      name: 'Legal Crest',
    },
    serviceType: service.focus || 'Legal Services',
    areaServed: ['North America', 'EMEA', 'APAC'],
    audience: {
      '@type': 'Audience',
      audienceType: 'Corporate legal teams and law firms',
    },
    serviceOutput: service.deliverables || [],
    termsOfService: `${baseUrl}/services`,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: '0',
      priceCurrency: 'USD',
      url,
      description: service.description,
    },
  }
}

/**
 * Generate schema for an individual attorney
 */
export function getAttorneySchema(attorney) {
  if (!attorney) {
    return null
  }

  const [primaryCredential] = (attorney.credentials || '').split(',')

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: attorney.name,
    jobTitle: attorney.title,
    description: `${attorney.specialization} | ${attorney.credentials}`,
    worksFor: {
      '@type': 'Organization',
      name: 'Legal Crest',
      url: 'https://legalcrest.com',
    },
    image: attorney.image,
    knowsAbout: attorney.specialization,
  }

  if (primaryCredential) {
    schema.alumniOf = {
      '@type': 'CollegeOrUniversity',
      name: primaryCredential.trim(),
    }
  }

  return schema
}

/**
 * Generate ItemList schema for multiple attorneys
 */
export function getAttorneyListSchema(attorneys = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Legal Crest Senior Attorneys',
    itemListElement: attorneys
      .map((attorney, index) => {
        const personSchema = getAttorneySchema(attorney)
        if (!personSchema) return null
        return {
          '@type': 'ListItem',
          position: index + 1,
          item: personSchema,
        }
      })
      .filter(Boolean),
  }
}

/**
 * Generate Review/Testimonials schema
 */
export function getReviewListSchema(testimonials = [], options = {}) {
  const {
    pageTitle = 'Client Testimonials',
    reviewNamePrefix = 'Client Testimonial',
    averageRating = '4.9',
    itemReviewed = {
      '@type': 'Organization',
      name: 'Legal Crest',
      url: 'https://legalcrest.com',
    },
  } = options

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: pageTitle,
    itemListElement: testimonials.map((testimonial, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Review',
        name: `${reviewNamePrefix} #${index + 1}`,
        reviewBody: testimonial.quote,
        author: {
          '@type': 'Person',
          name: testimonial.client || testimonial.author || 'Verified Client',
          jobTitle: testimonial.role || undefined,
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: testimonial.rating || '5',
          bestRating: '5',
        },
        itemReviewed,
      },
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: averageRating,
      bestRating: '5',
      reviewCount: String(Math.max(testimonials.length, 1)),
    },
  }
}

/**
 * Generate FAQPage schema
 */
export function getFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate Article/BlogPosting schema
 */
export function getArticleSchema(article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    image: article.image ? `https://legalcrest.com${article.image}` : 'https://legalcrest.com/og-image.jpg',
    author: {
      '@type': 'Organization',
      name: 'Legal Crest',
      url: 'https://legalcrest.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Legal Crest',
      logo: {
        '@type': 'ImageObject',
        url: 'https://legalcrest.com/favicon.svg',
      },
    },
    datePublished: article.publishedDate || '2025-11-27',
    dateModified: article.modifiedDate || '2025-11-27',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://legalcrest.com/insights/${article.slug}`,
    },
  }
}

/**
 * Generate BreadcrumbList schema
 */
export function getBreadcrumbSchema(breadcrumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `https://legalcrest.com${crumb.path}`,
    })),
  }
}

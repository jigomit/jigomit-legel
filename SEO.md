# SEO Playbook

## Structured Data Coverage
- Global scripts now emit `ProfessionalService`, `WebSite`, and enhanced `OfferCatalog` schemas via `useSEO` utilities so crawlers understand Legal Crest’s service catalog, search intent, and publisher identity.
- Home, Services, and Case Results pages publish contextual JSON-LD (`LegalService`, `Person`, `Review`, `FAQPage`) directly from live data, increasing eligibility for rich snippets (Attorneys, Testimonials, Service Offers).

## Meta & Sharing Signals
- `useSEO` now supports locale-aware OG/Twitter tags, image alt text, and canonical/alternate links per route.
- Each route inherits consistent brand metadata, Twitter handle attribution, and language tags to eliminate duplicate-content penalties.
- `App.vue` preloads the new head defaults (theme color, application name) and registers organization/site schemas at runtime so SSG + SPA navigations stay in sync.

## Content & Monitoring Tips
- Keep per-page descriptions under 160 characters and include intent terms (e.g., “legal crisis management partner”).
- Refresh testimonials and case metrics quarterly; the schema helpers automatically reflect new entries.
- Maintain sitemap/robots in `public/` (already wired) and ping Search Console after deploys.
- Use GA4 + Search Console reports to watch CTR, impression share, and Core Web Vitals. Iterate on underperforming titles first.

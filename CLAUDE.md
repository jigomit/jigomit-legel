# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a marketing website for Legal Crest, a legal marketing studio. Built with Vue 3 (using `<script setup>` SFC syntax), Vite, and Vue Router 4. The application uses **Static Site Generation (SSG)** via `vite-ssg` to pre-render all pages at build time for optimal performance and SEO.

## Development Commands

- **Start dev server**: `npm run dev` (Vite dev server with hot reload)
- **Build for production**: `npm run build` (SSG build via vite-ssg, outputs to `dist/`)
- **Preview production build**: `npm run preview`

## Architecture

### Multi-Page Application with Vue Router
The app uses Vue Router with the following page structure:
- `/` - Home page (hero section + trust badges)
- `/services` - Services overview
- `/services/:slug` - Individual service detail page (dynamic route)
- `/process` - 4-step process timeline
- `/case-results` - Client testimonials
- `/insights` - Blog/article previews
- `/insights/:slug` - Individual article detail page (dynamic route)
- `/contact` - Contact form + FAQ section
- `/book-consultation` - Consultation booking form
- `/not-found` - 404 error page (with `hideNav` meta flag)

### File Structure
```
src/
├── App.vue                      # Layout wrapper (nav + footer + router-view)
├── main.js                      # SSG entry point with vite-ssg configuration
├── style.css                    # Global styles
├── router/
│   └── index.js                 # Route definitions and scroll behavior
├── composables/
│   ├── useSEO.js                # SEO meta tags, Open Graph, structured data schemas
│   ├── useEmailJS.js            # EmailJS form submission integration
│   ├── useFormValidation.js    # Client-side form validation rules
│   └── useRoutePrefetch.js     # Route prefetching for faster navigation
├── components/
│   ├── OptimizedImage.vue       # <picture> component with WebP/JPEG fallback
│   └── CustomSelect.vue         # Custom styled select dropdown
├── data/
│   ├── services.js              # Service offerings with full content and metadata
│   ├── insights.js              # Blog articles with full content and metadata
│   └── forms.js                 # Form options and constants
└── pages/
    ├── Home.vue                 # Landing page
    ├── Services.vue             # Services overview
    ├── ServiceDetail.vue        # Individual service detail (reads from services.js)
    ├── Process.vue              # Process page
    ├── CaseResults.vue          # Case results/testimonials
    ├── Insights.vue             # Insights/blog overview
    ├── ArticleDetail.vue        # Individual article view (reads from insights.js)
    ├── Contact.vue              # Contact form + FAQ
    ├── BookConsultation.vue     # Consultation booking form
    └── NotFound.vue             # 404 error page
```

### Layout Architecture
`App.vue` serves as the main layout wrapper containing:
- **Sticky navigation**: Uses `<router-link>` for page navigation with theme toggle button
- **Router view**: Renders the active page component
- **Footer**: Contains links to main pages
- **Intersection Observer**: Manages scroll-triggered animations across all pages
- **Theme system**: Dark/light mode toggle with localStorage persistence and system preference detection

### Data Structure
Content data is organized in two patterns:

**Page-Specific Data**: Most pages contain their own data as reactive arrays in the `<script setup>` block. To modify content:
1. Navigate to the relevant page component in `src/pages/`
2. Locate the data array (e.g., `services`, `testimonials`, `practiceAreas`)
3. Edit the objects within the array
4. Changes will be reflected in the template via `v-for` directives

**Shared Data Files**: Some data is centralized in `src/data/`:
- `services.js` - Service offerings with full descriptions, benefits, deliverables, and image imports (used by Services.vue and ServiceDetail.vue)
- `insights.js` - Blog articles with full content, metadata, slugs, and image imports (used by Insights.vue and ArticleDetail.vue)
- `forms.js` - Form options, booking steps, inquiry focuses (used by Contact.vue and BookConsultation.vue)

### Image Asset Management & WebP Optimization
Images use a dual-format strategy for optimal performance:
- All images stored in `src/assets/` and subdirectories with both **JPEG and WebP** versions
- Images imported as ES modules at the top of components:
  ```js
  import heroImg from '../assets/hero.jpg'
  import heroImgWebP from '../assets/hero.webp'
  ```
- **OptimizedImage component** (`src/components/OptimizedImage.vue`) renders `<picture>` elements with WebP source and JPEG fallback
- Data files (`services.js`, `insights.js`) import both formats for all images
- Vite processes these imports during build with optimization via `vite-imagetools` plugin
- Images smaller than 4KB are automatically inlined as base64 (configured in vite.config.js)

### Animation System
Intersection Observer API triggers fade-in animations across all pages (implemented in App.vue):
- Elements with `data-animate` attribute are observed
- When visible (5% threshold), `is-visible` class is added
- Staggered delays handled by CSS `:nth-child()` selectors to avoid forced reflows
- Observer re-initializes on route changes via `router.afterEach()` hook with `nextTick()` for proper DOM updates

**Accessibility & Progressive Enhancement**:
- **Respects user preferences**: Detects and honors `prefers-reduced-motion: reduce` media query
- **Feature detection**: Checks for IntersectionObserver support; falls back to instant reveal if not available
- **Dynamic updates**: Listens to motion preference changes and window resize events to update behavior in real-time
- **SSR-safe**: Handles server-side rendering gracefully with window/document checks

**Performance Optimizations**:
- DOM queries cached to avoid repeated `querySelectorAll()` calls
- IntersectionObserver threshold: `0.05` with rootMargin: `'0px 0px 0px 0px'`
- Uses `requestIdleCallback` (with `requestAnimationFrame` fallback) for non-critical observer re-initialization
- All classList operations batched in `requestAnimationFrame`
- Resize event listener with passive flag for better scroll performance

**Cleanup**: All event listeners and observer disconnected in `onBeforeUnmount()`

### Styling
All styles are in `src/style.css`. Key design tokens:
- Dark/light theme system using `data-theme` attribute on `<html>` element
- CSS custom properties in `:root` and `[data-theme='light']` for colors
- Dark theme with glassmorphism effects (`backdrop-filter: blur()`)
- Responsive using `clamp()` and modern CSS
- Fonts: Inter (body) and Space Grotesk (headings) from Google Fonts

### Router Configuration
Router uses `createWebHistory()` for clean URLs (no hash). Key features:
- **Lazy loading**: Only Home.vue is eager-loaded; all other routes are lazy-loaded via `() => import()` for better performance
- **Route prefetching**: Navigation links in `App.vue` use `useRoutePrefetch()` composable to prefetch routes on hover/focus for instant navigation
- **Scroll behavior** (defined in `router/index.js`):
  - Scrolls to top on navigation
  - Supports hash anchors for in-page navigation with smooth scrolling
  - Respects browser back/forward `savedPosition`
  - Actual scroll implementation in `App.vue` uses instant (`behavior: 'auto'`) to avoid forced reflows
- `router.afterEach()` hook in App.vue handles scroll positioning and re-initializes Intersection Observer for animations
- Dynamic routes:
  - `/services/:slug` matches service slugs from `services.js` data file
  - `/insights/:slug` matches article slugs from `insights.js` data file
  - Components use `useRoute().params.slug` to find matching content
- Catch-all route `/:pathMatch(.*)*` redirects to `/not-found`

## Key Technical Details

### Static Site Generation (SSG) with vite-ssg
The application uses `vite-ssg` for pre-rendering all pages at build time:
- Entry point is `src/main.js` using `ViteSSG()` instead of standard `createApp()`
- **Dynamic route generation**: Service detail routes are automatically generated in `main.js` by mapping over `services` array from `services.js`
- `includedRoutes` function in `main.js` ensures all dynamic routes are included in SSG build
- SSG options configured in `vite.config.js`: async script loading, minified output
- Uses `@unhead/vue` for SEO meta tags (automatically provided by vite-ssg, no manual head instance needed)

### SEO & Meta Management
Comprehensive SEO system via `src/composables/useSEO.js`:
- **useSEO()** composable: Sets title, description, keywords, Open Graph, Twitter Cards, canonical URLs
- **Structured data helpers**: Schema.org JSON-LD for Organization, LocalBusiness, Service, Article, FAQPage, Breadcrumbs
- Each page calls `useSEO()` with page-specific metadata
- Base URL: `https://legalcrest.com`

### Form Handling with EmailJS
Forms use EmailJS for email delivery (`src/composables/useEmailJS.js`):
- **Configuration**: PUBLIC_KEY, SERVICE_ID, and TEMPLATE_IDs must be replaced in `useEmailJS.js` (currently set to placeholder values)
- **Development mode**: When placeholders detected, forms simulate successful submission and log data to console
- **Validation**: Client-side validation via `useFormValidation.js` composable with common rules (required, email, phone, minLength, maxLength, URL)
- Contact form and consultation booking form both use these composables
- EmailJS loads dynamically (client-side only) to avoid SSR issues

### Adding New Pages
1. Create new component in `src/pages/`
2. Add route definition to `src/router/index.js` (use lazy loading: `() => import()`)
3. Add SEO metadata with `useSEO()` composable
4. Add navigation link to `App.vue` if needed
5. If dynamic route, update `main.js` to include routes in `includedRoutes` configuration

### Build Configuration & Optimizations
`vite.config.js` includes performance optimizations:
- **Minification**: Terser with console.log removal in production
- **CSS code splitting**: Enabled for better caching
- **Manual chunks**: Vue, Vue Router, EmailJS, and Unhead split into separate chunks for optimal caching
- **Image optimization**: `vite-imagetools` plugin for WebP generation
- **Asset inlining**: Files <4KB inlined as base64
- **Dependency pre-bundling**: Vue, Vue Router, EmailJS, Unhead optimized
- **Compression**: Custom plugin generates Gzip (.gz) and Brotli (.br) compressed versions of JS/CSS assets at build time for static hosting

### Build Output
Running `npm run build` generates static files in `dist/` that can be deployed to any static hosting service (Vercel, Netlify, AWS S3, etc.). All pages are pre-rendered as HTML for instant loading and SEO.

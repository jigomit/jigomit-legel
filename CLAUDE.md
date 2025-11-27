# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a marketing website for Legal Crest, a legal marketing studio. Built with Vue 3 (using `<script setup>` SFC syntax), Vite, and Vue Router 4. The application uses a multi-page architecture where each major section has its own dedicated route and page component.

## Development Commands

- **Start dev server**: `npm run dev` (Vite dev server with hot reload)
- **Build for production**: `npm run build` (outputs to `dist/`)
- **Preview production build**: `npm run preview`

## Architecture

### Multi-Page Application with Vue Router
The app uses Vue Router with the following page structure:
- `/` - Home page (hero section + trust badges)
- `/services` - Services overview
- `/process` - 4-step process timeline
- `/case-results` - Client testimonials
- `/insights` - Blog/article previews
- `/insights/:slug` - Individual article detail page (dynamic route)
- `/contact` - Contact form + FAQ section
- `/book-consultation` - Consultation booking form

### File Structure
```
src/
├── App.vue              # Layout wrapper (nav + footer + router-view)
├── main.js              # App entry point with router
├── style.css            # Global styles
├── router/
│   └── index.js         # Route definitions and configuration
├── data/
│   ├── forms.js         # Shared constants for forms (inquiry focuses, booking steps, etc.)
│   └── insights.js      # Blog articles with full content, metadata, and image imports
└── pages/
    ├── Home.vue            # Landing page
    ├── Services.vue        # Services page
    ├── Process.vue         # Process page
    ├── CaseResults.vue     # Case results/testimonials page
    ├── Insights.vue        # Insights/blog page
    ├── ArticleDetail.vue   # Individual article view (reads from insights.js)
    ├── Contact.vue         # Contact form + FAQ page
    └── BookConsultation.vue # Consultation booking form
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
- `forms.js` - Form options, booking steps, inquiry focuses (used by Contact.vue and BookConsultation.vue)
- `insights.js` - Blog articles with full content, metadata, slugs, and image imports (used by Insights.vue and ArticleDetail.vue)

### Image Asset Management
Images are imported as ES modules in component `<script setup>` blocks:
- All images stored in `src/assets/` and subdirectories
- Images are imported at the top of components (e.g., `import heroImg from '../assets/hero.jpg'`)
- Vite processes these imports during build for optimization
- Used in templates via `:src="heroImg"` binding
- The `insights.js` data file also imports all article thumbnail images at the top

### Animation System
Intersection Observer API triggers fade-in animations across all pages:
- Elements with `data-animate` attribute are observed
- When visible (20% threshold), `is-visible` class is added
- Each element gets a staggered delay via `--delay` CSS variable
- Observer re-initializes on route changes via `router.afterEach()` hook
- Cleanup happens in `onBeforeUnmount()`

### Styling
All styles are in `src/style.css`. Key design tokens:
- Dark/light theme system using `data-theme` attribute on `<html>` element
- CSS custom properties in `:root` and `[data-theme='light']` for colors
- Dark theme with glassmorphism effects (`backdrop-filter: blur()`)
- Responsive using `clamp()` and modern CSS
- Fonts: Inter (body) and Space Grotesk (headings) from Google Fonts

### Router Configuration
Router uses `createWebHistory()` for clean URLs (no hash). Key features:
- Scroll behavior: Scrolls to top on navigation, supports hash anchors for in-page navigation, respects browser back/forward savedPosition
- All routes use eager-loaded components (no lazy loading configured)
- `router.afterEach()` hook in App.vue handles scroll positioning and re-initializes Intersection Observer for animations
- Dynamic route `/insights/:slug` matches article slugs from insights.js data file; ArticleDetail.vue uses `useRoute().params.slug` to find the matching article

## Key Technical Details

### Adding New Pages
1. Create new component in `src/pages/`
2. Add route definition to `src/router/index.js`
3. Add navigation link to `App.vue` if needed

### No State Management
The app is entirely presentational with no user state or API calls. Form submissions in Contact.vue and BookConsultation.vue have `@submit.prevent` with no handlers. To add real functionality:
1. Install a form handling library or set up an API endpoint
2. Add actual form submission logic in the `@submit` handlers
3. Consider adding Pinia or Vuex if cross-page state management is needed

The only client-side state is the theme preference (dark/light mode), which is stored in localStorage.

### Build Output
Running `npm run build` generates static files in `dist/` that can be deployed to any static hosting service (Vercel, Netlify, AWS S3, etc.).

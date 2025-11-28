import { ViteSSG } from 'vite-ssg'
import './style.css'
import App from './App.vue'
import routes, { scrollBehavior } from './router'
import { services } from './data/services'
import { insights } from './data/insights'

// Generate all service detail routes for SSG
const serviceRoutes = services.map(service => `/services/${service.slug}`)

// Generate all insight article routes for SSG
const insightRoutes = insights.map(article => `/insights/${article.slug}`)

// Export includedRoutes for vite-ssg
// This function tells vite-ssg which routes to pre-render
export async function includedRoutes(paths, routes) {
  // Include all static routes plus all service detail routes and insight article routes
  return [...paths, ...serviceRoutes, ...insightRoutes]
}

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior,
  },
  ({ app, router, routes, isClient, initialState, head }) => {
    // ViteSSG provides head management automatically
    // No need to create head instance manually

    // Set document title based on route meta
    router.afterEach((to) => {
      if (typeof document !== 'undefined') {
        document.title = to.meta.title || 'Legal Crest - Legal Marketing Studio'
      }
    })

    // You can add global plugins here
    if (isClient) {
      // Client-side only code
    }
  }
)

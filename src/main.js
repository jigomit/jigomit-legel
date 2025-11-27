import { ViteSSG } from 'vite-ssg'
import './style.css'
import App from './App.vue'
import routes, { scrollBehavior } from './router'
import { services } from './data/services'

// Generate all service detail routes for SSG
const serviceRoutes = services.map(service => `/services/${service.slug}`)

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
  },
  {
    // Configure which routes to include in SSG build
    includedRoutes: (paths, routes) => {
      // Include all static routes plus all service detail routes
      return [...paths, ...serviceRoutes]
    }
  }
)

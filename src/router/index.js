// Eager load only the Home page for instant display
import Home from '../pages/Home.vue'

// Lazy load all other routes for better performance
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Legal Crest - Legal Marketing Studio' }
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('../pages/Services.vue'),
    meta: { title: 'Legal Crest - Services' }
  },
  {
    path: '/services/:slug',
    name: 'ServiceDetail',
    component: () => import('../pages/ServiceDetail.vue'),
    meta: { title: 'Legal Crest - Service Details' }
  },
  {
    path: '/process',
    name: 'Process',
    component: () => import('../pages/Process.vue'),
    meta: { title: 'Legal Crest - Process' }
  },
  {
    path: '/case-results',
    name: 'CaseResults',
    component: () => import('../pages/CaseResults.vue'),
    meta: { title: 'Legal Crest - Case Results' }
  },
  {
    path: '/insights',
    name: 'Insights',
    component: () => import('../pages/Insights.vue'),
    meta: { title: 'Legal Crest - Insights' }
  },
  {
    path: '/insights/:slug',
    name: 'ArticleDetail',
    component: () => import('../pages/ArticleDetail.vue'),
    meta: { title: 'Legal Crest - Article' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../pages/Contact.vue'),
    meta: { title: 'Legal Crest - Contact' }
  },
  {
    path: '/book-consultation',
    name: 'BookConsultation',
    component: () => import('../pages/BookConsultation.vue'),
    meta: { title: 'Legal Crest - Book Consultation' }
  },
  {
    path: '/not-found',
    name: 'NotFound',
    component: () => import('../pages/NotFound.vue'),
    meta: { title: 'Legal Crest - Page Not Found', hideNav: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/not-found'
  },
]

// Export routes for vite-ssg
export default routes

// Scroll behavior configuration
export const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  }

  if (to.hash) {
    return {
      el: to.hash,
      behavior: 'smooth',
    }
  }

  return { top: 0 }
}

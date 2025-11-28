<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import brandMark from './assets/logo.svg'

const router = useRouter()
const route = useRoute()

const navLinks = [
  { label: 'Services', target: '/services' },
  { label: 'Process', target: '/process' },
  { label: 'Case Results', target: '/case-results' },
  { label: 'Insights', target: '/insights' },
  { label: 'Contact', target: '/contact' },
]

const offices = ['New York · HQ', 'London · EMEA Hub', 'Singapore · APAC Studio', 'Dubai · MENA Desk']
const credentials = ['Chambers Band 1 Marketing Partner', 'Legal 500 Preferred Supplier', 'ISO 27001 Secure Ops']
const contactChannels = [
  { label: 'Concierge line', value: '+1 (332) 555-7180' },
  { label: 'Global intake', value: 'intake@legalcrest.com' },
  { label: 'Secure data room', value: 'vault.legalcrest.com' },
]

const currentYear = new Date().getFullYear()
const theme = ref('dark')
const showBackToTop = ref(false)

let observer
let ticking = false // Throttle flag for scroll handler
let prefersInstantReveal = false // Determines whether we skip animations
let cachedAnimatedBlocks = null // Cache DOM query results to avoid forced reflows
let resizeObserverAttached = false
let prefersReducedMotionQuery = null
const isObserverSupported = typeof window !== 'undefined' && 'IntersectionObserver' in window

const applyTheme = (value) => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', value)
  }
  try {
    localStorage.setItem('lc-theme', value)
  } catch (error) {
    // ignore storage issues
  }
}

const toggleTheme = () => {
  const nextTheme = theme.value === 'dark' ? 'light' : 'dark'
  theme.value = nextTheme
  applyTheme(nextTheme)
}

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      showBackToTop.value = window.scrollY > 300
      ticking = false
    })
    ticking = true
  }
}

const scrollToTop = () => {
  // Use instant scroll to avoid forced reflows from smooth scrolling
  window.scrollTo({
    top: 0,
    behavior: 'auto'
  })
}

const updateInstantRevealPreference = () => {
  if (typeof window === 'undefined') return
  if (!prefersReducedMotionQuery && typeof window.matchMedia === 'function') {
    prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotionQuery.addEventListener('change', handleMotionPreferenceChange)
  }
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  prefersInstantReveal =
    !isObserverSupported ||
    isMobile ||
    (prefersReducedMotionQuery ? prefersReducedMotionQuery.matches : false)
}

const scheduleObserveElements = () => {
  const run = () => {
    cachedAnimatedBlocks = null
    observeElements()
  }
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(run)
  } else {
    requestAnimationFrame(run)
  }
}

const handleMotionPreferenceChange = () => {
  updateInstantRevealPreference()
  scheduleObserveElements()
}

const observeElements = () => {
  if (typeof document === 'undefined') return
  if (!cachedAnimatedBlocks) {
    cachedAnimatedBlocks = document.querySelectorAll('[data-animate]')
  }

  cachedAnimatedBlocks.forEach((block) => {
    if (prefersInstantReveal || !isObserverSupported) {
      block.classList.add('is-visible')
      if (isObserverSupported) {
        observer?.unobserve(block)
      }
    } else {
      observer?.observe(block)
    }
  })
}

const handleResize = () => {
  updateInstantRevealPreference()
  if (prefersInstantReveal) {
    scheduleObserveElements()
  }
}

onMounted(() => {
  try {
    const storedTheme = localStorage.getItem('lc-theme')
    if (storedTheme === 'light' || storedTheme === 'dark') {
      theme.value = storedTheme
    } else if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
      if (prefersLight) {
        theme.value = 'light'
      }
    }
  } catch (error) {
    // ignore preference issues
  }

  applyTheme(theme.value)

  updateInstantRevealPreference()

  // Back to top button scroll listener
  window.addEventListener('scroll', handleScroll, { passive: true })

  if (isObserverSupported) {
    observer = new IntersectionObserver(
      (entries) => {
        // Batch all classList operations in a single RAF to avoid forced reflows
        requestAnimationFrame(() => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer?.unobserve(entry.target)
            }
          })
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px 0px 0px' }
    )
  }

  nextTick(() => {
    observeElements()
  })
  if (!resizeObserverAttached) {
    window.addEventListener('resize', handleResize, { passive: true })
    resizeObserverAttached = true
  }

  // Re-observe when route changes and reset scroll position
  router.afterEach(async (to) => {
    updateInstantRevealPreference()
    if (to.hash) {
      const target = document.querySelector(to.hash)
      if (target) {
        // Use instant scroll to avoid continuous layout reads from smooth scrolling
        target.scrollIntoView({ behavior: 'auto', block: 'start' })
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
    await nextTick()
    scheduleObserveElements()
  })
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', handleScroll)
  if (resizeObserverAttached) {
    window.removeEventListener('resize', handleResize)
    resizeObserverAttached = false
  }
  prefersReducedMotionQuery?.removeEventListener('change', handleMotionPreferenceChange)
})
</script>

<template>
  <div class="page-shell">
    <nav v-if="!route.meta.hideNav" class="nav" data-animate>
      <router-link to="/" class="brand">
        <img :src="brandMark" alt="Legal Crest monogram" class="brand-logo" />
        <div>
          <p class="brand-title">Legal Crest</p>
          <p class="brand-subtitle">Legal Marketing Studio</p>
        </div>
      </router-link>
      <div class="nav-links">
        <router-link v-for="link in navLinks" :key="link.target" :to="link.target">{{ link.label }}</router-link>
      </div>
      <div class="nav-actions">
        <router-link to="/book-consultation" class="btn primary">Book Consultation</router-link>
        <button
          type="button"
          class="btn icon theme-toggle"
          @click="toggleTheme"
          :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`"
        >
          <span v-if="theme === 'dark'">🌞</span>
          <span v-else>🌙</span>
        </button>
      </div>
    </nav>

    <main>
      <router-view />
    </main>

    <footer class="footer" data-animate>
      <div class="footer-top">
        <div class="footer-brand">
          <p class="brand-title">Legal Crest</p>
          <p>
            Demand architecture and reputation stewardship for Am Law 100, elite boutiques, and in-house teams that need
            measurable momentum across every jurisdiction.
          </p>
        </div>
        <div class="footer-grid">
          <div class="footer-col">
            <p class="footer-label">Global offices</p>
            <ul>
              <li v-for="office in offices" :key="office">{{ office }}</li>
            </ul>
          </div>
          <div class="footer-col">
            <p class="footer-label">Credentials</p>
            <ul>
              <li v-for="item in credentials" :key="item">{{ item }}</li>
            </ul>
          </div>
          <div class="footer-col">
            <p class="footer-label">Contact</p>
            <ul>
              <li v-for="channel in contactChannels" :key="channel.label">
                <span>{{ channel.label }}</span>
                <strong>{{ channel.value }}</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© {{ currentYear }} Legal Crest. All rights reserved.</p>
        <div class="footer-links">
          <router-link to="/services">Services</router-link>
          <router-link to="/process">Process</router-link>
          <router-link to="/case-results">Case Results</router-link>
          <router-link to="/contact">Contact</router-link>
        </div>
      </div>
    </footer>

    <!-- Back to Top Button -->
    <button
      v-if="showBackToTop"
      @click="scrollToTop"
      class="back-to-top"
      aria-label="Scroll back to top"
      type="button"
    >
      ↑
    </button>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
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
let prefersInstantReveal = false // Cached matchMedia result to avoid forced reflows

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

  // Cache matchMedia result once to avoid forced reflows on every route change
  prefersInstantReveal = window.matchMedia('(max-width: 768px)').matches

  // Back to top button scroll listener
  window.addEventListener('scroll', handleScroll, { passive: true })

  observer = new IntersectionObserver(
    (entries) => {
      // Batch all classList operations in a single RAF to avoid forced reflows
      requestAnimationFrame(() => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      })
    },
    { threshold: 0.2 }
  )

  // Re-observe elements whenever the route changes
  const observeElements = () => {
    const animatedBlocks = document.querySelectorAll('[data-animate]')
    // Use cached matchMedia result to avoid forced reflows
    animatedBlocks.forEach((block) => {
      // Note: Animation delays now handled by CSS nth-child to avoid forced reflows
      if (prefersInstantReveal) {
        block.classList.add('is-visible')
        observer.unobserve(block)
      } else {
        observer.observe(block)
      }
    })
  }

  observeElements()

  // Re-observe when route changes and reset scroll position
  router.afterEach((to) => {
    if (to.hash) {
      const target = document.querySelector(to.hash)
      if (target) {
        // Use instant scroll to avoid continuous layout reads from smooth scrolling
        target.scrollIntoView({ behavior: 'auto', block: 'start' })
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
    // Use requestAnimationFrame to batch DOM operations and avoid forced reflows
    requestAnimationFrame(() => {
      observeElements()
    })
  })
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', handleScroll)
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

<script setup>
import { useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'

const router = useRouter()

// SEO for 404 - noindex to prevent search engine indexing
useHead({
  title: '404 - Page Not Found | Legal Crest',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Insights', path: '/insights' },
  { label: 'Contact', path: '/contact' },
]

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <div class="not-found-page">
    <div class="not-found-content" data-animate>
      <div class="error-code">404</div>
      <h1>Page Not Found</h1>
      <p class="lead">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>

      <div class="not-found-actions">
        <button @click="goBack" class="btn ghost">
          <span>← Go Back</span>
        </button>
        <router-link to="/" class="btn primary">Return Home</router-link>
      </div>

      <div class="quick-links">
        <p class="eyebrow">Quick Links</p>
        <div class="quick-links-grid">
          <router-link
            v-for="link in quickLinks"
            :key="link.path"
            :to="link.path"
            class="quick-link-card"
          >
            <span>{{ link.label }}</span>
            <span class="arrow">→</span>
          </router-link>
        </div>
      </div>

      <div class="help-section">
        <p>Need assistance? <router-link to="/contact" class="inline-link">Contact our team</router-link> or <router-link to="/book-consultation" class="inline-link">book a consultation</router-link>.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
}

.not-found-content {
  max-width: 700px;
  text-align: center;
}

.error-code {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(6rem, 15vw, 10rem);
  font-weight: 700;
  background: var(--heading-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 1rem;
  opacity: 0.3;
}

.not-found-content h1 {
  margin-bottom: 1.5rem;
}

.not-found-content .lead {
  margin-bottom: 3rem;
}

.not-found-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 4rem;
}

.quick-links {
  margin-bottom: 3rem;
}

.quick-links .eyebrow {
  margin-bottom: 1.5rem;
}

.quick-links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.quick-link-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: all 0.3s ease;
  color: var(--text-primary);
  font-weight: 500;
}

.quick-link-card:hover {
  background: var(--card-hover);
  border-color: var(--border-hover);
  transform: translateY(-2px);
}

.quick-link-card .arrow {
  opacity: 0.5;
  transition: all 0.3s ease;
}

.quick-link-card:hover .arrow {
  opacity: 1;
  transform: translateX(4px);
}

.help-section {
  padding-top: 3rem;
  border-top: 1px solid var(--border);
  color: var(--text-muted);
}

.inline-link {
  color: var(--link-color);
  font-weight: 500;
  transition: color 0.2s ease;
}

.inline-link:hover {
  color: var(--link-hover);
}

@media (max-width: 600px) {
  .not-found-actions {
    flex-direction: column;
    width: 100%;
  }

  .not-found-actions .btn {
    width: 100%;
  }

  .quick-links-grid {
    grid-template-columns: 1fr;
  }
}
</style>

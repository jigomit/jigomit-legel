<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { services } from '../data/services'
import { useStructuredData, getServiceSchema, getBreadcrumbSchema } from '../composables/useSEO'
import { useHead } from '@unhead/vue'

const route = useRoute()
const router = useRouter()

const service = computed(() => {
  return services.find(s => s.slug === route.params.slug)
})

const relatedServices = computed(() => {
  if (!service.value || !service.value.relatedServices) return []
  return services.filter(s => service.value.relatedServices.includes(s.slug)).slice(0, 3)
})

// Dynamic SEO using computed values for SSG compatibility
const headConfig = computed(() => {
  if (!service.value) {
    return {
      title: 'Service Not Found | Legal Crest',
      meta: [
        { name: 'description', content: 'The service you are looking for could not be found.' }
      ]
    }
  }

  const baseUrl = 'https://legalcrest.com'
  const canonical = `${baseUrl}/services/${service.value.slug}`
  const title = `${service.value.title} | Legal Crest Services`
  const description = service.value.fullDescription || service.value.description
  const keywords = [
    service.value.title,
    service.value.focus,
    ...(service.value.highlights || []).slice(0, 2),
    'legal marketing studio',
    'law firm growth strategy'
  ]
    .filter(Boolean)
    .map(entry => entry.toLowerCase())
    .join(', ')
  const imagePath = service.value.image || '/og-image.jpg'
  const ogImage = imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`

  // Generate structured data schemas
  const serviceSchema = getServiceSchema(service.value)
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.value.title, path: `/services/${service.value.slug}` },
  ])

  return {
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonical },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:alt', content: service.value.title },
      { property: 'og:site_name', content: 'Legal Crest' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      { name: 'article:section', content: service.value.focus },
    ],
    link: [
      { rel: 'canonical', href: canonical }
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(serviceSchema),
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify(breadcrumbSchema),
      }
    ]
  }
})

// Set up head with reactive config
useHead(headConfig)

const goBack = () => {
  router.push('/services')
}

const bookService = () => {
  if (service.value) {
    router.push({
      path: '/book-consultation',
      query: { service: service.value.focus }
    })
  }
}
</script>

<template>
  <div class="page-content">
    <!-- Service Not Found -->
    <section v-if="!service" class="section" data-animate>
      <div class="section-header">
        <h2>Service Not Found</h2>
        <p>The service you're looking for doesn't exist or has been removed.</p>
        <router-link to="/services" class="btn primary">Back to Services</router-link>
      </div>
    </section>

    <!-- Service Content -->
    <article v-else-if="service" class="section service-detail">
      <!-- Back Button -->
      <button @click="goBack" class="back-link" type="button">
        ← Back to Services
      </button>

      <!-- Service Hero -->
      <div class="service-detail-hero" data-animate>
        <div class="service-hero-image-wrapper">
          <img :src="service.image" :alt="service.title" class="service-hero-image" />
          <div class="service-hero-overlay">
            <span class="service-hero-icon">{{ service.icon }}</span>
            <h1 class="service-hero-title">{{ service.title }}</h1>
            <p class="service-hero-description">{{ service.description }}</p>
          </div>
        </div>
      </div>

      <!-- Service Overview -->
      <div class="service-overview" data-animate>
        <div class="service-overview-content">
          <p class="eyebrow">Overview</p>
          <h2>What We Deliver</h2>
          <p class="service-full-description">{{ service.fullDescription || service.description }}</p>
        </div>
      </div>

      <!-- Key Benefits -->
      <div class="service-benefits" data-animate>
        <p class="eyebrow">Benefits</p>
        <h2>Why Choose This Service</h2>
        <div class="service-benefits-grid">
          <div v-for="(benefit, index) in service.benefits || []" :key="index" class="benefit-card">
            <span class="benefit-icon">✓</span>
            <p>{{ benefit }}</p>
          </div>
        </div>
      </div>

      <!-- Deliverables -->
      <div class="service-deliverables" data-animate>
        <div class="deliverables-content">
          <div class="deliverables-left">
            <p class="eyebrow">What You Get</p>
            <h2>Deliverables</h2>
            <p>Our comprehensive service includes everything you need to succeed:</p>
          </div>
          <div class="deliverables-right">
            <ul class="deliverables-list">
              <li v-for="(item, index) in service.deliverables || []" :key="index">
                <span class="deliverable-icon">→</span>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Ideal For -->
      <div class="service-ideal-for" data-animate>
        <p class="eyebrow">Who This Is For</p>
        <h2>Ideal Clients</h2>
        <div class="ideal-for-grid">
          <div v-for="(item, index) in service.idealFor || []" :key="index" class="ideal-for-card">
            <p>{{ item }}</p>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="service-cta" data-animate>
        <div class="service-cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Book a consultation to discuss how {{ service.title }} can help your organization.</p>
          <p class="service-timeline"><strong>Timeline:</strong> {{ service.timeline }}</p>
          <div class="service-cta-buttons">
            <button @click="bookService" class="btn primary" type="button">
              Book this service
            </button>
            <router-link to="/contact" class="btn ghost">
              Contact us
            </router-link>
          </div>
        </div>
      </div>

      <!-- Related Services -->
      <div v-if="relatedServices.length > 0" class="related-services" data-animate>
        <p class="eyebrow">Related Services</p>
        <h2>You Might Also Be Interested In</h2>
        <div class="related-services-grid">
          <router-link
            v-for="relatedService in relatedServices"
            :key="relatedService.slug"
            :to="`/services/${relatedService.slug}`"
            class="related-service-card"
          >
            <div class="related-service-image">
              <img :src="relatedService.image" :alt="relatedService.title" loading="lazy" />
              <span class="related-service-icon">{{ relatedService.icon }}</span>
            </div>
            <h3>{{ relatedService.title }}</h3>
            <p>{{ relatedService.description }}</p>
            <span class="related-service-link">Learn more →</span>
          </router-link>
        </div>
      </div>
    </article>
  </div>
</template>

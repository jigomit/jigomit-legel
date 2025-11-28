<script setup>
import { services } from '../data/services'
import { useSEO, useStructuredData, getServiceSchema, getBreadcrumbSchema } from '../composables/useSEO'
import { useHead } from '@unhead/vue'
import { useRouter } from 'vue-router'

// SEO Configuration
useSEO({
  title: 'Legal Marketing Services | Regulatory Strategy, Litigation, Crisis Management',
  description: 'Specialized legal marketing services for Am Law 100 firms: regulatory strategy, market-making litigation campaigns, deal velocity, crisis management, client experience, and thought leadership.',
  keywords: 'legal marketing services, regulatory strategy lawyer, litigation campaign attorney, deal transaction lawyer, crisis management legal, law firm marketing, legal consultation services',
  canonical: '/services',
  ogType: 'website',
})

// Breadcrumb
useHead(
  useStructuredData(
    getBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
    ])
  )
)

// Add Service schema for each service
services.forEach((service) => {
  useHead(useStructuredData(getServiceSchema(service)))
})

const router = useRouter()
const navigateToService = (slug) => {
  router.push(`/services/${slug}`)
}
</script>

<template>
  <section id="services" class="section" data-animate>
    <div class="section-header">
      <p class="eyebrow">Services</p>
      <h2>Built for modern legal teams that demand measurable momentum.</h2>
      <p class="lead">
        Modular engagements unlock senior strategists, trial-tested attorneys, and marketing technologists precisely
        when you need them most.
      </p>
    </div>
    <div class="service-grid">
      <article
        v-for="service in services"
        :key="service.slug"
        class="service-card"
        role="link"
        tabindex="0"
        :aria-label="`View more about ${service.title}`"
        @click="navigateToService(service.slug)"
        @keydown.enter.prevent="navigateToService(service.slug)"
        @keydown.space.prevent="navigateToService(service.slug)"
      >
        <div class="service-photo">
          <picture>
            <source :srcset="service.imageWebP" type="image/webp" />
            <img :src="service.image" :alt="`${service.title} preview`" loading="lazy" />
          </picture>
          <span class="service-icon">{{ service.icon }}</span>
        </div>
        <h3>{{ service.title }}</h3>
        <div class="service-card-body">
          <p class="service-card-description">{{ service.description }}</p>
          <ul>
            <li v-for="item in service.highlights" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="service-card-actions">
          <router-link
            :to="{ path: '/book-consultation', query: { service: service.focus } }"
            class="btn primary"
            @click.stop
            @keydown.enter.stop
            @keydown.space.stop.prevent
          >
            Book this service
          </router-link>
        </div>
      </article>
    </div>
  </section>
</template>

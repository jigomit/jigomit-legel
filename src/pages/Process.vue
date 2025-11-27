<script setup>
import { useSEO, useStructuredData, getBreadcrumbSchema } from '../composables/useSEO'
import { useHead } from '@unhead/vue'

// SEO Configuration
useSEO({
  title: 'Our Legal Marketing Process | 4-Step Strategy & Execution | Legal Crest',
  description: 'Discover our proven 4-step legal marketing process: Signal Capture, Strategy Blueprint, Execution Pods, and Performance Monitoring. Designed for Am Law 100 firms and elite boutiques.',
  keywords: 'legal marketing process, law firm strategy process, legal consultation process, litigation campaign process, legal service workflow',
  canonical: '/process',
  ogType: 'website',
})

// Breadcrumb
useHead(
  useStructuredData(
    getBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Process', path: '/process' },
    ])
  )
)

const processSteps = [
  {
    stage: '01 Signal Capture',
    title: 'Precision intake',
    detail:
      'Stakeholder interviews, CRM + docket ingestion, and KPI alignment establish the opportunity map and hidden risks within the first week.',
  },
  {
    stage: '02 Blueprint',
    title: 'Strategy sprints',
    detail:
      'Service designers, litigators, and growth analysts run rapid sprints to architect narrative, channel mix, reporting cadences, and battleground timelines.',
  },
  {
    stage: '03 Immersion Pods',
    title: 'Execution pods',
    detail:
      'Dedicated pods with trial strategists, content studios, martech engineers, and client liaisons run daily standups to keep every deliverable on tempo.',
  },
  {
    stage: '04 Quality Runway',
    title: 'Review gates',
    detail:
      'Editorial and compliance leads pressure-test messaging, assets, and automations before launch so every jurisdictional nuance is accounted for.',
  },
  {
    stage: '05 Activation',
    title: 'Launch orchestration',
    detail:
      'Rollouts span intake systems, events, earned media, and analyst briefings—each anchored by shared dashboards that keep partners informed hourly.',
  },
  {
    stage: '06 Optimization',
    title: 'Review & evolve',
    detail:
      'Post-matter retros, AI-enabled attribution, and executive-ready insights roll into the knowledge base so each engagement compounds the next.',
  },
]
</script>

<template>
  <section id="process" class="section process" data-animate>
    <div class="section-header">
      <p class="eyebrow">Process</p>
      <h2>Precision delivery, transparent at every milestone.</h2>
    </div>
    <div class="process-grid">
      <article v-for="step in processSteps" :key="step.stage" class="process-card">
        <p class="stage">{{ step.stage }}</p>
        <h3>{{ step.title }}</h3>
        <p>{{ step.detail }}</p>
      </article>
    </div>
  </section>
</template>

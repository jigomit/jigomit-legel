<script setup>
import { insights } from '../data/insights'
import { useSEO, useStructuredData, getBreadcrumbSchema } from '../composables/useSEO'
import { useHead } from '@unhead/vue'

const highlightedCategories = [
  'Am Law Growth Ops',
  'Cross-Border M&A',
  'Crisis & Reputation',
  'Client Experience',
  'Thought Leadership',
]

const isHighlightedCategory = (category) => highlightedCategories.includes(category)

// SEO Configuration
useSEO({
  title: 'Legal Marketing Insights & Thought Leadership | Legal Crest Blog',
  description: 'Expert insights on legal marketing strategy, litigation campaigns, regulatory compliance, deal transactions, and crisis management for Am Law 100 firms and elite boutiques.',
  keywords: 'legal marketing insights, law firm blog, litigation strategy, legal thought leadership, regulatory strategy articles, legal industry trends, law firm marketing guide',
  canonical: '/insights',
  ogType: 'website',
})

// Breadcrumb
useHead(
  useStructuredData(
    getBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Insights', path: '/insights' },
    ])
  )
)
</script>

<template>
  <section id="insights" class="section insights" data-animate>
    <div class="section-header">
      <p class="eyebrow">Insights</p>
      <h2>Authority-building narratives your clients crave.</h2>
    </div>
    <div class="insight-grid">
      <article v-for="post in insights" :key="post.title" class="insight-card">
        <div class="insight-image-wrapper">
          <img :src="post.image" :alt="post.title" loading="lazy" class="insight-thumbnail" />
        </div>
        <p class="category" :class="{ 'insight-accent': isHighlightedCategory(post.category) }">
          {{ post.category }}
        </p>
        <h3>{{ post.title }}</h3>
        <p>{{ post.summary }}</p>
        <div class="insight-meta">
          <span>{{ post.readTime }}</span>
          <router-link :to="`/insights/${post.slug}`" class="btn text">Read article →</router-link>
        </div>
      </article>
    </div>
  </section>
</template>

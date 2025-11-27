<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { insights } from '../data/insights'
import { useSEO, useStructuredData, getArticleSchema, getBreadcrumbSchema } from '../composables/useSEO'
import { useHead } from '@unhead/vue'

const route = useRoute()
const router = useRouter()

const article = computed(() => {
  return insights.find(insight => insight.slug === route.params.slug)
})

// Dynamic SEO for article
watch(article, (newArticle) => {
  if (newArticle) {
    useSEO({
      title: `${newArticle.title} | Legal Crest Insights`,
      description: newArticle.summary,
      keywords: `${newArticle.category}, legal marketing, law firm strategy, ${newArticle.title.toLowerCase()}`,
      canonical: `/insights/${newArticle.slug}`,
      ogType: 'article',
    })

    // Article Schema
    useHead(useStructuredData(getArticleSchema(newArticle)))

    // Breadcrumb
    useHead(
      useStructuredData(
        getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/insights' },
          { name: newArticle.title, path: `/insights/${newArticle.slug}` },
        ])
      )
    )
  }
}, { immediate: true })

const goBack = () => {
  router.push('/insights')
}
</script>

<template>
  <div class="page-content">
    <!-- Article Not Found -->
    <section v-if="!article" class="section" data-animate>
      <div class="section-header">
        <h2>Article Not Found</h2>
        <p>The article you're looking for doesn't exist or has been removed.</p>
        <router-link to="/insights" class="btn primary">Back to Insights</router-link>
      </div>
    </section>

    <!-- Article Content -->
    <article v-else class="section article-detail" data-animate>
      <!-- Back Button -->
      <button @click="goBack" class="back-link" type="button">
        ← Back to Insights
      </button>

      <!-- Article Header -->
      <div class="article-header">
        <div class="article-image-wrapper">
          <img :src="article.image" :alt="article.title" class="article-hero-image" />
        </div>
        <div class="article-meta-header">
          <span class="article-category">{{ article.category }}</span>
          <h1 class="article-title">{{ article.title }}</h1>
          <p class="article-summary">{{ article.summary }}</p>
          <div class="article-meta-info">
            <span class="read-time">{{ article.readTime }}</span>
          </div>
        </div>
      </div>

      <!-- Article Body -->
      <div class="article-content">
        <div v-html="formatContent(article.content)" class="prose"></div>
      </div>

      <!-- Back to Insights CTA -->
      <div class="article-footer">
        <router-link to="/insights" class="btn primary">← Back to All Insights</router-link>
        <router-link to="/contact" class="btn ghost">Discuss Your Needs</router-link>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  methods: {
    formatContent(content) {
      // Simple markdown-to-HTML converter
      let html = content
        // Headers
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        // Lists
        .replace(/^\- (.*$)/gim, '<li>$1</li>')
        // Paragraphs
        .replace(/\n\n/g, '</p><p>')

      // Wrap lists
      html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')

      // Wrap in paragraph tags
      html = '<p>' + html + '</p>'

      // Clean up empty paragraphs
      html = html.replace(/<p><\/p>/g, '')
      html = html.replace(/<p>(<h[1-6]>)/g, '$1')
      html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1')
      html = html.replace(/<p>(<ul>)/g, '$1')
      html = html.replace(/(<\/ul>)<\/p>/g, '$1')

      return html
    }
  }
}
</script>

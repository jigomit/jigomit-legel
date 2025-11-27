<script setup>
import { useSEO, useStructuredData, getBreadcrumbSchema } from '../composables/useSEO'
import { useHead } from '@unhead/vue'

// SEO Configuration
useSEO({
  title: 'Client Success Stories & Case Results | Legal Crest Testimonials',
  description: 'Read success stories from our clients including General Counsels and CLOs of Fortune 500 companies. Proven results in litigation, regulatory compliance, crisis management, and legal marketing.',
  keywords: 'legal case results, law firm testimonials, client success stories, litigation results, legal services reviews, lawyer client testimonials',
  canonical: '/case-results',
  ogType: 'website',
})

// Breadcrumb
useHead(
  useStructuredData(
    getBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Case Results', path: '/case-results' },
    ])
  )
)

const testimonials = [
  {
    quote:
      'They merged litigation analytics with investor messaging, flipping a $600M dispute into leverage. Regulators, analysts, and the board aligned in a single sprint.',
    author: 'Celia Mercado',
    role: 'General Counsel, NovaGrid Energy',
    result: 'Capital markets stabilized in 48 days · $1.2B valuation preserved',
  },
  {
    quote:
      'Legal Crest orchestrated our cross-border launch with military precision—regulators, product, and PR worked from one playbook. Errors dropped to zero.',
    author: 'Anika Shah',
    role: 'Chief Legal Officer, Helio Health',
    result: 'Regulatory cycle time cut by 41% across 5 regions',
  },
  {
    quote:
      'The crisis lab they built restored stakeholder trust before markets opened. Board, outside counsel, and media teams were reading from the same script.',
    author: 'Marcus Jansen',
    role: 'CEO, Radiant Mobility',
    result: 'Reputation index back to 97 · Litigation exposure down 63%',
  },
  {
    quote:
      'From thought-leadership to intake workflows, they made our antitrust practice the most visible in-market. Chambers research cited the program in our latest ranking.',
    author: 'Leah Wu',
    role: 'Partner, Axiom & Hartwell',
    result: 'Inbound FTSE mandates up 54% YoY',
  },
  {
    quote:
      'Their deal velocity stack gave us live analytics on diligence, filings, and messaging. Our €3.4B merger cleared with zero weekend fire drills.',
    author: 'Adrien Keller',
    role: 'Chief Strategy Officer, Valiant Mobility',
    result: 'Closing timeline shortened by 5 weeks across EU + APAC',
  },
  {
    quote:
      'Legal Crest turned our ESG reporting into a market-winning story, complete with media-ready proofs and investor data. We jumped two tiers in sustainability rankings.',
    author: 'Samira Patel',
    role: 'General Counsel, Northwind Renewables',
    result: 'ESG score up 32% · Anchor investors added within 60 days',
  },
]
</script>

<template>
  <section id="case-studies" class="section testimonials" data-animate>
    <div class="section-header">
      <p class="eyebrow">Case results</p>
      <h2>Impact our clients can quantify.</h2>
    </div>
    <div class="testimonial-grid">
      <article v-for="testimonial in testimonials" :key="testimonial.author" class="testimonial-card">
        <p class="quote">"{{ testimonial.quote }}"</p>
        <div class="author">
          <p class="name">{{ testimonial.author }}</p>
          <p class="role">{{ testimonial.role }}</p>
        </div>
        <p class="result">{{ testimonial.result }}</p>
      </article>
    </div>
  </section>
</template>

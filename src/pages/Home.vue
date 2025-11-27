<script setup>
import { useSEO, useStructuredData, getLocalBusinessSchema, getBreadcrumbSchema } from '../composables/useSEO'
import { useHead } from '@unhead/vue'
import OptimizedImage from '../components/OptimizedImage.vue'

// Hero images - JPEG and WebP versions
import heroIllustration from '../assets/images/hero/lawyer-professional-new.jpg'
import heroIllustrationWebP from '../assets/images/hero/lawyer-professional-new.webp'
import highCourtImage from '../assets/high-court.jpg'
import highCourtImageWebP from '../assets/high-court.webp'

// SEO Configuration
useSEO({
  title: 'Legal Crest - Expert Legal Representation You Can Trust | Lawyer Services',
  description: 'Professional legal services in corporate law, litigation, real estate, and crisis management. 25+ years experience, 10,000+ cases won, 98% client satisfaction. Free consultation available.',
  keywords: 'lawyer, attorney, legal services, corporate law, litigation attorney, real estate lawyer, crisis management legal, law firm New York, legal consultation, legal representation',
  canonical: '/',
  ogType: 'website',
})

// Structured Data - LocalBusiness
useHead(useStructuredData(getLocalBusinessSchema()))

// Breadcrumb
useHead(
  useStructuredData(
    getBreadcrumbSchema([{ name: 'Home', path: '/' }])
  )
)

// Practice area images - professional legal photography (JPG and WebP)
import corporateLawImg from '../assets/images/practice-areas/corporate-law.jpg'
import corporateLawImgWebP from '../assets/images/practice-areas/corporate-law.webp'
import litigationImg from '../assets/images/practice-areas/litigation.jpg'
import litigationImgWebP from '../assets/images/practice-areas/litigation.webp'
import realEstateImg from '../assets/images/practice-areas/real-estate.jpg'
import realEstateImgWebP from '../assets/images/practice-areas/real-estate.webp'
import crisisImg from '../assets/images/practice-areas/crisis-management.jpg'
import crisisImgWebP from '../assets/images/practice-areas/crisis-management.webp'

// Attorney headshots - professional team (JPG and WebP)
import attorney1 from '../assets/images/attorneys/attorney-1.jpg'
import attorney1WebP from '../assets/images/attorneys/attorney-1.webp'
import attorney2 from '../assets/images/attorneys/attorney-2.jpg'
import attorney2WebP from '../assets/images/attorneys/attorney-2.webp'
import attorney3 from '../assets/images/attorneys/attorney-3.jpg'
import attorney3WebP from '../assets/images/attorneys/attorney-3.webp'

// Hero statistics - client-friendly metrics
const heroStats = [
  { value: '25+', label: 'Years Experience' },
  { value: '10,000+', label: 'Cases Won' },
  { value: '98%', label: 'Client Satisfaction' },
]

// Trust badges - professional affiliations
const trustBadges = [
  'Bar Council of India',
  'American Bar Association',
  'International Bar Association',
  'Legal 500 Recognized Firm',
  'Chambers & Partners Rated',
]

// Practice areas for home page preview
const practiceAreas = [
  {
    icon: '⚖️',
    title: 'Corporate Law',
    description: 'Business formation, contracts, mergers & acquisitions, and corporate governance.',
    focus: 'Regulatory Strategy & Board Advisory',
    image: corporateLawImg,
    imageWebP: corporateLawImgWebP,
  },
  {
    icon: '🏛️',
    title: 'Litigation & Disputes',
    description: 'Civil litigation, arbitration, dispute resolution, and courtroom representation.',
    focus: 'Market-Making Litigation Campaigns',
    image: litigationImg,
    imageWebP: litigationImgWebP,
  },
  {
    icon: '📈',
    title: 'Real Estate & Transactions',
    description: 'Property transactions, leasing, title disputes, and real estate development.',
    focus: 'Deal Velocity & Transaction Enablement',
    image: realEstateImg,
    imageWebP: realEstateImgWebP,
  },
  {
    icon: '🛡️',
    title: 'Crisis Management',
    description: 'Legal crisis response, reputation protection, and strategic risk management.',
    focus: 'Reputation, Crisis, & Issues Management',
    image: crisisImg,
    imageWebP: crisisImgWebP,
  },
]

// Our attorneys - professional team
const attorneys = [
  {
    name: 'Sarah Mitchell',
    title: 'Senior Partner',
    specialization: 'Corporate Law & M&A',
    experience: '20+ Years',
    image: attorney1,
    imageWebP: attorney1WebP,
    credentials: 'Harvard Law School, Bar Council Certified',
  },
  {
    name: 'James Rodriguez',
    title: 'Managing Partner',
    specialization: 'Litigation & Dispute Resolution',
    experience: '18+ Years',
    image: attorney2,
    imageWebP: attorney2WebP,
    credentials: 'Yale Law School, Supreme Court Attorney',
  },
  {
    name: 'Dr. Emily Chen',
    title: 'Senior Counsel',
    specialization: 'Real Estate & Property Law',
    experience: '15+ Years',
    image: attorney3,
    imageWebP: attorney3WebP,
    credentials: 'Stanford Law School, Licensed in 5 States',
  },
]

// Why choose us - key differentiators
const whyChooseUs = [
  {
    icon: '👨‍⚖️',
    title: 'Experienced Legal Team',
    detail: 'Our senior attorneys bring decades of courtroom experience and legal expertise across multiple practice areas.',
  },
  {
    icon: '🎯',
    title: 'Personalized Attention',
    detail: 'Every client receives dedicated attention with customized legal strategies tailored to your specific needs.',
  },
  {
    icon: '🏆',
    title: 'Proven Track Record',
    detail: 'Successfully resolved thousands of cases with favorable outcomes for our clients over 25+ years.',
  },
  {
    icon: '⚡',
    title: 'Fast Response Time',
    detail: 'We respond to inquiries within 24 hours and provide urgent consultation for time-sensitive matters.',
  },
]

// Client testimonials
const testimonials = [
  {
    quote: 'Legal Crest provided exceptional representation in our corporate merger. Their expertise and professionalism made a complex process smooth and successful.',
    client: 'Michael Chen',
    role: 'CEO, Tech Solutions Inc.',
  },
  {
    quote: 'After struggling with a property dispute for years, Legal Crest resolved it in months. Their knowledge of real estate law is outstanding.',
    client: 'Priya Sharma',
    role: 'Real Estate Developer',
  },
  {
    quote: 'When our company faced a legal crisis, their team responded immediately. Their strategic guidance protected our reputation and resolved the matter efficiently.',
    client: 'Robert Johnson',
    role: 'Director, Global Enterprises',
  },
]

const figureBadges = [
  { label: 'Successful Cases', value: '10,000+' },
  { label: 'Response Time', value: '< 24 hrs' },
]
</script>

<template>
  <div>
    <header class="hero" id="hero" data-animate>
      <div class="hero-grid">
        <div class="hero-text">
          <p class="eyebrow">Professional Legal Services</p>
          <h1>
            Expert Legal Representation You Can Trust
          </h1>
          <p class="lead">
            Legal Crest is a full-service law firm providing expert legal counsel across <router-link to="/services" class="inline-link">corporate law, litigation, real estate, and crisis management</router-link>. With over 25 years of experience, we deliver results-driven legal solutions tailored to your unique needs. <router-link to="/contact" class="inline-link">Schedule a free consultation</router-link> to discuss your legal needs.
          </p>
          <div class="cta-group">
            <router-link to="/contact" class="btn primary">Schedule Free Consultation</router-link>
            <a href="tel:+13325557180" class="btn ghost">Call Now: +1 (332) 555-7180</a>
          </div>
          <div class="hero-metrics">
            <div v-for="stat in heroStats" :key="stat.label" class="metric-card">
              <span class="metric-value">{{ stat.value }}</span>
              <p>{{ stat.label }}</p>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-figure">
            <OptimizedImage
              :src="heroIllustration"
              :src-webp="heroIllustrationWebP"
              alt="Professional lawyer providing legal counsel at Legal Crest law firm office"
              width="500"
              height="333"
              loading="eager"
            />
            <div class="figure-overlay">
              <p class="panel-label">Legal Crest Law Firm</p>
              <p class="figure-title">Professional Excellence. Proven Results.</p>
              <p>
                Our experienced attorneys combine legal expertise with personalized attention to deliver exceptional outcomes for every client.
              </p>
            </div>
            <div class="figure-badges">
              <span v-for="badge in figureBadges" :key="badge.label">
                <p class="figure-label">{{ badge.label }}</p>
                <p class="figure-value">{{ badge.value }}</p>
              </span>
            </div>
          </div>
          <div class="visual-card high-court-showcase">
            <p class="panel-label">Trusted Legal Authority</p>
            <div class="high-court-image-container">
              <OptimizedImage
                :src="highCourtImage"
                :src-webp="highCourtImageWebP"
                alt="United States Supreme Court building representing legal authority and judicial expertise"
                width="800"
                height="593"
                class="high-court-image"
              />
            </div>
            <p class="high-court-caption">Recognized expertise in judicial proceedings and legal advocacy</p>
          </div>
        </div>
      </div>
    </header>

    <!-- Practice Areas Section -->
    <section id="practice-areas" class="section" data-animate>
      <div class="section-header">
        <p class="eyebrow">Practice Areas</p>
        <h2>Comprehensive Legal Services</h2>
        <p>
          We provide expert legal counsel across multiple practice areas, ensuring you receive specialized representation for your specific legal needs.
        </p>
      </div>
      <div class="practice-grid">
        <article v-for="area in practiceAreas" :key="area.title" class="practice-card">
          <div class="practice-image-wrapper">
            <picture>
              <source :srcset="area.imageWebP" type="image/webp" />
              <img
                :src="area.image"
                :alt="`${area.title} - ${area.description.substring(0, 60)}...`"
                width="800"
                height="600"
                loading="lazy"
                class="practice-image"
              />
            </picture>
          </div>
          <div class="practice-content">
            <span class="practice-icon">{{ area.icon }}</span>
            <h3>{{ area.title }}</h3>
            <p>{{ area.description }}</p>
            <router-link :to="{ path: '/services', query: { service: area.focus } }" class="btn text">Learn More →</router-link>
          </div>
        </article>
      </div>
      <div class="cta-center">
        <router-link to="/services" class="btn primary">View All Services</router-link>
      </div>
    </section>

    <!-- Meet Our Attorneys Section -->
    <section id="attorneys" class="section" data-animate>
      <div class="section-header">
        <p class="eyebrow">Our Legal Team</p>
        <h2>Meet Our Attorneys</h2>
        <p>
          Experienced legal professionals dedicated to protecting your rights and achieving favorable outcomes.
        </p>
      </div>
      <div class="attorneys-grid">
        <article v-for="attorney in attorneys" :key="attorney.name" class="attorney-card">
          <div class="attorney-image-wrapper">
            <picture>
              <source :srcset="attorney.imageWebP" type="image/webp" />
              <img
                :src="attorney.image"
                :alt="`${attorney.name}, ${attorney.title} specializing in ${attorney.specialization}`"
                width="400"
                height="500"
                loading="lazy"
                class="attorney-photo"
              />
            </picture>
          </div>
          <div class="attorney-info">
            <h3>{{ attorney.name }}</h3>
            <p class="attorney-title">{{ attorney.title }}</p>
            <p class="attorney-specialization">{{ attorney.specialization }}</p>
            <div class="attorney-meta">
              <span class="attorney-experience">{{ attorney.experience }} Experience</span>
              <span class="attorney-credentials">{{ attorney.credentials }}</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section id="why-choose" class="section alt-bg" data-animate>
      <div class="section-header">
        <p class="eyebrow">Why Choose Legal Crest</p>
        <h2>Your Trusted Legal Partner</h2>
      </div>
      <div class="features-grid">
        <article v-for="feature in whyChooseUs" :key="feature.title" class="feature-card">
          <span class="feature-icon">{{ feature.icon }}</span>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.detail }}</p>
        </article>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="section" data-animate>
      <div class="section-header">
        <p class="eyebrow">Client Testimonials</p>
        <h2>What Our Clients Say</h2>
      </div>
      <div class="testimonials-grid">
        <article v-for="testimonial in testimonials" :key="testimonial.client" class="testimonial-card">
          <div class="quote-icon">"</div>
          <p class="testimonial-quote">{{ testimonial.quote }}</p>
          <div class="testimonial-author">
            <p class="author-name">{{ testimonial.client }}</p>
            <p class="author-role">{{ testimonial.role }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- Trust Badges -->
    <section id="trust" class="trust" data-animate>
      <p class="eyebrow">Recognized By</p>
      <div class="trust-logos">
        <span v-for="badge in trustBadges" :key="badge">{{ badge }}</span>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section id="cta-final" class="section cta-section" data-animate>
      <div class="cta-content">
        <h2>Ready to Discuss Your Legal Needs?</h2>
        <p>Schedule a free consultation with our experienced legal team today.</p>
        <div class="cta-group">
          <router-link to="/contact" class="btn primary large">Schedule Free Consultation</router-link>
          <a href="tel:+13325557180" class="btn ghost large">Call: +1 (332) 555-7180</a>
        </div>
        <p class="cta-note">Available 24/7 for urgent legal matters</p>
      </div>
    </section>
  </div>
</template>

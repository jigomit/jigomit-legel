<script setup>
import { ref, reactive, onMounted } from 'vue'
import { inquiryFocuses } from '../data/forms'
import CustomSelect from '../components/CustomSelect.vue'
import { useEmailJS } from '../composables/useEmailJS'
import { useFormValidation } from '../composables/useFormValidation'
import { useSEO, useStructuredData, getFAQSchema, getBreadcrumbSchema } from '../composables/useSEO'
import { useHead } from '@unhead/vue'

// SEO Configuration
useSEO({
  title: 'Contact Legal Crest | Schedule Free Legal Consultation | Lawyer Contact',
  description: 'Contact Legal Crest for expert legal consultation. Response time under 60 minutes. Schedule a free consultation with our experienced attorneys. Available for corporate law, litigation, and crisis management.',
  keywords: 'contact lawyer, legal consultation, free legal consultation, attorney contact, schedule legal appointment, legal inquiry, lawyer consultation New York',
  canonical: '/contact',
  ogType: 'website',
})

// Contact support image - Professional support representative from Unsplash (JPG and WebP)
import supportImage from '../assets/images/contact/support-professional.jpg'
import supportImageWebP from '../assets/images/contact/support-professional.webp'

const contactHighlights = [
  { label: 'Response Time', value: '< 60 minutes' },
  { label: 'Engagements / quarter', value: '24' },
  { label: 'Global NPS', value: '82' },
]

const faqs = [
  {
    question: 'What types of matters do you prioritize?',
    answer:
      'High-stakes litigation, regulated industry launches, complex transactions, and reputation-sensitive crises for growth-minded companies.',
  },
  {
    question: 'How quickly can we engage?',
    answer:
      'Our rapid response pod can mobilize in under 24 hours. For strategic engagements we align a kickoff date within five business days.',
  },
  {
    question: 'Do you work with in-house teams?',
    answer:
      'Yes. We embed with your legal, finance, and communications leads to complement—not replace—existing expertise.',
  },
  {
    question: 'Where do you operate?',
    answer:
      'We are headquartered in New York with distributed litigators admitted across 22 jurisdictions and trusted partner firms globally.',
  },
]

// FAQ Schema
useHead(useStructuredData(getFAQSchema(faqs)))

// Breadcrumb
useHead(
  useStructuredData(
    getBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ])
  )
)

// Form data
const formData = reactive({
  name: '',
  company: '',
  email: '',
  focus: '',
  brief: '',
})

// Composables
const { isSubmitting, submitStatus, errorMessage, sendContactForm, resetState } = useEmailJS()
const { errors, rules, validateForm, clearErrors } = useFormValidation()

// Form validation rules
const validationRules = {
  name: [rules.required, (v) => rules.minLength(v, 2, 'Name')],
  company: [rules.required],
  email: [rules.required, rules.email],
  focus: [rules.required],
  brief: [rules.required, (v) => rules.minLength(v, 10, 'Brief')],
}

const handleContactSubmit = async () => {
  // Validate form
  const isValid = validateForm(formData, validationRules)

  if (!isValid) {
    return
  }

  // Attempt to send email
  const success = await sendContactForm(formData)

  if (success) {
    // Reset form on success
    Object.keys(formData).forEach((key) => {
      formData[key] = ''
    })
    clearErrors()

    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      if (submitStatus.value === 'success') {
        resetState()
      }
    }, 5000)
  }
}

// Clear field error on input
const handleInput = (fieldName) => {
  if (errors[fieldName]) {
    errors[fieldName] = null
  }
}
</script>

<template>
  <div>
    <section id="contact" class="section contact" data-animate>
      <div class="section-header">
        <p class="eyebrow">Start the conversation</p>
        <h2>Claim your strategy intensive.</h2>
      </div>
      <div class="contact-grid">
        <form class="contact-form-clean" @submit.prevent="handleContactSubmit">
          <div class="form-field" :class="{ 'has-error': errors.name }">
            <label for="name">Full name</label>
            <input
              id="name"
              type="text"
              name="name"
              v-model="formData.name"
              @input="handleInput('name')"
              placeholder="Jordan Ellis"
              :disabled="isSubmitting"
            />
            <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
          </div>

          <div class="form-field" :class="{ 'has-error': errors.company }">
            <label for="company">Company</label>
            <input
              id="company"
              type="text"
              name="company"
              v-model="formData.company"
              @input="handleInput('company')"
              placeholder="Northwind Holdings"
              :disabled="isSubmitting"
            />
            <span v-if="errors.company" class="error-message">{{ errors.company }}</span>
          </div>

          <div class="form-field" :class="{ 'has-error': errors.email }">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              v-model="formData.email"
              @input="handleInput('email')"
              placeholder="you@company.com"
              :disabled="isSubmitting"
            />
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>

          <div class="form-field" :class="{ 'has-error': errors.focus }">
            <label for="focus">Inquiry focus</label>
            <CustomSelect
              id="focus"
              name="focus"
              v-model="formData.focus"
              :options="inquiryFocuses"
              placeholder="Select an option"
              :disabled="isSubmitting"
            />
            <span v-if="errors.focus" class="error-message">{{ errors.focus }}</span>
          </div>

          <div class="form-field" :class="{ 'has-error': errors.brief }">
            <label for="brief">Brief</label>
            <textarea
              id="brief"
              name="brief"
              rows="4"
              v-model="formData.brief"
              @input="handleInput('brief')"
              placeholder="Share timelines, goals, or urgent context"
              :disabled="isSubmitting"
            ></textarea>
            <span v-if="errors.brief" class="error-message">{{ errors.brief }}</span>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn primary" :disabled="isSubmitting">
            <span v-if="!isSubmitting">Submit request</span>
            <span v-else>Sending...</span>
          </button>

          <!-- Success Message -->
          <div v-if="submitStatus === 'success'" class="form-status success">
            ✓ Thank you! We've received your inquiry and will respond within 60 minutes.
          </div>

          <!-- Error Message -->
          <div v-if="submitStatus === 'error'" class="form-status error">
            {{ errorMessage }}
          </div>

        </form>
        <div class="contact-details">
          <div class="contact-visual">
            <picture>
              <source :srcset="supportImageWebP" type="image/webp" />
              <img :src="supportImage" alt="Professional Legal Support" loading="lazy" class="support-image" />
            </picture>
          </div>
          <div class="detail-card">
            <p>Executive concierge</p>
            <a href="tel:+13325557180">+1 (332) 555-7180</a>
            <a href="mailto:intake@legalcrest.com">intake@legalcrest.com</a>
          </div>
          <div class="detail-card">
            <p>Availability</p>
            <span>Monday–Friday · 7a–11p local</span>
            <span>Weekend rapid response by request</span>
          </div>
          <div class="detail-card">
            <p>Global presence</p>
            <span>New York · London · Singapore · Dubai</span>
            <span>On-site immersions + remote pods available</span>
          </div>
          <div class="detail-card">
            <p>Recognitions</p>
            <span>Chambers Band 1 marketing partner</span>
            <span>Legal 500 preferred supplier · ISO 27001 secure ops</span>
          </div>
          <div class="detail-card">
            <p>Security & compliance</p>
            <span>SOC 2 Type II infrastructure · encrypted client vault</span>
            <span>Dedicated privacy counsel + annual penetration tests</span>
          </div>
          <div class="detail-card highlights">
            <div v-for="item in contactHighlights" :key="item.label">
              <p class="label">{{ item.label }}</p>
              <p class="value">{{ item.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="faq" class="section faq" data-animate>
      <div class="section-header">
        <p class="eyebrow">FAQs</p>
        <h2>What ambitious legal teams ask us first.</h2>
      </div>
      <div class="faq-grid">
        <article v-for="faq in faqs" :key="faq.question" class="faq-card">
          <h3>{{ faq.question }}</h3>
          <p>{{ faq.answer }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

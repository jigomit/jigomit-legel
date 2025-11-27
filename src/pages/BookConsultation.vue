<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { inquiryFocuses, bookingSteps, primeSlots, meetingFormats, timeZones } from '../data/forms'
import CustomSelect from '../components/CustomSelect.vue'
import { useSEO, useStructuredData, getBreadcrumbSchema } from '../composables/useSEO'
import { useHead } from '@unhead/vue'

// SEO Configuration
useSEO({
  title: 'Book Free Legal Consultation | Schedule Attorney Appointment | Legal Crest',
  description: 'Schedule a free legal consultation with our expert attorneys. Choose your focus area, preferred time, and meeting format. Fast response time, flexible scheduling, and personalized legal advice.',
  keywords: 'book legal consultation, schedule lawyer appointment, free legal consultation, attorney consultation booking, legal appointment scheduling, lawyer meeting',
  canonical: '/book-consultation',
  ogType: 'website',
})

// Breadcrumb
useHead(
  useStructuredData(
    getBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Book Consultation', path: '/book-consultation' },
    ])
  )
)

// Team images for consultation booking
import teamPhoto from '../assets/images/hero/team-photo.jpg'

const bookingStatus = ref('idle')
const selectedFocus = ref('')
const selectedTimezone = ref('')
const selectedFormat = ref('')
const route = useRoute()

const syncFocusFromRoute = () => {
  const service = route.query.service
  if (typeof service === 'string' && inquiryFocuses.includes(service)) {
    selectedFocus.value = service
  } else {
    selectedFocus.value = ''
  }
}

const handleBookingSubmit = (event) => {
  const form = event.target
  bookingStatus.value = 'success'
  form.reset()
  syncFocusFromRoute()
  setTimeout(() => {
    if (bookingStatus.value === 'success') {
      bookingStatus.value = 'idle'
    }
  }, 4000)
}

onMounted(syncFocusFromRoute)
watch(
  () => route.query.service,
  () => syncFocusFromRoute()
)
</script>

<template>
  <div class="booking-page">
    <section class="booking-section" data-animate>
      <div class="booking-container">
        <div class="booking-left">
          <div class="section-header">
            <p class="eyebrow">Book a consultation</p>
            <h2>Reserve your private strategy intensive.</h2>
            <p class="lead">
              Provide your scheduling preferences and objectives. Our concierge confirms within two hours and dispatches the
              right partner pod.
            </p>
          </div>

          <form class="booking-form-clean" @submit.prevent="handleBookingSubmit">
          <div class="form-field">
            <label for="decision-maker">Decision maker</label>
            <input id="decision-maker" type="text" name="decision-maker" placeholder="Avery Morgan" required />
          </div>

          <div class="form-field">
            <label for="work-email">Work email</label>
            <input id="work-email" type="email" name="work-email" placeholder="avery@firm.com" required />
          </div>

          <div class="form-field">
            <label for="company-url">Firm or organization URL</label>
            <input id="company-url" type="url" name="company-url" placeholder="https://lexlumen.com" required />
          </div>

          <div class="form-field">
            <label for="matter">Matter focus</label>
            <CustomSelect
              id="matter"
              name="matter"
              v-model="selectedFocus"
              :options="inquiryFocuses"
              placeholder="Select an option"
              required
            />
          </div>

          <div class="form-field-group">
            <div class="form-field">
              <label for="date">Preferred date</label>
              <input id="date" type="date" name="date" required />
            </div>

            <div class="form-field">
              <label for="time">Preferred time window</label>
              <input id="time" type="time" name="time" required />
            </div>
          </div>

          <div class="form-field-group">
            <div class="form-field">
              <label for="timezone">Time zone</label>
              <CustomSelect
                id="timezone"
                name="timezone"
                v-model="selectedTimezone"
                :options="timeZones"
                placeholder="Choose zone"
                required
              />
            </div>

            <div class="form-field">
              <label for="format">Meeting format</label>
              <CustomSelect
                id="format"
                name="format"
                v-model="selectedFormat"
                :options="meetingFormats"
                placeholder="Choose format"
                required
              />
            </div>
          </div>

          <div class="form-field">
            <label for="objectives">Objectives</label>
            <textarea
              id="objectives"
              name="objectives"
              rows="4"
              placeholder="Share target outcomes, deadlines, stakeholders, or must-cover items."
              required
            ></textarea>
          </div>

          <button type="submit" class="btn primary">Schedule consultation</button>

          <p class="form-note">We confirm within two business hours. Need an emergency slot? Call the concierge line.</p>

          <p v-if="bookingStatus === 'success'" class="form-success">
            Calendar request received. Expect a confirmation and calendar invite in your inbox shortly.
          </p>
          </form>
        </div>

        <div class="booking-sidebar">
          <div class="booking-card team-visual">
            <div class="team-image-wrapper">
              <img :src="teamPhoto" alt="Legal Crest Professional Team" loading="lazy" class="team-photo" />
            </div>
            <p class="team-caption">
              Meet your dedicated strategy pod — senior litigators and marketing architects ready to mobilize.
            </p>
          </div>

          <div class="booking-card">
            <p class="eyebrow">What to expect</p>
            <ul class="booking-steps">
              <li v-for="(step, index) in bookingSteps" :key="step.title">
                <span class="step-number">{{ index + 1 }}</span>
                <div>
                  <p class="step-title">{{ step.title }}</p>
                  <p class="step-detail">{{ step.detail }}</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="booking-card slots">
            <p class="eyebrow">Prime consultation windows</p>
            <div class="slot-grid">
              <span v-for="slot in primeSlots" :key="slot">{{ slot }}</span>
            </div>
            <p class="slot-note">After-hours and international schedules are accommodated on request.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

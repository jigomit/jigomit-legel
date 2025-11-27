import { ref } from 'vue'

/**
 * Composable for handling form submissions with EmailJS
 *
 * Setup Instructions:
 * 1. Create account at https://www.emailjs.com/
 * 2. Add email service (Gmail, Outlook, etc.)
 * 3. Create email template
 * 4. Copy your PUBLIC KEY, SERVICE ID, and TEMPLATE ID
 * 5. Replace the values below or use environment variables
 */

// EmailJS Configuration
// TODO: Replace these with your actual EmailJS credentials
// Or use environment variables: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const EMAIL_CONFIG = {
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY_HERE', // Replace with your public key
  SERVICE_ID: 'YOUR_SERVICE_ID_HERE', // Replace with your service ID
  CONTACT_TEMPLATE_ID: 'YOUR_CONTACT_TEMPLATE_ID', // Replace with contact template ID
  CONSULTATION_TEMPLATE_ID: 'YOUR_CONSULTATION_TEMPLATE_ID', // Replace with booking template ID
}

// Cache for EmailJS module (loaded dynamically on client-side only)
let emailjsModule = null

/**
 * Load EmailJS dynamically (client-side only)
 */
async function loadEmailJS() {
  if (typeof window === 'undefined') {
    return null // Skip on server-side
  }

  if (!emailjsModule) {
    const module = await import('@emailjs/browser')
    emailjsModule = module.default
  }

  return emailjsModule
}

export function useEmailJS() {
  const isSubmitting = ref(false)
  const submitStatus = ref('idle') // 'idle' | 'success' | 'error'
  const errorMessage = ref('')

  /**
   * Initialize EmailJS with public key
   */
  const init = async () => {
    const emailjs = await loadEmailJS()
    if (!emailjs) return

    try {
      emailjs.init(EMAIL_CONFIG.PUBLIC_KEY)
    } catch (error) {
      console.error('EmailJS initialization failed:', error)
    }
  }

  /**
   * Send email using EmailJS
   * @param {Object} formData - The form data to send
   * @param {string} templateId - The EmailJS template ID to use
   * @returns {Promise<boolean>} - Success status
   */
  const sendEmail = async (formData, templateId) => {
    // Reset state
    isSubmitting.value = true
    submitStatus.value = 'idle'
    errorMessage.value = ''

    try {
      // Check if EmailJS is configured
      if (EMAIL_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY_HERE') {
        // Development mode: simulate successful submission
        console.warn('⚠️ EmailJS not configured - simulating successful submission for development')
        console.log('Form data that would be sent:', formData)

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        submitStatus.value = 'success'
        return true
      }

      // Load EmailJS (client-side only)
      const emailjs = await loadEmailJS()
      if (!emailjs) {
        throw new Error('EmailJS not available (server-side rendering)')
      }

      // Send email via EmailJS
      const response = await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        templateId,
        formData,
        EMAIL_CONFIG.PUBLIC_KEY
      )

      if (response.status === 200) {
        submitStatus.value = 'success'
        return true
      } else {
        throw new Error('Email sending failed')
      }
    } catch (error) {
      console.error('EmailJS error:', error)
      submitStatus.value = 'error'
      errorMessage.value = error.message || 'Failed to send message. Please try again.'
      return false
    } finally {
      isSubmitting.value = false
    }
  }

  /**
   * Send contact form
   * @param {Object} formData - Contact form data
   */
  const sendContactForm = async (formData) => {
    return await sendEmail(formData, EMAIL_CONFIG.CONTACT_TEMPLATE_ID)
  }

  /**
   * Send consultation booking form
   * @param {Object} formData - Booking form data
   */
  const sendConsultationForm = async (formData) => {
    return await sendEmail(formData, EMAIL_CONFIG.CONSULTATION_TEMPLATE_ID)
  }

  /**
   * Reset form state
   */
  const resetState = () => {
    isSubmitting.value = false
    submitStatus.value = 'idle'
    errorMessage.value = ''
  }

  return {
    isSubmitting,
    submitStatus,
    errorMessage,
    init,
    sendContactForm,
    sendConsultationForm,
    resetState,
  }
}

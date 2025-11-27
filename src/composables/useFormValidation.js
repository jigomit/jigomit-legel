import { ref, reactive } from 'vue'

/**
 * Composable for client-side form validation
 * Provides common validation rules and error handling
 */

export function useFormValidation() {
  const errors = reactive({})

  /**
   * Validation rules
   */
  const rules = {
    required: (value, fieldName = 'This field') => {
      if (!value || value.trim() === '') {
        return `${fieldName} is required`
      }
      return null
    },

    email: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (value && !emailRegex.test(value)) {
        return 'Please enter a valid email address'
      }
      return null
    },

    phone: (value) => {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/
      if (value && !phoneRegex.test(value)) {
        return 'Please enter a valid phone number'
      }
      return null
    },

    minLength: (value, min, fieldName = 'This field') => {
      if (value && value.length < min) {
        return `${fieldName} must be at least ${min} characters`
      }
      return null
    },

    maxLength: (value, max, fieldName = 'This field') => {
      if (value && value.length > max) {
        return `${fieldName} must be less than ${max} characters`
      }
      return null
    },

    url: (value) => {
      try {
        if (value) {
          new URL(value)
        }
        return null
      } catch {
        return 'Please enter a valid URL'
      }
    },
  }

  /**
   * Validate a single field
   * @param {string} fieldName - Name of the field
   * @param {any} value - Value to validate
   * @param {Array} validationRules - Array of validation functions
   * @returns {boolean} - Is valid
   */
  const validateField = (fieldName, value, validationRules = []) => {
    errors[fieldName] = null

    for (const rule of validationRules) {
      const error = rule(value)
      if (error) {
        errors[fieldName] = error
        return false
      }
    }

    return true
  }

  /**
   * Validate entire form
   * @param {Object} formData - Object containing all form field values
   * @param {Object} fieldRules - Object mapping field names to validation rule arrays
   * @returns {boolean} - Is form valid
   */
  const validateForm = (formData, fieldRules) => {
    let isValid = true

    // Clear all errors
    Object.keys(errors).forEach((key) => {
      errors[key] = null
    })

    // Validate each field
    for (const [fieldName, validationRules] of Object.entries(fieldRules)) {
      const fieldValue = formData[fieldName]
      const fieldValid = validateField(fieldName, fieldValue, validationRules)
      if (!fieldValid) {
        isValid = false
      }
    }

    return isValid
  }

  /**
   * Clear all errors
   */
  const clearErrors = () => {
    Object.keys(errors).forEach((key) => {
      errors[key] = null
    })
  }

  /**
   * Clear error for specific field
   * @param {string} fieldName
   */
  const clearFieldError = (fieldName) => {
    errors[fieldName] = null
  }

  /**
   * Get error message for field
   * @param {string} fieldName
   * @returns {string|null}
   */
  const getError = (fieldName) => {
    return errors[fieldName] || null
  }

  /**
   * Check if field has error
   * @param {string} fieldName
   * @returns {boolean}
   */
  const hasError = (fieldName) => {
    return !!errors[fieldName]
  }

  return {
    errors,
    rules,
    validateField,
    validateForm,
    clearErrors,
    clearFieldError,
    getError,
    hasError,
  }
}

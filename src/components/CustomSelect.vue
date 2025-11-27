<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Select an option',
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selectWrapper = ref(null)

const displayValue = computed(() => {
  return props.modelValue || props.placeholder
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option) => {
  emit('update:modelValue', option)
  isOpen.value = false
}

const handleClickOutside = (event) => {
  if (selectWrapper.value && !selectWrapper.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="selectWrapper" class="custom-select-wrapper">
    <button
      type="button"
      :id="id"
      class="custom-select-trigger"
      :class="{ 'is-open': isOpen, 'has-value': modelValue }"
      @click="toggleDropdown"
      :aria-expanded="isOpen"
      :aria-haspopup="true"
    >
      <span class="custom-select-value">{{ displayValue }}</span>
      <span class="custom-select-arrow" :class="{ 'is-rotated': isOpen }">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
          <path fill="currentColor" d="M6 9L1 4h10z" />
        </svg>
      </span>
    </button>

    <div v-if="isOpen" class="custom-select-dropdown">
      <div class="custom-select-options">
        <button
          v-for="option in options"
          :key="option"
          type="button"
          class="custom-select-option"
          :class="{ 'is-selected': option === modelValue }"
          @click="selectOption(option)"
        >
          {{ option }}
        </button>
      </div>
    </div>

    <!-- Hidden input for form submission -->
    <input type="hidden" :name="name" :value="modelValue" :required="required" />
  </div>
</template>

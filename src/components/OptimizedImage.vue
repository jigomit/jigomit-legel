<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: String,        // Path to JPEG image
  srcWebp: String,    // Path to WebP image (optional, auto-generated if not provided)
  alt: String,
  loading: {
    type: String,
    default: 'lazy'
  },
  class: String,
})

// Auto-generate WebP path if not provided
const webpSrc = computed(() => props.srcWebp || props.src.replace(/\.jpg$/, '.webp'))
</script>

<template>
  <picture>
    <source :srcset="webpSrc" type="image/webp" />
    <img :src="src" :alt="alt" :loading="loading" :class="class" />
  </picture>
</template>

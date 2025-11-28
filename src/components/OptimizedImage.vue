<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  srcWebp: String,
  alt: { type: String, default: '' },
  width: [Number, String],
  height: [Number, String],
  loading: {
    type: String,
    default: 'lazy',
  },
  class: String,
  sizes: {
    type: String,
    default: '100vw',
  },
  srcset: String,
  srcsetWebp: String,
  decoding: {
    type: String,
    default: 'async',
  },
  fetchpriority: {
    type: String,
    default: 'auto',
  },
})

const defaultWebp = computed(() => props.srcWebp || props.src.replace(/\.jpg$/, '.webp'))
const resolvedWebpSrcset = computed(() => props.srcsetWebp || props.srcset)
const resolvedSrcset = computed(() => props.srcset || props.src)
</script>

<template>
  <picture>
    <source :srcset="resolvedWebpSrcset || defaultWebp" :sizes="sizes" type="image/webp" />
    <img
      :src="src"
      :srcset="resolvedSrcset"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="loading"
      :class="class"
      :sizes="sizes"
      :decoding="decoding"
      :fetchpriority="fetchpriority"
    />
  </picture>
</template>

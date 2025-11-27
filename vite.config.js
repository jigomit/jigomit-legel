import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        // Note: vue and vue-router are handled by vite-ssg, don't manually chunk them
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Only chunk non-Vue dependencies
            if (id.includes('@emailjs/browser')) {
              return 'emailjs'
            }
            if (id.includes('@unhead/vue')) {
              return 'unhead'
            }
          }
        },
      },
    },
    // Asset handling
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['vue', 'vue-router', '@emailjs/browser', '@unhead/vue'],
  },
})

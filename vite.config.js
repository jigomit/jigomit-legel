import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { imagetools } from 'vite-imagetools'
import { brotliCompressSync, gzipSync, constants as zlibConstants } from 'zlib'

const compressionPlugin = () => ({
  name: 'emit-compressed-assets',
  generateBundle(_options, bundle) {
    Object.entries(bundle).forEach(([fileName, asset]) => {
      if (!/\.(js|css|html)$/i.test(fileName)) return

      const source = asset.type === 'chunk' ? asset.code : asset.source
      const buffer = typeof source === 'string' ? Buffer.from(source) : Buffer.from(source)

      const gz = gzipSync(buffer, { level: zlibConstants.Z_BEST_COMPRESSION })
      this.emitFile({
        type: 'asset',
        fileName: `${fileName}.gz`,
        source: gz,
      })

      const br = brotliCompressSync(buffer, {
        params: { [zlibConstants.BROTLI_PARAM_QUALITY]: 11 },
      })
      this.emitFile({
        type: 'asset',
        fileName: `${fileName}.br`,
        source: br,
      })
    })
  },
})

// Plugin to make CSS non-render-blocking
const asyncCSSPlugin = () => ({
  name: 'async-css-plugin',
  transformIndexHtml: {
    order: 'post',
    handler(html) {
      // Transform CSS link tags to load asynchronously with noscript fallback
      let primaryStylesCaptured = false
      return html.replace(
        /<link([^>]*?)rel="stylesheet"([^>]*?)>/g,
        (match, before, after) => {
          // Skip if already has media attribute or if it's inline critical CSS
          if (match.includes('media=') || match.includes('data-critical')) {
            return match
          }

          const isAppAsset = /href="[^"]*\/assets\//.test(match)
          if (isAppAsset && !primaryStylesCaptured) {
            primaryStylesCaptured = true
            return `<link${before}rel="stylesheet"${after} data-critical>`
          }

          if (!isAppAsset) {
            return match
          }
          // Add media="print" onload trick for non-blocking CSS + noscript fallback
          return `<link${before}rel="stylesheet"${after} media="print" onload="this.media='all'"><noscript><link${before}rel="stylesheet"${after}></noscript>`
        }
      )
    },
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    imagetools(), // Enable imagetools for manual WebP generation via import queries
    asyncCSSPlugin(), // Make CSS non-render-blocking for better mobile performance
    compressionPlugin(),
  ],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
  build: {
    modulePreload: {
      polyfill: false,
    },
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
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue')) return 'vue'
            if (id.includes('vue-router')) return 'vue-router'
            if (id.includes('@unhead')) return 'unhead'
            if (id.includes('@emailjs/browser')) return 'emailjs'
            return 'vendor'
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

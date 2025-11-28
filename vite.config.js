import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { imagetools } from 'vite-imagetools'
import { brotliCompressSync, gzipSync, constants as zlibConstants } from 'zlib'

const compressionPlugin = () => ({
  name: 'emit-compressed-assets',
  generateBundle(_options, bundle) {
    Object.entries(bundle).forEach(([fileName, asset]) => {
      if (!/\.(js|css)$/i.test(fileName)) return

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

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    imagetools(), // Enable imagetools for manual WebP generation via import queries
    compressionPlugin(),
  ],
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

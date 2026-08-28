import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/app.jsx'],
      refresh: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/js'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/@inertiajs/')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/framer-motion/')) {
            return 'vendor-motion'
          }
          if (id.includes('node_modules/recharts/') || id.includes('node_modules/d3-') || id.includes('node_modules/victory-vendor/')) {
            return 'vendor-charts'
          }
          if (id.includes('node_modules/@dnd-kit/')) {
            return 'vendor-dnd'
          }
          if (id.includes('node_modules/@heroicons/')) {
            return 'vendor-icons'
          }
          if (id.includes('node_modules/swiper/')) {
            return 'vendor-swiper'
          }
          if (id.includes('node_modules/date-fns/')) {
            return 'vendor-date'
          }
        },
      },
    },
  },
})

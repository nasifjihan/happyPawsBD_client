import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return
          }

          if (
            id.includes('react') ||
            id.includes('react-router-dom') ||
            id.includes('@mui') ||
            id.includes('@emotion') ||
            id.includes('@fontsource')
          ) {
            return 'framework'
          }

          if (id.includes('firebase')) {
            return 'firebase-vendor'
          }

          if (
            id.includes('@stripe') ||
            id.includes('axios') ||
            id.includes('@tanstack/react-query')
          ) {
            return 'data-vendor'
          }

          if (
            id.includes('react-multi-carousel') ||
            id.includes('@trendyol-js/react-carousel') ||
            id.includes('date-fns')
          ) {
            return 'ui-utils'
          }

          return 'vendor'
        },
      },
    },
  },
  server: {
    open: true, // Automatically open the app in the browser
  },
  plugins: [react()],
  optimizeDeps: {
    include: ['@mui/material', '@mui/x-date-pickers', '@emotion/react', '@emotion/styled'],
  },
})

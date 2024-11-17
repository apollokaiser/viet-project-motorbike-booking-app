import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias: {
      '@': '/src',
      '@comps': '/src/components',
      '@layouts': '/src/layouts',
      '@configs': '/src/configs',
      '@assets': '/src/assets',
    }
  },
})

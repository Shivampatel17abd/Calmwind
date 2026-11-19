import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Frontend calls /api/v1/... ; Vite forwards to the local backend.
      // This keeps requests same-origin in dev, so httpOnly auth cookies work
      // without depending on the backend CORS_ORIGIN setting.
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})

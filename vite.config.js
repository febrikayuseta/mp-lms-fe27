import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  server: {
    allowedHosts: '9669-2404-c0-b602-81f4-502c-f1f9-b7a4-8c3c.ngrok-free.app',
  }
})

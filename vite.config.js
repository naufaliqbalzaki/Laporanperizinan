import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.tsx',
      refresh: true
    }),
    react()
  ],
  // // prod server
  // server: {
  //   https: process.env.APP_DEBUG,
  //   host: '0.0.0.0',
  //   port: 8000,
  //   open: false
  // }
})

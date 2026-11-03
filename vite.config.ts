import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves project sites from /<repo>/. The deploy workflow passes
// the bare repository name (no slashes) so Windows shells cannot mangle it
// into a local path; this normalises it back into a URL base.
const repo = (process.env.VITE_BASE_PATH || '').replace(/^\/+|\/+$/g, '')

export default defineConfig({
  base: repo ? `/${repo}/` : '/',
  plugins: [react()],
  server: {
    port: 5173,
  },
})

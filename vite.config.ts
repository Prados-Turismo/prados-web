import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: "127.0.0.1"
  },
  plugins: [svgr(), react()],
  build: {
    chunkSizeWarningLimit: 5000
  }
})

import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      src: "/src",
      components: "/src/components",
      models: "/src/models",
      utils: "/src/utils",
      assets: "/src/assets",
      lib: "/src/lib",
      pages: "/src/pages",
      contexts: "/src/contexts",
      hooks: "/src/hooks",
      api: "/src/api"
    }
  },
  server: {
    fs: {
      cachedChecks: false
    }
  }
})

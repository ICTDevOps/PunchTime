import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Plugin personnalisé pour supprimer type="module" et ajuster pour Azure
const removeModuleType = () => {
  return {
    name: 'remove-module-type',
    transformIndexHtml(html: string) {
      // Supprimer complètement type="module" pour Azure Static Web Apps
      return html.replace(/type="module"\s+crossorigin/g, 'crossorigin')
                 .replace(/type="module"/g, '')
                 .replace(/crossorigin\s+/g, '')
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), removeModuleType()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    target: 'es2015',
    rollupOptions: {
      output: {
        format: 'iife',
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        inlineDynamicImports: true,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    minify: 'esbuild',
    sourcemap: false
  },
  esbuild: {
    target: 'es2015',
    format: 'iife'
  }
})

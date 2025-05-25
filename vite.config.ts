import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Plugin personnalisé pour supprimer type="module" et ajuster pour Azure (uniquement en production)
const removeModuleType = () => {
  return {
    name: 'remove-module-type',
    apply: 'build' as const,
    transformIndexHtml(html: string) {
      return html.replace(/type="module"\s+crossorigin/g, 'crossorigin')
                 .replace(/type="module"/g, '')
                 .replace(/crossorigin\s+/g, '')
    }
  }
}

export default defineConfig(({ command }) => {
  const isProduction = command === 'build'
  
  return {
    plugins: [react(), ...(isProduction ? [removeModuleType()] : [])],
    server: {
      port: 3000,
      open: true
    },
    ...(isProduction && {
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
  }
})

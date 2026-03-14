import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/widget/index.ts', import.meta.url)),
      name: 'AulaFlowWidget',
      fileName: () => 'widget.js',
      formats: ['iife'],
    },
    outDir: 'public',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
    minify: true,
  },
})

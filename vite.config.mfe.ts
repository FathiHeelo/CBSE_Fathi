import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    assetsInlineLimit: Number.POSITIVE_INFINITY,
    emptyOutDir: false,
    outDir: 'dist/mfe',
    rolldownOptions: {
      input: 'src/mfe.tsx',
      output: {
        codeSplitting: false,
        entryFileNames: 'yum-catalog.js',
      },
    },
    sourcemap: true,
    target: 'es2020',
  },
});

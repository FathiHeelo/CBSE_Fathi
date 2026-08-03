import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: true,
    lib: {
      entry: 'src/mfe.tsx',
      formats: ['es'],
      fileName: 'catalog-mfe',
    },
    outDir: 'dist-mfe',
    rolldownOptions: {
      output: { codeSplitting: false },
    },
    sourcemap: true,
    target: 'es2020',
  },
});

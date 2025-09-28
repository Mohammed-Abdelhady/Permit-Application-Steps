/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    setupFiles: ['./src/__tests__/setup.ts'],
    globals: true,
    css: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './src/components'),
      '@/pages': resolve(__dirname, './src/pages'),
      '@/utils': resolve(__dirname, './src/utils'),
      '@/hooks': resolve(__dirname, './src/hooks'),
      '@/contexts': resolve(__dirname, './src/contexts'),
      '@/store': resolve(__dirname, './src/store'),
      '@/types': resolve(__dirname, './src/types'),
      '@/schemas': resolve(__dirname, './src/schemas'),
      '@/locales': resolve(__dirname, './src/locales'),
      '@/assets': resolve(__dirname, './src/assets'),
    },
  },
});

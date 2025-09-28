import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/contexts': path.resolve(__dirname, './src/contexts'),
      '@/store': path.resolve(__dirname, './src/store'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/schemas': path.resolve(__dirname, './src/schemas'),
      '@/locales': path.resolve(__dirname, './src/locales'),
      '@/assets': path.resolve(__dirname, './src/assets'),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
  },
});

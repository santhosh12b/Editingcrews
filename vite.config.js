import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        singapore: resolve(__dirname, 'singapore/index.html'),
        malaysia: resolve(__dirname, 'malaysia/index.html'),
        thanks: resolve(__dirname, 'thanks/index.html'),
        singaporeThanks: resolve(__dirname, 'singapore/thanks/index.html'),
        malaysiaThanks: resolve(__dirname, 'malaysia/thanks/index.html')
      }
    }
  }
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

/**
 * Vite configuration for the 3D Globe CV project.
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [react()],
  
  // Path aliases matching tsconfig.json
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@utils': resolve(__dirname, './src/utils'),
      '@types': resolve(__dirname, './src/types'),
      '@data': resolve(__dirname, './src/data'),
      '@constants': resolve(__dirname, './src/constants'),
    },
  },
  
  // Development server config
  server: {
    port: 3000,
    open: true,
  },
  
  // Build optimization
  build: {
    target: 'esnext',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          'react-three': ['@react-three/fiber', '@react-three/drei'],
          gsap: ['gsap'],
        },
      },
    },
  },
});

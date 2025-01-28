// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': './src/utils',
      '@assets': './src/assets',

      '@config': './src/config',
      '@context': './src/context',
      '@layouts': './src/layouts',
      '@pages': './src/pages',
      '@types': './src/types',
      '@mock': './src/mock',
      '@test': './src/test',
    },
  },
});

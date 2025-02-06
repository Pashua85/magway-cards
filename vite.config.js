import { defineConfig } from 'vite';
import { resolve } from 'path';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [],
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
      ],
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`,
      },
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
});

import { defineConfig } from 'vite';
import { resolve } from 'path';
import autoprefixer from 'autoprefixer';
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject';

export default defineConfig({
  base: '/magway-cards',
  plugins: [
    vitePluginFaviconsInject('./src/assets/favicon.svg'),
  ],
  rollupOptions: {
    output: {
      assetFileNames: 'assets/[name][extname]',
      entryFileNames: '[name].js',
    }
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
      ],
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

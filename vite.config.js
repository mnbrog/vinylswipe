import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      include: /\.[tj]sx?$/
    })
  ],
  root: 'src',
  // Load environment variables from the project root
  envDir: '..',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});

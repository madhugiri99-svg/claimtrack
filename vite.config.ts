import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// `base` matches the GitHub Pages path: https://<user>.github.io/claimtrack/
export default defineConfig({
  base: '/claimtrack/',
  plugins: [react()],
});

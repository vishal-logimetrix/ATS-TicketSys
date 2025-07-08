import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: './', // ⬅️ THIS LINE IS CRITICAL for Vercel static routing
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),       // ✅ enables React/JSX transformations
    tailwindcss(), // ✅ keeps Tailwind active
  ],
  server: {
    historyApiFallback: true, // ✅ SPA fallback for React Router
  },
});

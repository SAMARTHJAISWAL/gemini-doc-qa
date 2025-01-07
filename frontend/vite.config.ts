import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  define: {
    'process.env.VITE_BACKEND_URL': JSON.stringify(
      process.env.VITE_BACKEND_URL || 'http://localhost:8000'
    ),
  },
}));

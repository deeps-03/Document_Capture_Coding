import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 1234,
    host: true, // Add this line to allow access from outside the container
  }
});
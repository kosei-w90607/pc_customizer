import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.VITE_PORT || 8080;

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: port,
  },
  optimizeDeps: {
    include: [

    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});
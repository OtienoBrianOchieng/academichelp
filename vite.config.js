import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // Changed from 127.0.0.1 to localhost
        changeOrigin: true,
        secure: false,
        
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Keep /api in the path
        ws: true,  // Enable WebSocket proxy
        configure: (proxy, options) => {
          // Add CORS headers to proxy responses
          proxy.on('proxyRes', (proxyRes) => {
            proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173';
            proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
            proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
            proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
          });
        }
      }
    },
    cors: {
      origin: 'http://localhost:5000',
      credentials: true
    }
  }
});
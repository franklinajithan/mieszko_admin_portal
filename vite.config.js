import path from 'path';
import reactPlugin from '@vitejs/plugin-react'; // Renamed to avoid conflict
import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment'; // Import for environment variables

export default defineConfig({
  plugins: [
    reactPlugin(),
    EnvironmentPlugin('all') // Ensure environment variables are loaded
  ],
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts", // Ensure this points to your setup file
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Setup alias for @
    },
  },
  server: {
    port: 5173, // Custom port for development server
    open: true, // Opens the browser automatically
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite API paths
      },
    },
  },
  preview: {
    port: 5000, // Port for the preview server
    open: true, // Automatically opens the browser
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'), // Define process.env.NODE_ENV for compatibility
  },
});

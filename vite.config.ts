import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  // Helper to safely get env var from either process.env (Vercel) or .env file (Local)
  const getEnv = (key: string) => {
    return process.env[key] || env[key] || '';
  };

  return {
    plugins: [react()],
    define: {
      // Vital: Polyfill process.env for the browser
      // We check process.env first (for Vercel system vars), then the loaded env
      'process.env.API_KEY': JSON.stringify(getEnv('API_KEY')),
      'process.env.API_KEY_2': JSON.stringify(getEnv('API_KEY_2')),
      'process.env.API_KEY_3': JSON.stringify(getEnv('API_KEY_3')),
      'process.env.API_KEY_4': JSON.stringify(getEnv('API_KEY_4')),
      'process.env.API_KEY_5': JSON.stringify(getEnv('API_KEY_5')),
      // Fallback empty object to prevent crashes if code accesses other props
      'process.env': {}
    },
    build: {
      outDir: 'dist',
      sourcemap: false
    }
  };
});
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // loadEnv wuxuu noo oggolaanayaa in proxy target-ka laga maamulo env haddii loo baahdo.
  const env = loadEnv(mode, process.cwd(), '');

  // Haddii VITE_API_PROXY_TARGET la waayo, backend-ka local-ka ah ayaan default uga dhignay.
  const proxyTarget = env.VITE_API_PROXY_TARGET || 'http://127.0.0.1:3000';

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        // /api requests-ka frontend-ka waxay si toos ah ugu gudbayaan backend-ka.
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});

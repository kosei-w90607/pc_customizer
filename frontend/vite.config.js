import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// __dirname と __filename の設定は Vite では不要な場合が多いですが、必要に応じて維持
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// PORT 環境変数を使用し、デフォルトは 3000 に設定
const port = process.env.PORT || 3000;

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 外部からアクセス可能にするために 0.0.0.0 を指定
    port: port,       // ENV に基づくポート設定
    strictPort: true, // 指定されたポートが使用中の場合は起動しない
  },
  optimizeDeps: {
    include: [
      // 必要に応じて依存関係を追加
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'build', // Dockerfile で指定したビルドディレクトリ名に合わせる
  }
});

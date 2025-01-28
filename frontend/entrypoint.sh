#!/bin/sh

# 環境変数が設定されていない場合はデフォルトを production に設定
NODE_ENV=${NODE_ENV:-production}

if [ "$NODE_ENV" = "development" ]; then
  echo "Starting Vite development server..."
  # 開発サーバーを起動
  npm run dev
else
  echo "Starting production server..."
  # ビルド済みの静的ファイルを serve で提供
  serve -s build -l tcp://0.0.0.0:$PORT
fi

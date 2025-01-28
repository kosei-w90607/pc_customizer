# ビルドステージ
FROM --platform=linux/amd64 node:21.5.0 AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# 本番ステージ
FROM --platform=linux/amd64 node:21.5.0

WORKDIR /app

# serveをグローバルにインストール
RUN npm install -g serve

COPY --from=build /app/build ./build

COPY entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh

ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["sh", "/usr/local/bin/entrypoint.sh"]

#!/bin/sh
set -e

echo "Deploy Telkom Schools"
echo "1) Docker + Cloudflare Tunnel"
echo "2) Docker (Port 3000)"
echo "3) PM2"
echo "4) Stop"
printf "Pilih [1-4]: "
read -r CHOICE

case "$CHOICE" in
  1)
    [ ! -f .env ] && cp .env.example .env
    docker compose --profile tunnel up -d --build
    ;;
  2)
    docker compose up -d --build
    ;;
  3)
    npm install
    npm run build
    pm2 start ecosystem.config.js
    pm2 save
    ;;
  4)
    docker compose --profile tunnel down
    ;;
  *)
    echo "Invalid option"
    exit 1
    ;;
esac

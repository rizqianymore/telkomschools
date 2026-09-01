#!/bin/bash
set -e

echo "================================================="
echo "   🚀 Telkom Schools VPS Deployment Menu"
echo "================================================="
echo "Pilih metode deployment yang ingin digunakan:"
echo "1) 🛡️ Docker Compose + Cloudflare Tunnel (Paling Aman, No Open Port)"
echo "2) ⚡ Docker Compose Standalone (Localhost 3000 + Nginx/Proxy)"
echo "3) 🟢 PM2 Native (Node.js runtime di host)"
echo "4) 🛑 Stop & Matikan Semua Container"
echo "================================================="
read -p "Masukkan pilihan [1-4]: " CHOICE

case $CHOICE in
  1)
    echo ">> Memeriksa .env..."
    if [ ! -f .env ]; then
      cp .env.example .env
      echo "⚠️ File .env dibuat dari .env.example. Harap isi CLOUDFLARE_TUNNEL_TOKEN di .env jika belum."
    fi
    echo ">> Menjalankan App + Cloudflare Tunnel..."
    docker compose --profile tunnel up -d --build
    echo "✅ Berhasil dijalankan dengan Cloudflare Tunnel!"
    ;;
  2)
    echo ">> Menjalankan App via Docker..."
    docker compose up -d --build
    echo "✅ App aktif di http://127.0.0.1:3000"
    ;;
  3)
    echo ">> Menginstall dependency & build project..."
    npm install
    npm run build
    echo ">> Menjalankan PM2..."
    pm2 start ecosystem.config.js
    pm2 save
    echo "✅ App aktif via PM2 di port 3000!"
    ;;
  4)
    echo ">> Menghentikan container..."
    docker compose --profile tunnel down
    echo "✅ Semua container dihentikan."
    ;;
  *)
    echo "❌ Pilihan tidak valid."
    exit 1
    ;;
esac

# Telkom Schools

Web aplikasi Next.js dengan dukungan SSR, Tailwind CSS v4, dan Base UI.

## Development

Jalankan server development lokal:

```bash
npm install
npm run dev
```

Buka http://localhost:3000 pada browser.

## Deployment VPS

### 1. Menggunakan Script Deploy

```bash
chmod +x deploy/deploy.sh
./deploy/deploy.sh
```

### 2. Manual dengan Docker Compose

Jalankan container aplikasi (port 3000):
```bash
docker compose up -d --build
```

Jalankan dengan Cloudflare Tunnel (isi CLOUDFLARE_TUNNEL_TOKEN di .env):
```bash
cp .env.example .env
docker compose --profile tunnel up -d --build
```

### 3. Manual dengan PM2

```bash
npm install
npm run build
pm2 start ecosystem.config.js
pm2 save
```

### 4. Nginx Reverse Proxy & Anti-DDoS

Salin konfigurasi Nginx dan sesuaikan domain:
```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/telkomschools
sudo ln -s /etc/nginx/sites-available/telkomschools /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

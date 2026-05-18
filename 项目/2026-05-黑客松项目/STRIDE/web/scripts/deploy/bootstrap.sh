#!/usr/bin/env bash
# STRIDE one-shot deploy on Ubuntu 22.04 (Aliyun SWAS / ECS)
set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
APP_NAME="stride"
PORT="${STRIDE_PORT:-3000}"
INSTALL_NGINX="${INSTALL_NGINX:-1}"

echo "==> STRIDE deploy in $APP_DIR"

if ! command -v node >/dev/null 2>&1 || [[ "$(node -v 2>/dev/null || echo 0)" < "v20" ]]; then
  echo "==> Installing Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

echo "==> Node $(node -v) npm $(npm -v)"

cd "$APP_DIR"
mkdir -p data
npm ci || npm install
npm run build

if ! command -v pm2 >/dev/null 2>&1; then
  npm install -g pm2
fi

pm2 delete "$APP_NAME" 2>/dev/null || true
pm2 start npm --name "$APP_NAME" -- start
pm2 save
env PATH="$PATH:/usr/bin" pm2 startup systemd -u root --hp /root 2>/dev/null || pm2 startup

echo "==> Seeding demo data (optional)..."
sleep 2
curl -sf -X POST "http://127.0.0.1:${PORT}/api/demo/seed" \
  -H "Content-Type: application/json" \
  -d '{"quarterId":"2025Q3"}' || echo "Seed skipped (start app first if failed)"

if [[ "$INSTALL_NGINX" == "1" ]] && command -v apt-get >/dev/null 2>&1; then
  if ! command -v nginx >/dev/null 2>&1; then
    apt-get install -y nginx
  fi
  cat > /etc/nginx/sites-available/stride <<EOF
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;
    client_max_body_size 20m;

    location / {
        proxy_pass http://127.0.0.1:${PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF
  ln -sf /etc/nginx/sites-available/stride /etc/nginx/sites-enabled/stride
  rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true
  nginx -t && systemctl reload nginx
  echo "==> Nginx reverse proxy on port 80 -> ${PORT}"
fi

PUBLIC_IP=$(curl -sf --max-time 3 ifconfig.me 2>/dev/null || curl -sf --max-time 3 icanhazip.com 2>/dev/null || echo "YOUR_SERVER_IP")
echo ""
echo "=============================================="
echo " STRIDE is running."
echo " Open: http://${PUBLIC_IP}"
echo " (or http://${PUBLIC_IP}:${PORT} if no nginx)"
echo " PM2: pm2 logs ${APP_NAME}"
echo "=============================================="

#!/bin/bash

echo "==> Installing Nginx"
yes | sudo apt install nginx
sudo systemctl enable nginx
sudo systemctl start nginx

CONFIG_CONTENT='
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;

    index index.html index.htm index.nginx-debian.html;

    server_name _;

    location / {
            proxy_pass http://localhost:32768;
            try_files $uri $uri/ =404;
    }

    location /api/v1 {
            proxy_pass http://localhost:32768/api/v1;
    }
}
'

echo "==> Updating Nginx config"

echo "$CONFIG_CONTENT" >/tmp/nginx_config_tmp
sudo mv /tmp/nginx_config_tmp /etc/nginx/sites-available/default
sudo systemctl restart nginx

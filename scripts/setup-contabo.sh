#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# NEXUS Electronics — Contabo VPS Setup Script
# Run as root on Ubuntu 22.04 LTS
# ═══════════════════════════════════════════════════════════════

set -e

echo "═══════════════════════════════════════════════════════════════"
echo " NEXUS Electronics — VPS Setup"
echo "═══════════════════════════════════════════════════════════════"

# Update system
echo "[1/12] Updating system..."
apt update && apt upgrade -y

# Install essential packages
echo "[2/12] Installing essential packages..."
apt install -y curl wget git unzip htop ufw fail2ban

# Configure UFW Firewall
echo "[3/12] Configuring firewall..."
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# Configure Fail2ban
echo "[4/12] Configuring Fail2ban..."
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
port = http,https
logpath = /var/log/nginx/error.log
EOF
systemctl enable fail2ban
systemctl restart fail2ban

# Configure Swap (2GB)
echo "[5/12] Configuring swap..."
if [ ! -f /swapfile ]; then
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
    echo 'vm.swappiness=10' >> /etc/sysctl.conf
    sysctl -p
fi

# Install Node.js 20 LTS
echo "[6/12] Installing Node.js 20 LTS..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install Nginx
echo "[7/12] Installing Nginx..."
apt install -y nginx
systemctl enable nginx

# Install Certbot
echo "[8/12] Installing Certbot..."
snap install --classic certbot
ln -sf /snap/bin/certbot /usr/bin/certbot

# Install PostgreSQL 15 (for Odoo)
echo "[9/12] Installing PostgreSQL 15..."
apt install -y postgresql postgresql-contrib

# Install Odoo dependencies
echo "[10/12] Installing Odoo dependencies..."
apt install -y python3-dev python3-pip python3-venv \
    libxml2-dev libxslt1-dev libldap2-dev libsasl2-dev \
    libtiff5-dev libjpeg8-dev libopenjp2-7-dev zlib1g-dev \
    libfreetype6-dev liblcms2-dev libwebp-dev libharfbuzz-dev \
    libfribidi-dev libxcb1-dev libpq-dev

# Install wkhtmltopdf for Odoo PDF
echo "[11/12] Installing wkhtmltopdf..."
wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6.1-2/wkhtmltox_0.12.6.1-2.jammy_amd64.deb -O /tmp/wkhtmltox.deb
apt install -y /tmp/wkhtmltox.deb
rm /tmp/wkhtmltox.deb

# Create users and directories
echo "[12/12] Creating users and directories..."

# Create odoo system user
if ! id "odoo" &>/dev/null; then
    useradd -m -d /opt/odoo -U -r -s /bin/bash odoo
fi

# Create PostgreSQL user for odoo
sudo -u postgres createuser -s odoo 2>/dev/null || true

# Create deploy user
if ! id "nexus-deploy" &>/dev/null; then
    useradd -m -d /home/nexus-deploy -s /bin/bash nexus-deploy
    mkdir -p /home/nexus-deploy/.ssh
    chmod 700 /home/nexus-deploy/.ssh
    chown -R nexus-deploy:nexus-deploy /home/nexus-deploy
fi

# Create deployment directories
mkdir -p /var/www/nexus/{current,releases,shared}
chown -R nexus-deploy:nexus-deploy /var/www/nexus

# Configure sudo for deploy user
cat > /etc/sudoers.d/nexus-deploy << 'EOF'
nexus-deploy ALL=(ALL) NOPASSWD: /usr/bin/rsync
nexus-deploy ALL=(ALL) NOPASSWD: /usr/sbin/nginx -t
nexus-deploy ALL=(ALL) NOPASSWD: /usr/bin/systemctl reload nginx
EOF
chmod 440 /etc/sudoers.d/nexus-deploy

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo " Setup Complete!"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Next steps:"
echo "1. Add SSH public key to /home/nexus-deploy/.ssh/authorized_keys"
echo "2. Run: certbot --nginx -d shop.votre-domaine.com -d erp.votre-domaine.com"
echo "3. Copy nginx configs to /etc/nginx/sites-available/"
echo "4. Enable sites: ln -s /etc/nginx/sites-available/nexus-shop /etc/nginx/sites-enabled/"
echo "5. Test and reload nginx: nginx -t && systemctl reload nginx"
echo ""

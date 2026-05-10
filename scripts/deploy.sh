#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# PRIMUS Electronics — Deployment Script
# Called by GitHub Actions CI/CD
# ═══════════════════════════════════════════════════════════════

set -e

DEPLOY_PATH="/var/www/primus"
RELEASE_NAME="${1:-$(date +%Y%m%d_%H%M%S)}"
RELEASE_PATH="${DEPLOY_PATH}/releases/${RELEASE_NAME}"
CURRENT_PATH="${DEPLOY_PATH}/current"
LOG_FILE="/var/log/primus-deploy.log"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting deployment: ${RELEASE_NAME}" >> "${LOG_FILE}"

# Verify release directory exists
if [ ! -d "${RELEASE_PATH}" ]; then
    echo "Error: Release directory not found: ${RELEASE_PATH}"
    exit 1
fi

# Switch symlink to new release
echo "Switching to new release..."
ln -sfn "${RELEASE_PATH}" "${CURRENT_PATH}"

# Test nginx configuration
echo "Testing nginx configuration..."
sudo nginx -t

# Reload nginx
echo "Reloading nginx..."
sudo systemctl reload nginx

# Cleanup old releases (keep last 5)
echo "Cleaning up old releases..."
cd "${DEPLOY_PATH}/releases"
ls -t | tail -n +6 | xargs -r rm -rf

# Log success
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Deployment successful: ${RELEASE_NAME}" >> "${LOG_FILE}"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo " Deployment Complete: ${RELEASE_NAME}"
echo "═══════════════════════════════════════════════════════════════"

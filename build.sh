#!/bin/bash

echo "Starting custom build script..."

# Update package lists and install essential tools
apt-get update -y
apt-get install -y --no-install-recommends \
    wget \
    gnupg \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libxss1 \
    libxtst6 \
    xdg-utils \
    lsb-release

# Download and add Google Chrome's signing key
wget -O- https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /etc/apt/keyrings/google-chrome.gpg

# Add Google Chrome's repository to sources list
echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/google-chrome.gpg] http://dl.google.com/linux/chrome/deb/ stable main" | tee /etc/apt/sources.list.d/google-chrome.list

# Update package lists again after adding new repo
apt-get update -y

# Install Google Chrome stable
apt-get install -y google-chrome-stable

echo "Chrome installation complete. Running Node.js builds..."

# Your existing Node.js build commands
npm install
npm install --prefix client && npm run build --prefix client
npm run build --prefix server

echo "Custom build script finished."
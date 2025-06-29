#!/bin/bash

# Prepare folders
mkdir -p .cache/puppeteer/chrome
cd .cache/puppeteer/chrome

# Download specific working version
wget https://storage.googleapis.com/chromium-browser-snapshots/Linux_x64/1143580/chrome-linux.zip
unzip chrome-linux.zip
mv chrome-linux linux-1143580

# Add permission
chmod +x linux-1143580/chrome

echo "✅ Chromium installed to $(pwd)/linux-1143580/chrome"

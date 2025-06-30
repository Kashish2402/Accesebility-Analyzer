#!/usr/bin/env bash

set -e

echo "Starting simplified custom build script..."

# Install root dependencies (this will now fetch axe-core and @sparticuz/chromium)
npm install

# Install client dependencies and build client
echo "Installing client dependencies and building client..."
npm install --prefix client
npm run build --prefix client

# Install server dependencies
echo "Installing server dependencies..."
npm install --prefix server

echo "Custom build script finished."
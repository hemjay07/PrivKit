#!/bin/bash

# PrivKit Development Environment Setup Script
# This script sets up the development environment for the PrivKit monorepo

set -e

echo ""
echo "  ██████╗ ██████╗ ██╗██╗   ██╗██╗  ██╗██╗████████╗"
echo "  ██╔══██╗██╔══██╗██║██║   ██║██║ ██╔╝██║╚══██╔══╝"
echo "  ██████╔╝██████╔╝██║██║   ██║█████╔╝ ██║   ██║   "
echo "  ██╔═══╝ ██╔══██╗██║╚██╗ ██╔╝██╔═██╗ ██║   ██║   "
echo "  ██║     ██║  ██║██║ ╚████╔╝ ██║  ██╗██║   ██║   "
echo "  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═╝  ╚═╝╚═╝   ╚═╝   "
echo ""
echo "  Zero to private in one command"
echo ""
echo "=================================================="
echo "  Setting up development environment..."
echo "=================================================="
echo ""

# Check Node.js version
NODE_VERSION=$(node -v 2>/dev/null || echo "none")
if [ "$NODE_VERSION" = "none" ]; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi
echo "✓ Node.js version: $NODE_VERSION"

# Check npm version
NPM_VERSION=$(npm -v 2>/dev/null || echo "none")
if [ "$NPM_VERSION" = "none" ]; then
    echo "❌ npm is not installed."
    exit 1
fi
echo "✓ npm version: $NPM_VERSION"

# Install root dependencies (if any)
echo ""
echo "📦 Installing root dependencies..."
npm install

# Install CLI package dependencies
echo ""
echo "📦 Installing CLI package dependencies..."
cd packages/cli
npm install

# Build CLI package
echo ""
echo "🔨 Building CLI package..."
npm run build

# Link CLI for local testing
echo ""
echo "🔗 Linking CLI for local development..."
npm link

# Return to root
cd ../..

# Install landing page dependencies
echo ""
echo "📦 Installing landing page dependencies..."
cd apps/web
npm install

# Return to root
cd ../..

echo ""
echo "=================================================="
echo "  ✅ Setup complete!"
echo "=================================================="
echo ""
echo "Available commands:"
echo ""
echo "  CLI Development:"
echo "    cd packages/cli"
echo "    npm run dev          # Watch mode for development"
echo "    npm run build        # Build CLI"
echo "    npm run test         # Run tests"
echo "    npm link             # Link for local testing"
echo ""
echo "  Test CLI locally:"
echo "    create-solana-privacy-app test-project -t privacy-cash"
echo ""
echo "  Landing Page Development:"
echo "    cd apps/web"
echo "    npm run dev          # Start dev server at localhost:3000"
echo "    npm run build        # Build for production"
echo ""
echo "  From root:"
echo "    npm run dev:cli      # Build CLI in watch mode"
echo "    npm run dev:web      # Start landing page dev server"
echo "    npm run build        # Build everything"
echo "    npm run test         # Run all tests"
echo ""
echo "Happy building! 🛡️"
echo ""

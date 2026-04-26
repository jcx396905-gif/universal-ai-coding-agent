#!/bin/bash
# React Todo App - Environment Initialization

set -e

echo "============================================================"
echo "  React Todo App - Environment Setup"
echo "============================================================"
echo ""

# Check Node.js version
if command -v node &> /dev/null; then
  NODE_VERSION=$(node --version)
  NPM_VERSION=$(npm --version)
  echo "✓ Node.js: $NODE_VERSION"
  echo "✓ npm: $NPM_VERSION"
else
  echo "✗ Node.js not found. Please install Node.js 18+"
  exit 1
fi

# Check git
if command -v git &> /dev/null; then
  GIT_VERSION=$(git --version)
  echo "✓ Git: $GIT_VERSION"
else
  echo "✗ Git not found"
  exit 1
fi

# Install dependencies
echo ""
echo "Installing dependencies..."
npm install
echo "✓ Dependencies installed"

# Verify installation
echo ""
echo "Verifying installation..."
npm list react react-dom vite
echo "✓ Core packages installed"

echo ""
echo "============================================================"
echo "  Environment Ready!"
echo "============================================================"
echo ""
echo "  Next steps:"
echo "    npm run dev      # Start development server"
echo "    npm run build    # Build for production"
echo "    npm run lint     # Run linter"
echo "    npm test         # Run tests"
echo ""

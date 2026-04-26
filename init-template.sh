#!/bin/bash
# ============================================================
# Universal AI Coding Agent - Environment Initialization Template
# ============================================================
# This script initializes the development environment for any project.
# Customize the ENVIRONMENT section below for your specific stack.
#
# Usage: ./init.sh
# ============================================================

set -e  # Exit on error

# ============================================================
# CONFIGURATION - Customize these for your project
# ============================================================

# Project name (used in welcome message)
PROJECT_NAME="my-project"

# Technology stack: nodejs|python|go|rust|flutter|react|vue|php|ruby|java|dotnet
STACK="nodejs"

# Project directory (relative to script location)
PROJECT_DIR="."

# ============================================================
# ENVIRONMENT SETUP - Stack-specific paths
# ============================================================

# Node.js / JavaScript / TypeScript
export NODE_SDK="${NODE_SDK:-/usr/local/bin/node}"
export NPM_SDK="${NPM_SDK:-/usr/local/bin/npm}"

# Python
export PYTHON_SDK="${PYTHON_SDK:-/usr/bin/python3}"
export PIP_SDK="${PIP_SDK:-/usr/bin/pip3}"

# Go
export GOROOT="${GOROOT:-/usr/local/go}"
export PATH="$GOROOT/bin:$PATH"

# Rust / Cargo
export CARGO_HOME="${CARGO_HOME:-/usr/local/cargo}"
export PATH="$CARGO_HOME/bin:$PATH"

# Flutter
export FLUTTER_SDK="${FLUTTER_SDK:-/opt/flutter}"
export ANDROID_SDK="${ANDROID_SDK:-/opt/android-sdk}"
export PATH="$FLUTTER_SDK/bin:$ANDROID_SDK/cmdline-tools/latest/bin:$ANDROID_SDK/platform-tools:$PATH"

# Java
export JAVA_HOME="${JAVA_HOME:-/usr/lib/jvm/java-17-openjdk}"
export PATH="$JAVA_HOME/bin:$PATH"

# ============================================================
# WELCOME MESSAGE
# ============================================================

echo "============================================================"
echo "  Universal AI Coding Agent - Environment Initialization"
echo "============================================================"
echo ""
echo "  Project: $PROJECT_NAME"
echo "  Stack:   $STACK"
echo "  Directory: $PROJECT_DIR"
echo ""

# ============================================================
# DEPENDENCY INSTALLATION - Based on stack
# ============================================================

cd "$PROJECT_DIR"

case "$STACK" in
  nodejs)
    echo "[1/3] Installing Node.js dependencies..."
    if command -v npm &> /dev/null; then
      npm install
      echo "  ✓ Dependencies installed"
    else
      echo "  ✗ npm not found. Install Node.js first."
      exit 1
    fi
    ;;

  python)
    echo "[1/3] Installing Python dependencies..."
    if command -v pip3 &> /dev/null; then
      pip3 install -r requirements.txt 2>/dev/null || pip3 install -r requirements-dev.txt 2>/dev/null || true
      echo "  ✓ Dependencies installed (if requirements.txt exists)"
    else
      echo "  ✗ pip3 not found. Install Python first."
      exit 1
    fi
    ;;

  go)
    echo "[1/3] Installing Go dependencies..."
    if command -v go &> /dev/null; then
      go mod download
      echo "  ✓ Dependencies installed"
    else
      echo "  ✗ go not found. Install Go first."
      exit 1
    fi
    ;;

  rust)
    echo "[1/3] Installing Rust dependencies..."
    if command -v cargo &> /dev/null; then
      cargo fetch
      echo "  ✓ Dependencies installed"
    else
      echo "  ✗ cargo not found. Install Rust first."
      exit 1
    fi
    ;;

  flutter)
    echo "[1/3] Installing Flutter dependencies..."
    if command -v flutter &> /dev/null; then
      flutter pub get
      echo "  ✓ Dependencies installed"
    else
      echo "  ✗ flutter not found. Install Flutter SDK first."
      exit 1
    fi
    ;;

  react|vue)
    echo "[1/3] Installing JavaScript dependencies..."
    if command -v npm &> /dev/null; then
      npm install
      echo "  ✓ Dependencies installed"
    else
      echo "  ✗ npm not found. Install Node.js first."
      exit 1
    fi
    ;;

  java)
    echo "[1/3] Installing Java dependencies..."
    if command -v mvn &> /dev/null; then
      mvn dependency:resolve
      echo "  ✓ Dependencies installed"
    elif command -v gradle &> /dev/null; then
      gradle dependencies
      echo "  ✓ Dependencies installed"
    else
      echo "  ✗ Maven or Gradle not found."
      exit 1
    fi
    ;;

  dotnet)
    echo "[1/3] Restoring .NET dependencies..."
    if command -v dotnet &> /dev/null; then
      dotnet restore
      echo "  ✓ Dependencies restored"
    else
      echo "  ✗ dotnet not found. Install .NET SDK first."
      exit 1
    fi
    ;;

  php)
    echo "[1/3] Installing PHP dependencies..."
    if command -v composer &> /dev/null; then
      composer install
      echo "  ✓ Dependencies installed"
    else
      echo "  ✗ composer not found. Install Composer first."
      exit 1
    fi
    ;;

  ruby)
    echo "[1/3] Installing Ruby dependencies..."
    if command -v bundle &> /dev/null; then
      bundle install
      echo "  ✓ Dependencies installed"
    else
      echo "  ✗ bundle not found. Install Bundler first."
      exit 1
    fi
    ;;

  *)
    echo "[1/3] Skipping dependency installation (unknown stack: $STACK)"
    ;;
esac

# ============================================================
# ENVIRONMENT VERIFICATION
# ============================================================

echo ""
echo "[2/3] Verifying environment..."

VERIFICATION_FAILED=0

# Check git
if command -v git &> /dev/null; then
  GIT_VERSION=$(git --version)
  echo "  ✓ Git: $GIT_VERSION"
else
  echo "  ✗ Git not found. Please install Git."
  VERIFICATION_FAILED=1
fi

# Check stack-specific tool
case "$STACK" in
  nodejs|react|vue)
    if command -v node &> /dev/null; then
      NODE_VERSION=$(node --version)
      NPM_VERSION=$(npm --version)
      echo "  ✓ Node.js: $NODE_VERSION"
      echo "  ✓ npm: $NPM_VERSION"
    else
      echo "  ✗ Node.js not found."
      VERIFICATION_FAILED=1
    fi
    ;;
  python)
    if command -v python3 &> /dev/null; then
      PYTHON_VERSION=$(python3 --version)
      echo "  ✓ Python: $PYTHON_VERSION"
    else
      echo "  ✗ Python3 not found."
      VERIFICATION_FAILED=1
    fi
    ;;
  go)
    if command -v go &> /dev/null; then
      GO_VERSION=$(go version)
      echo "  ✓ Go: $GO_VERSION"
    else
      echo "  ✗ Go not found."
      VERIFICATION_FAILED=1
    fi
    ;;
  rust)
    if command -v cargo &> /dev/null; then
      CARGO_VERSION=$(cargo --version)
      RUSTC_VERSION=$(rustc --version)
      echo "  ✓ Cargo: $CARGO_VERSION"
      echo "  ✓ Rustc: $RUSTC_VERSION"
    else
      echo "  ✗ Rust/Cargo not found."
      VERIFICATION_FAILED=1
    fi
    ;;
  flutter)
    if command -v flutter &> /dev/null; then
      FLUTTER_VERSION=$(flutter --version | head -1)
      echo "  ✓ Flutter: $FLUTTER_VERSION"
    else
      echo "  ✗ Flutter not found."
      VERIFICATION_FAILED=1
    fi
    ;;
esac

# ============================================================
# FINALIZATION
# ============================================================

echo ""
echo "[3/3] Initialization complete!"

if [ $VERIFICATION_FAILED -eq 1 ]; then
  echo ""
  echo "⚠️  Warning: Some tools were not found. Please install missing dependencies."
  exit 1
fi

echo ""
echo "============================================================"
echo "  Environment Ready: $PROJECT_NAME"
echo "============================================================"
echo ""
echo "  Next steps:"
echo "    1. Read task.json to see your tasks"
echo "    2. Run: claude (or your AI agent)"
echo "    3. Agent will implement tasks automatically"
echo ""
echo "============================================================"

exit 0

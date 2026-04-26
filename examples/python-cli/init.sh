#!/bin/bash
# Python CLI Project - Environment Initialization

set -e

echo "============================================================"
echo "  Python Todo CLI - Environment Setup"
echo "============================================================"
echo ""

# Check Python version
if command -v python3 &> /dev/null; then
  PYTHON_VERSION=$(python3 --version)
  echo "✓ Python: $PYTHON_VERSION"
else
  echo "✗ Python 3 not found. Please install Python 3.8+"
  exit 1
fi

# Check pip
if command -v pip3 &> /dev/null; then
  PIP_VERSION=$(pip3 --version)
  echo "✓ pip: $PIP_VERSION"
else
  echo "✗ pip3 not found"
  exit 1
fi

# Install dependencies
echo ""
echo "Installing dependencies..."
if [ -f "requirements.txt" ]; then
  pip3 install -r requirements.txt
  echo "✓ Dependencies installed"
else
  echo "⚠ requirements.txt not found"
fi

# Verify installation
echo ""
echo "Verifying installation..."
python3 -c "import click; import sqlite3; print('✓ Click installed'); print('✓ SQLite available')"

echo ""
echo "============================================================"
echo "  Environment Ready!"
echo "============================================================"
echo ""
echo "  Next steps:"
echo "    python main.py --help    # See available commands"
echo "    python main.py add       # Add a todo"
echo "    python main.py list      # List todos"
echo ""

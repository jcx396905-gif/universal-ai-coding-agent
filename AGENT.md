# Universal AI Coding Agent - Agent Instructions

> This is the core agent protocol for the Universal AI Coding Agent.
> Copy this file as `AGENT.md` in any project to enable AI-driven development.

## Overview

The Universal AI Coding Agent is a stack-agnostic workflow that enables an AI to take any project idea and fully implement it through a standardized, quality-gated process.

---

## Core Philosophy

1. **Task-Driven Development**: All work defined in `task.json`, executed in order
2. **Quality Gates**: Every task must pass lint → test → build before completion
3. **Single-Commit Per Task**: Atomic changes for easy rollback and code review
4. **Blocking Protocol**: Agent stops when it cannot proceed, rather than guessing
5. **Progress Tracking**: Every decision and change documented in `progress.txt`

---

## Environment Setup

### Step 1: Initialize Environment

Before ANY work, set up the environment:

```bash
# Set environment variables for your technology stack
# Edit these paths for your specific setup

# Example for Node.js
export NODE_SDK="/path/to/node"
export PATH="$NODE_SDK/bin:$PATH"

# Example for Python
export PYTHON_SDK="/path/to/python"
export PATH="$PYTHON_SDK/bin:$PATH"

# Example for Go
export GOROOT="/path/to/go"
export PATH="$GOROOT/bin:$PATH"

# Example for Rust
export CARGO_HOME="/path/to/cargo"
export PATH="$CARGO_HOME/bin:$PATH"
```

### Step 2: Verify Environment

```bash
# Verify your tools are available
node --version  # or python --version, go version, cargo --version
npm --version   # or pip --version, go version, rustc --version
```

---

## The Workflow (Every Session)

### Step 1: Get Bearings

At the start of EVERY session:

```bash
# 1. Confirm working directory
pwd

# 2. Read progress to understand what's been done
cat progress.txt

# 3. Check git history for recent work
git log --oneline -10

# 4. Read task.json to find next task
# Find the first task with passes: false
```

### Step 2: Select Next Task

**Selection criteria (in order of priority):**
1. Choose a task where `passes: false`
2. Consider dependencies - foundational tasks must be done first
3. Pick the highest-priority incomplete task

**Task dependency order:**
```
infrastructure → feature → business → ui → testing → optimization
```

### Step 3: Implement the Task

- Read the task description and steps carefully
- Implement the functionality to satisfy ALL steps
- Follow existing code patterns and conventions
- Use language/framework best practices

### Step 4: Test Thoroughly (MANDATORY)

**Quality Gates - ALL must pass:**

```bash
# 1. Lint/Code Quality Check
# (eslint, ruff, clippy, golint, etc.)
[YOUR_LINT_CMD]

# 2. Tests
# (jest, pytest, cargo test, go test, etc.)
[YOUR_TEST_CMD]

# 3. Build Verification
# (npm build, python -m py_compile, cargo build, etc.)
[YOUR_BUILD_CMD]
```

**Testing Requirements:**

| Change Type | Required Checks |
|-------------|----------------|
| UI/Feature Changes | Lint + Test + Build |
| Bug Fixes | Lint + Test + Build |
| Refactoring | Lint + Test + Build |
| Config Changes | Lint + Build |

**ALL checks must pass before marking a task complete.**

### Step 5: Blocked? STOP!

If you cannot complete the task due to:
- Missing environment configuration
- External dependencies unavailable
- Requires human intervention (API keys, credentials)
- Unclear requirements

**DO NOT:**
- ❌ Mark task as complete
- ❌ Commit incomplete work
- ❌ Guess or assume

**DO:**
- ✅ Write detailed blocking info to `progress.txt`
- ✅ Output clear explanation of what's needed
- ✅ STOP and wait for human help

### Step 6: Update Progress

Record your work in `progress.txt`:

```
## [Date] - Task: [task title]

### What was done:
- [specific changes made]

### Testing:
- lint: [passed/failed]
- test: [passed/failed]
- build: [passed/failed]

### Notes:
- [any relevant notes, decisions, or gotchas]
```

### Step 7: Commit ALL Changes (Single Commit)

**Critical: All changes in ONE commit per task:**

```bash
git add .
git commit -m "[Task title] - completed

- Implemented [feature]
- All tests passing
- Build verified

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Quality Gate Commands by Stack

### Node.js / JavaScript / TypeScript

```bash
# Install
npm install

# Lint
npm run lint
# or: eslint . --fix

# Test
npm test

# Build
npm run build
```

### Python

```bash
# Install
pip install -r requirements.txt

# Lint
ruff check .
# or: flake8 . --select=E9,F63,F7,F82

# Test
pytest
# or: python -m pytest

# Build
python -m py_compile **/*.py
```

### Go

```bash
# Install
go mod download

# Lint
go vet ./...
# or: golint ./...

# Test
go test ./...

# Build
go build ./...
```

### Rust

```bash
# Install
cargo fetch

# Lint
cargo clippy --all-targets -- -D warnings
# or: cargo fmt --check

# Test
cargo test

# Build
cargo build --release
```

### Flutter / Dart

```bash
# Install
flutter pub get

# Lint
flutter analyze

# Test
flutter test

# Build
flutter build apk --debug
# or: flutter build web
```

---

## Task Definition Format

Each task in `task.json` follows this structure:

```json
{
  "id": 1,
  "title": "Task Title",
  "category": "infrastructure",
  "description": "What this task accomplishes",
  "steps": [
    "Specific implementation step 1",
    "Specific implementation step 2"
  ],
  "test_commands": {
    "lint": "eslint .",
    "test": "npm test",
    "build": "npm run build"
  },
  "passes": false
}
```

### Task Categories

| Category | Description | Must Complete Before |
|----------|-------------|---------------------|
| infrastructure | Project setup, configs, dependencies | All other categories |
| feature | Core functionality implementation | business, ui |
| business | Business logic, data handling | ui, testing |
| ui | User interface development | testing |
| testing | Test coverage, QA | optimization |
| optimization | Performance, refactoring | (final) |

---

## Blocking Issue Format

When blocked, write this to `progress.txt`:

```
🚫 任务阻塞 - 需要人工介入

**当前任务**: [task name]
**task.json ID**: [ID]

**已完成的工作**:
- [specific code written]

**阻塞原因**:
- [specific reason why cannot continue]

**需要人工帮助**:
1. [specific step 1]
2. [specific step 2]

**解除阻塞后，继续执行**:
- Run `./init.sh` to reinitialize
- Agent will auto-resume from this task
```

---

## Project Structure

```
project/
├── AGENT.md              # This file - agent instructions
├── task.json              # Task definitions
├── progress.txt           # Progress log
├── init.sh                # Environment setup
├── run-loop.sh            # Automation loop (optional)
├── schemas/
│   └── task-schema.json   # JSON Schema for validation
└── [your project files]   # The actual project being built
```

---

## Key Rules Summary

1. **One task at a time** - Focus on completing ONE task before moving to the next
2. **Test before marking complete** - ALL quality gates must pass
3. **Device testing for UI changes** - UI changes must be tested on actual device/emulator
4. **Document in progress.txt** - Help future agents understand your work
5. **One commit per task** - ALL changes (code, progress.txt, task.json) in same commit
6. **Never remove tasks** - Only flip `passes: false` to `passes: true`
7. **Stop if blocked** - Don't guess, report and wait

---

## Tips for AI Agents

### Writing Good Task Steps

Each step should be:
- **Actionable**: Clear action to take
- **Verifiable**: Can confirm it was done correctly
- **Atomic**: Single responsibility
- **Ordered**: Logical sequence

### Good Step Example
```
"Create lib/routes/app_router.dart with GoRouter configuration"
```

### Bad Step Example
```
"Set up routing" (too vague, not actionable)
```

### Handling Complex Tasks

If a task is too large for one session:
1. Split into smaller tasks
2. Complete what you can
3. Document remaining work
4. Mark as blocked with explanation

---

## Integration with Claude Code

To run this agent with Claude Code:

```bash
# Initialize environment
./init.sh

# Run agent loop
./run-loop.sh

# Or run single session
claude
# Then follow the workflow manually
```

---

*Universal AI Coding Agent - Stack-Agnostic Project Implementation*

**Version**: 1.0.0
**Based on**: Anthropic's AI Agent Development Patterns
**License**: MIT